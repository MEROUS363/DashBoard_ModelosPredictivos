import React from 'react';
import { Line } from 'react-chartjs-2';
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
} from 'chart.js';
import useConsumoTarjetasDebito, { hours } from './hooks/fetchConsumoTarjetasHook';

ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement, Filler);

const LineChart: React.FC = () => {
  const { data, error, loading } = useConsumoTarjetasDebito(); // No need to call fetchScoresForDay manually

  const chartData = {
    labels: Object.keys(hours), // Las horas del día en el eje X
    datasets: [
      {
        label: 'Consumo Predicho',
        data: Object.values(data), // Los valores predichos en el eje Y
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
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
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Cantidad Consumo Tarjeta de Débito',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Horas',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Consumo',
        },
        beginAtZero: true,
      },
    },
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="justify-center p-2 ml-16 h-[247px] max-w-[680px] rounded-lg shadow-xl bg-white">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
