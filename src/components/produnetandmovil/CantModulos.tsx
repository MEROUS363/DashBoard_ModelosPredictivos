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
import { UnplugIcon } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const getSumOfScores = (data: Record<string, number>) => {
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

  const sumOfMovilScores = getSumOfScores(movilDataAllHours || {});
  const sumOfProducNetScores = getSumOfScores(producNetData || {});

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
        label: "Accesos",
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
    return (
      <>
        <div className="flex bg-white  h-[200px] rounded-lg shadow-lg">
          <div className="w-full h-full flex justify-center items-center bg-gray-200 animate-pulse rounded-md">
            <div className="w-10 h-10 border-4 border-t-green-500 border-gray-400 rounded-full animate-spin"></div>
            <p className="ml-2">Cargando...</p>
          </div>
        </div>
      </>
    );

  if (movilError || producNetError)
    return (
      <>
        <div className="flex bg-white  h-[200px] rounded-lg shadow-lg">
          <div className="w-full h-full flex justify-center items-center bg-gray-200 rounded-md">
            <UnplugIcon className="h-28 mr-2" />
            <p className="ml-2">
              <strong>Error: </strong> {movilError || producNetError}
            </p>
          </div>
        </div>
      </>
    );

  if (hour === "Todo el día") {
    return (
      <div className="flex bg-white w-full ml-4 mr-4 h-[200px] rounded-lg shadow-lg">
        <div className="justify-center h-[200px] w-full rounded-lg  bg-white">
          <Line data={lineChartData} options={lineDataoptions} />
        </div>
        <div className="px-2">
          <h2 className="text-lg font-bold text-foreground text-emerald-700">
            Accesos Produnet
          </h2>
          <p className="text-lg">
            <span className="">
              {Math.round(sumOfProducNetScores).toLocaleString("en-US")}
            </span>
          </p>
          <h2 className="text-xl font-bold text-foreground text-emerald-700 pt-4">
            Accesos Móvil
          </h2>
          <p className="text-lg">
            <span className="">
              {Math.round(sumOfMovilScores).toLocaleString("en-US")}
            </span>
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex bg-white w-full h-[200px] rounded-lg shadow-lg py-2">
        {/* <div className="justify-center ml-5 h-[200px] w-full rounded-lg  bg-white"> */}
        <div className="justify-center w-full h-full rounded-l-lg py-2 border-r-2 border-gray-300">
          <Bar data={chartData} options={options} />
        </div>
        <div className="pl-2">
          <h2 className="text-lg font-bold text-foreground text-emerald-700">
            Accesos Produnet
          </h2>
          <p className="text-lg  ">
            <span className="">
              {producNetDataByHour.toLocaleString("en-US")}
            </span>
          </p>
        </div>
        <div className="pr-2">
          <h2 className="text-xl font-bold text-foreground text-emerald-700">
            Accesos Móvil
          </h2>
          <p className="text-lg  ">
            <span className="">{movilDataByHour.toLocaleString("en-US")}</span>
          </p>
        </div>
      </div>
    );
  }
};

export default ModulosProdunetYmovil;
