import React from "react";
import { Bar, Line } from "react-chartjs-2";
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
} from "../../hooks/fetchConsumoTarjetasHook";
import { useDateContext } from "../../contexts/DateContext";
import { UnplugIcon } from "lucide-react";

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

const getSumOfScores = (data: Record<string, number>) => {
  return Object.values(data).reduce((sum, value) => sum + value, 0);
};

const LineChart: React.FC = () => {
  const { date, hour, loadingContext } = useDateContext();
  const {
    dataAllHours,
    dataByHour,
    error,
    loadingAllHours,
    loadingByHour,
    maxScore,
  } = useConsumoTarjetasDebito(date, hour);

  const sumOfScores = getSumOfScores(dataAllHours);

  const dataAdditional = Object.fromEntries(
    Array.from({ length: 24 }, (_, i) => [i, maxScore])
  );
  const horizontalLineData = new Array(Object.keys(hours).length).fill(
    Object.values(dataAdditional)[1]
  );

  const chartData = {
    labels: Object.keys(hours), // Las horas del día en el eje X
    datasets: [
      {
        label: "Consumo Predicho",
        data: Object.values(dataAllHours).map((value) =>
          value !== null && value !== undefined ? Math.round(value) : 0
        ),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0.1,
        fill: true,
      },
      {
        label: "Consumo Maximo", // Etiqueta para la nueva línea
        data: horizontalLineData,
        borderColor: "rgba(255, 0, 0, 1)",
        pointRadius: 0,
        pointHoverRadius: 0,
        borderWidth: 1, // Grosor de la línea predicha
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
        text: "Cantidad de Consumo Tarjeta de Débito",
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

  //options for bar data

  //const BarColor = sumOfScores > 20000 ? "rgba(239, 68, 68, 1)" : sumOfScores > 25000 ? "rgba(251, 191, 36, 1)" : "rgba(104, 211, 145, 1)";
  const chartDataBar = {
    labels: [""],
    datasets: [
      {
        label: "Consumo",
        data: [dataByHour],
        backgroundColor: ["rgba(104, 211, 145, 1)"],
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
        text: "Cantidad de Consumos Tarjeta de Débito",
      },
    },
  };

  if (loadingAllHours || loadingByHour || loadingContext)
    return (
      <>
        <div className="flex bg-white  h-[200px] rounded-lg">
          <div className="w-full h-full flex justify-center items-center bg-gray-200 animate-pulse rounded-md">
            <div className="w-10 h-10 border-4 border-t-green-500 border-gray-400 rounded-full animate-spin"></div>
            <p className="ml-2">Cargando...</p>
          </div>
        </div>
      </>
    );

  if (error)
    return (
      <>
        <div className="flex bg-white  h-[200px] rounded-lg">
          <div className="w-full h-full flex justify-center items-center bg-gray-200 rounded-md">
            <UnplugIcon className="h-28 mr-2" />
            <p className="ml-2">
              <strong>Error: </strong> {error}
            </p>
          </div>
        </div>
      </>
    );

  if (hour === "Todo el día") {
    return (
      <div className="flex bg-white max-w-[790px] h-[200px] rounded-lg shadow-lg">
        <div className="justify-center ml-10 h-[200px] w-full rounded-lg  bg-white">
          <Line data={chartData} options={options} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground text-emerald-700 pt-6">
            Total de Consumos
          </h2>
          <p className="text-lg font-normal">
            <span className="">{Math.round(sumOfScores).toLocaleString()}</span>
          </p>
        </div>
      </div>
    );
  }
  if (hour !== "FiltroXHora") {
    return (
      <div className="flex bg-white w-full h-[200px] rounded-lg shadow-lg py-2">
        <div className="justify-center w-full h-full rounded-l-lg py-2 border-r-2 border-gray-300">
          <Bar data={chartDataBar} options={barOptions} />
        </div>
        <div className="p-2">
          <h2 className="text-lg font-bold text-foreground text-emerald-700">
            Cantidad de Consumos
          </h2>
          <p className="text-lg font-normal">{dataByHour.toLocaleString()}</p>
        </div>
      </div>
    );
  }
};

export default LineChart;
