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
} from "./hooks/fetchConsumoTarjetasHook";
import { useDateContext } from "../contexts/DateContext";

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
  const { date, hour, loadingContext, typeOfData } = useDateContext();
  const { data, error, loading, maxScore, peakHour } = useConsumoTarjetasDebito(date, hour); // No need to call fetchScoresForDay manually

  Object.keys(data).forEach((key) => {
    console.log(`Key: ${key}, Value: ${data[key]}`);
  });


  const dataAdditional = Object.fromEntries(
    Array.from({ length: 24 }, (_, i) => [i, maxScore])
  );
  const horizontalLineData = new Array(Object.keys(hours).length).fill(Object.values(dataAdditional)[1]);

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
    labels: ["Consumos Tarjeta de Débito"],
    datasets: [
      {
        label: "Cantidad",
        data: [Math.round(data[hour])],
        backgroundColor: [
          "rgba(239, 68, 68, 1)"
        ],
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

  if (loading || loadingContext) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  if(typeOfData==="FiltroXFecha"){
  return (
    <div className="flex bg-white max-w-[790px] h-[247px] m-6 shadow-xl rounded-lg">
      <div className="justify-center p-2 ml-10 h-[247px] w-full rounded-lg  bg-white">
        <Line data={chartData} options={options} />
      </div>
      <div>
      <h2 className="text-xl font-bold text-foreground text-emerald-700 pt-6">Cantidad de Consumos</h2>
        <p className="text-lg  ">
          <span className="font-bold">{maxScore !== null ? Math.round(maxScore) : 0}</span>
        </p>
      </div>
    </div>
  );}
  if(typeOfData === "FiltroXHora"){
    return (
      <div className="flex bg-white max-w-[790px] h-[247px] m-6 shadow-xl rounded-lg">
        <div className="justify-center p-2 ml-10 h-[247px] w-full rounded-lg  bg-white">
          <Bar data={chartDataBar} options={barOptions} />
        </div>
        <div>
        <h2 className="text-xl font-bold text-foreground text-emerald-700 pt-6">Cantidad de Consumos</h2>
          <p className="text-lg  ">
            <span className="font-bold">{maxScore !== null ? Math.round(data[hour]) : 0}</span>
          </p>
        </div>
      </div>
    );
  }
};

export default LineChart;
