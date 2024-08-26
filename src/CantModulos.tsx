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
import useAccesoProducNet from "./hooks/fetchAcesoProdunetHook";
import { useDateContext } from "../contexts/DateContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HorizontalBarChart: React.FC = () => {
  const { date, loadingContext } = useDateContext();
  const {
    data: movilData,
    loading: movilLoading,
    error: movilError,
  } = useAccesoBancaMovil(date); // Usa el hook de Banca Movil
  const {
    data: producNetData,
    loading: producNetLoading,
    error: producNetError,
  } = useAccesoProducNet(date); // Usa el hook de ProducNet

  // Si los valores devueltos por las APIs están disponibles, los usamos; de lo contrario, mostramos un valor por defecto
  const movilScore = movilData?.score ?? 19;
  const producNetScore = producNetData?.score ?? 12;

  const chartData = {
    labels: ["ProduNet", "Movil"],
    datasets: [
      {
        label: "Cantidad",
        data: [Math.round(producNetScore), Math.round(movilScore)],
        backgroundColor: [
          "rgba(104, 211, 145, 1)", // Color para 'ProduNet'
          "rgba(47, 133, 90, 1)", // Color para 'Movil'
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
        text: "Cantidad de Accesos al Módulo",
      },
    },
  };

  if (movilLoading || producNetLoading || loadingContext) return <p>Cargando...</p>;
  if (movilError || producNetError)
    return <p>Errooooooooor: {movilError || producNetError}</p>;

  return (
    <div className="flex bg-white max-w-[805px] h-[247px] shadow-xl rounded-lg">
      <div className="justify-center h-[247px] w-full rounded-lg  bg-white">
        <Bar data={chartData} options={options} />
      </div>
      <div className=" p-4 rounded-lg">
        <h2 className="text-xl font-bold text-foreground text-emerald-700 pt-6">ProduNet</h2>
        <p className="text-lg  ">
          <span className="font-bold">{Math.round(producNetScore)}</span>
        </p>
        <h2 className="text-xl font-bold text-foreground text-emerald-700 pt-10">Movil</h2>
        <p className="text-lg">
          <span className="font-bold">{Math.round(movilScore)}</span>
        </p>
      </div>   
    </div>
  );
};

export default HorizontalBarChart;
