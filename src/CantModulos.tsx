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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ['ProduNet', 'Movil'],
  datasets: [
    {
      label: 'Cantidad',
      data: [12, 19],
      backgroundColor: [
        'rgba(104, 211, 145, 1)', // Color para 'ProduNet'
        'rgba(47, 133, 90, 1)',  // Color para 'Movil'
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
      text: 'Cantidad de Accesos al Modulo',
    },
  },
};

const HorizontalBarChart = () => {
  return (
    <div className="justify-center p-2  ml-16 h-[247px] max-w-[680px] rounded-lg shadow-xl bg-white">
      <Bar  data={data} options={options} />
    </div>
  );
};

export default HorizontalBarChart;
