import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useAccesoBancaMovil from "../../hooks/fetchAccesosBancaMovilHook";
import { useDateContext } from "../../contexts/DateContext";
import useFetchNewProdunetHook from "../../hooks/fetchNewProdunetHook";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const getSumOfScores = (data: Record<string, number>, type: string) => {
  console.log(type, "   ", data);
  return Object.values(data).reduce((sum, value) => sum + value, 0);
};

const ModulosProdunetYmovil: React.FC = () => {
  const { date, loadingContext, typeOfData, hour } = useDateContext();

  const {
    dataAllHours: movilDataAllHours,
    dataByHour: movilDataByHour,
    loadingAllHours: movilLoadingAllHours,
    loadingByHour: movilLoadingByHour,
    error: movilError,
  } = useAccesoBancaMovil(date, hour); // Usa el hook de Banca Movil
  const {
    dataAllHours: producNetData,
    dataByHour: producNetDataByHour,
    loadingAllHours: producNetLoading,
    loadingByHour: producNetLoadingByHour,
    error: producNetError,
  } = useFetchNewProdunetHook(date, hour); // Usa el hook de ProducNet

  // Si los valores devueltos por las APIs están disponibles, los usamos; de lo contrario, mostramos un valor por defecto
  const movilScore = movilDataAllHours ? movilDataAllHours.score : null;
  const producNetScore = producNetData ? producNetData[0] : null;
  const TotalMovilProduct =
    movilScore && producNetScore ? movilScore + producNetScore : 0;
  const BarColor =
    TotalMovilProduct > 20000
      ? "rgba(239, 68, 68, 1)"
      : TotalMovilProduct > 25000
      ? "rgba(251, 191, 36, 1)"
      : "rgba(104, 211, 145, 1)";

  const sumOfMovilScores = getSumOfScores(movilDataAllHours || {}, "Movil");
  const sumOfProducNetScores = getSumOfScores(producNetData || {}, "Produnet");

  // DATOS PARA LA GRAFICA DE LINEAS
  const lineChartData = {
    labels: Object.keys(movilDataAllHours), // Las horas del día en el eje X
    datasets: [
      {
        label: "Movil",
        data: Object.values(movilDataAllHours).map((value) =>
          value !== null && value !== undefined ? Math.round(value) : 0
        ),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0.1,
        fill: true,
      },
      {
        label: "Produnet", // Etiqueta para la segunda línea
        data: Object.values(producNetData).map((value) =>
          value !== null && value !== undefined ? Math.round(value) : 0
        ),
        borderColor: "rgba(255, 99, 132, 1)", // Color diferente para la segunda línea
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 2,
        tension: 0.1,
        fill: true,
      },
    ],
  };

  const lineDataoptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Cantidad de Accesos",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Horas",
        },
      },
      y: {
        title: {
          display: true,
          text: "Accesos",
        },
        beginAtZero: true,
      },
    },
  };

  //DATOS PARA LA GRAFICA DE BARRAS
  const chartData = {
    labels: ["ProduNet", "Movil"],
    datasets: [
      {
        label: "Cantidad",
        data: [producNetDataByHour, movilDataByHour],
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
    movilLoadingAllHours ||
    movilLoadingByHour ||
    producNetLoading ||
    producNetLoadingByHour ||
    loadingContext
  )
    return <p>Cargando...</p>;

  if (movilError || producNetError)
    return <p>Error: {movilError || producNetError}</p>;

  if (hour === "Todo el día") {
    return (
      <div className="flex bg-white max-w-[805px] ml-4 mr-4 h-[200px]  rounded-lg">
        <div className="justify-center h-[200px] w-full rounded-lg  bg-white">
          <Line data={lineChartData} options={lineDataoptions} />
        </div>
        <div className="pt-2 rounded-lg">
          <h2 className="text-xl font-bold text-foreground text-emerald-700 pt-2">
            Accesos Produnet
          </h2>
          <p className="text-lg">
            <span className="font-bold">
              {Math.round(sumOfProducNetScores).toLocaleString("en-US")}
            </span>
          </p>
          <h2 className="text-xl font-bold text-foreground text-emerald-700 pt-4">
            Accesos Móvil
          </h2>
          <p className="text-lg">
            <span className="font-bold">
              {Math.round(sumOfMovilScores).toLocaleString("en-US")}
            </span>
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex bg-white max-w-[790px] h-[200px]  rounded-lg">
        <div className="justify-center ml-10 h-[200px] w-full rounded-lg  bg-white">
          <Bar data={chartData} options={options} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground text-emerald-700 pt-6">
            Accesos Produnet
          </h2>
          <p className="text-lg  ">
            <span className="font-bold">
              {producNetDataByHour.toLocaleString("en-US")}
            </span>
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground text-emerald-700 pt-6">
            Accesos Móvil
          </h2>
          <p className="text-lg  ">
            <span className="font-bold">
              {movilDataByHour.toLocaleString("en-US")}
            </span>
          </p>
        </div>
      </div>
    );
  }
};

export default ModulosProdunetYmovil;
