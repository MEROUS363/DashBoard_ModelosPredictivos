import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import useAccesoBancaMovil from './hooks/fetchAccesosBancaMovilHook';
import useAccesoProducNet from './hooks/fetchAcesoProdunetHook';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HorizontalBarChart: React.FC = () => {
  const { data: movilData, loading: movilLoading, error: movilError } = useAccesoBancaMovil(); // Usa el hook de Banca Movil
  const { data: producNetData, loading: producNetLoading, error: producNetError } = useAccesoProducNet(); // Usa el hook de ProducNet

  // Si los valores devueltos por las APIs están disponibles, los usamos; de lo contrario, mostramos un valor por defecto
  const movilScore = movilData?.score ?? 19;
  const producNetScore = producNetData?.score ?? 12;

  const chartData = {
    labels: ['ProduNet', 'Movil'],
    datasets: [
      {
        label: 'Cantidad',
        data: [producNetScore, movilScore],
        backgroundColor: [
          'rgba(104, 211, 145, 1)', // Color para 'ProduNet'
          'rgba(47, 133, 90, 1)',   // Color para 'Movil'
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Cantidad de Accesos al Módulo',
      },
    },
  };

  if (movilLoading || producNetLoading) return <p>Cargando...</p>;
  if (movilError || producNetError) return <p>Error: {movilError || producNetError}</p>;

  return (
    <div className="justify-center p-2 ml-16 h-[247px] max-w-[680px] rounded-lg shadow-xl bg-white">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default HorizontalBarChart;
