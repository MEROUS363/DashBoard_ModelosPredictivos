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
} from 'chart.js';

import 'chartjs-plugin-annotation'; // Asegúrate de importar el plugin

// Registra los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement);
const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateRandomData = (num: number, min: number, max: number) => 
    Array.from({ length: num }, () => getRandomNumber(min, max));
// Datos del gráfico
const data = {
    
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),  
    datasets: [
    {
      label: 'Ventas', // Etiqueta del dataset
      data: generateRandomData(24, 1000, 2000), // Datos aleatorios
      borderColor: 'rgba(75, 192, 192, 1)', // Color de la línea
      backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de fondo con opacidad para el área bajo la línea
      borderWidth: 2,
      tension: 0.1, // Suaviza las líneas
      fill: true, // Rellena el área bajo la línea
    },
  ],
};

// Opciones del gráfico
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Cantidad Consumo  Tarjeta de Debito',
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Horas', // Título del eje X
      },
    },
    y: {
      title: {
        display: true,
        text: 'Consumo', // Título del eje Y
      },
      beginAtZero: true, // Comienza el eje Y en 0
    },
    
  },
};

// Componente del gráfico
const LineChart: React.FC = () => (
  
    <div className="justify-center p-2  ml-16 h-[247px] max-w-[680px] rounded-lg shadow-xl bg-white">
        <Line data={data} options={options} />
    </div>
);

export default LineChart;
