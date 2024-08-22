import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  Filler,
} from "chart.js";
import useConsumoTarjetasDebito, {
  hours,
} from "./hooks/fetchConsumoTarjetasHook";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  Filler
);

const LineChart: React.FC = () => {
  const { data, error, loading, maxScore, peakHour } = useConsumoTarjetasDebito(); // No need to call fetchScoresForDay manually

  const chartData = {
    labels: Object.keys(hours), // Las horas del día en el eje X
    datasets: [
      {
        label: "Consumo Predicho",
        data: Object.values(data).map((value) =>
          value !== null && value !== undefined ? Math.round(value) : 0
        ),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0.1,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Cantidad Consumo Tarjeta de Débito",
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
          text: "Consumo",
        },
        beginAtZero: true,
      },
    },
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex bg-white max-w-[805px] h-[247px] shadow-xl rounded-lg">
      <div className="justify-center p-2 ml-10 h-[247px] w-full rounded-lg  bg-white">
        <Line data={chartData} options={options} />
      </div>
      <div className=" p-4 rounded-lg">
        <h2 className="text-xl font-bold text-foreground text-emerald-700 pt-6">
        Máximo Diario
        </h2>
        <p className="text-lg  ">
          Cantidad: <span className="font-bold">{maxScore !== null ? Math.round(maxScore) : 'Sin datos'}</span>
        </p>
        <p className="text-lg  ">
          Hora: <span className="font-bold">{peakHour}</span>
        </p>
      </div>
    </div>
  );
};

export default LineChart;
