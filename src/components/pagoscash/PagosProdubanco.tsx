import React from "react";
import { Bar } from "react-chartjs-2";
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
import { useDateContext } from "../../contexts/DateContext";
import useFetchPagosProdubanco from "../../hooks/fetchPagosProdubancoCash";

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
  const { date, loadingContext } = useDateContext();
  const { data, error, loading } = useFetchPagosProdubanco(date);
  //options for bar data

  //const BarColor = sumOfScores > 20000 ? "rgba(239, 68, 68, 1)" : sumOfScores > 25000 ? "rgba(251, 191, 36, 1)" : "rgba(104, 211, 145, 1)";
  const chartDataBar = {
    labels: ["Pagos"],
    datasets: [
      {
        label: "Cantidad",
        data: [Math.round(data.Results[0])],
        backgroundColor: ["#78BE20"],
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y" as const,
    plugins: {
      legend: {
        position: "right" as const,
      },
      title: {
        display: true,
        text: "Cantidad de Pagos",
      },
    },
  };

  if (loading || loadingContext) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex bg-white max-w-[790px] h-[200px]  rounded-lg">
      <div className="justify-center ml-10 h-[200px] w-full rounded-lg  bg-white">
        <Bar data={chartDataBar} options={barOptions} />
      </div>
      <div>
        <h2 className="text-xl font-bold text-foreground text-emerald-700 pt-6">
          Cantidad de Pagos
        </h2>
        <p className="text-lg  ">
          <span className="font-bold">{Math.round(data.Results[0])}</span>
        </p>
      </div>
    </div>
  );
};

export default LineChart;
