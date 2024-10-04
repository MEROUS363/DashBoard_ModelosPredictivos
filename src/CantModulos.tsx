import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useAccesoBancaMovil from "./hooks/fetchAccesosBancaMovilHook";
import { useDateContext } from "../contexts/DateContext";
import useProdunetAndMovil, {
  ProdunetAndBancaMovilOutput,
} from "./hooks/fetchProdunetandBancaMovil";
import useFetchNewProdunetHook from "./hooks/fetchNewProdunetHook";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Función para sumar y redondear las predicciones de cada lista por separado
function sumAndRoundPredictions(
  produnetResults: ProdunetAndBancaMovilOutput[],
  movilResults: ProdunetAndBancaMovilOutput[]
) {
  // Sumar los valores de sumPrediction de la lista produnetResults
  const produnetSum = produnetResults.reduce(
    (sum, item) => sum + item.hourPrediction,
    0
  );

  // Sumar los valores de sumPrediction de la lista movilResults
  const movilSum = movilResults.reduce(
    (sum, item) => sum + item.hourPrediction,
    0
  );

  // Redondear ambas sumas
  const roundedProdunetSum = Math.round(produnetSum);
  const roundedMovilSum = Math.round(movilSum);

  return {
    produnetTotal: roundedProdunetSum,
    movilTotal: roundedMovilSum,
  };
}

async function obtenerDatosPorHora(
  fecha: string,
  hora: number
): Promise<number> {
  // Implementa aquí la lógica para realizar la solicitud a tu API o servicio.
  // Este es un ejemplo simplificado.
  const response = await fetch(
    `https://api.example.com/datos?fecha=${fecha}&hora=${hora}`
  );
  const data = await response.json();

  // Supongamos que la respuesta tiene la forma { resultado: number }
  return data.resultado;
}

const HorizontalBarChart: React.FC = () => {
  const { date, loadingContext, typeOfData, hour } = useDateContext();

  const {
    data: movilData,
    loading: movilLoading,
    error: movilError,
  } = useAccesoBancaMovil(date, hour); // Usa el hook de Banca Movil
  const {
    data: producNetData,
    loading: producNetLoading,
    error: producNetError,
  } = useFetchNewProdunetHook(date, hour); // Usa el hook de ProducNet

  const {
    data: produnetAndMovilData,
    loading: produnetAndMovilLoading,
    error: produnetAndMovilError,
  } = useProdunetAndMovil(date, hour); // Usa el hook de ProducNet y Banca Movil

  // Si los valores devueltos por las APIs están disponibles, los usamos; de lo contrario, mostramos un valor por defecto
  const movilScore = movilData ? movilData.score : null;
  const producNetScore = producNetData ? producNetData[0] : null;
  const TotalMovilProduct =
    movilScore && producNetScore ? movilScore + producNetScore : 0;
  const BarColor =
    TotalMovilProduct > 20000
      ? "rgba(239, 68, 68, 1)"
      : TotalMovilProduct > 25000
      ? "rgba(251, 191, 36, 1)"
      : "rgba(104, 211, 145, 1)";

  const { produnetTotal, movilTotal } = sumAndRoundPredictions(
    produnetAndMovilData.produnetResults,
    produnetAndMovilData.movilResults
  );

  const chartData =
    movilScore && producNetScore
      ? {
          labels: ["ProduNet", "Movil"],
          datasets: [
            {
              label: "Cantidad",
              data: [Math.round(producNetScore), Math.round(movilScore)],
              backgroundColor: [
                BarColor, // Color para 'ProduNet'
                BarColor, // Color para 'Movil'
              ],
            },
          ],
        }
      : {
          labels: ["ProduNet", "Movil"],
          datasets: [
            {
              label: "Cantidad",
              data: [Math.round(produnetTotal), Math.round(movilTotal)],
              backgroundColor: [
                BarColor, // Color para 'ProduNet'
                BarColor, // Color para 'Movil'
              ],
            },
          ],
        };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y" as const,
    plugins: {
      legend: {
        position: "right" as const,
      },
      title: {
        display: true,
        text:
          typeOfData === "FiltroXHora"
            ? "Cantidad de Accesos al Módulo"
            : typeOfData === "FiltroXFecha"
            ? "Accesos Totales en el Módulo"
            : "Título por Defecto", // opcional, para manejar otros casos
      },
    },
  };

  if (
    movilLoading ||
    producNetLoading ||
    loadingContext ||
    produnetAndMovilLoading
  )
    return <p>Cargando...</p>;
  if (movilError || producNetError || produnetAndMovilError)
    return <p>Error: {movilError || producNetError}</p>;

  return (
    <div className="flex bg-white max-w-[805px] ml-4 mr-4 h-[200px]  rounded-lg">
      <div className="justify-center h-[200px] w-full rounded-lg  bg-white">
        <Bar data={chartData} options={options} />
      </div>
      <div className="pt-2 rounded-lg">
        <h2 className="text-xl font-bold text-foreground text-emerald-700 pt-2">
          Accesos ProduNet
        </h2>
        <p className="text-lg">
          <span className="font-bold">
            {producNetScore
              ? Math.round(producNetScore)
              : Math.round(produnetTotal)}
          </span>
        </p>
        <h2 className="text-xl font-bold text-foreground text-emerald-700 pt-4">
          Accesos Movil
        </h2>
        <p className="text-lg">
          <span className="font-bold">
            {movilScore ? Math.round(movilScore) : Math.round(movilTotal)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default HorizontalBarChart;
