// src/components/Top10Days.tsx

import React, { useState, useEffect } from "react";
import useAccesoBancaMovil from "./hooks/fetchAccesosBancaMovilHook";
import useAccesoProducNet from "./hooks/fetchAcesoProdunetHook";
import axios from "axios";

interface Prediction {
  fecha: string;
  hora: string;
  usuarios: number;
}
interface AccesoProducNetOutput {
  score: number;
}

const Top10Days: React.FC = () => {
  const { error, loading } = useAccesoProducNet();
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  
  useEffect(() => {
    const fetchAllPredictions = async () => {
      const date = new Date();
      const endOfYear = new Date(date.getFullYear(), 11, 31);
      const differenceInTime: number = endOfYear.getTime() - date.getTime();
      const days = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
      let currentDate = new Date(date); // Clonar la fecha inicial
      let allPredictions: Prediction[] = [];

      for (let i = 0; i < days; i++) {
        const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
        const day = currentDate.getDate().toString().padStart(2, "0");
        const year = currentDate.getFullYear();
        const fecha = `${month}/${day}/${year}`;
        let dailyTotal = 0;
        for (let hour = 0; hour < 1; hour++) {
          const hora = `${hour.toString().padStart(2, "0")}:00:00`;
          const response = await fetchPrediction(fecha, hora);
          if (response) {
            dailyTotal = response.score;
            allPredictions.push({ fecha, hora, usuarios: dailyTotal });
            // Ajusta esto según la estructura de respuesta de tu API
          }
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }

      // Ordenar las predicciones por la cantidad de usuarios
      allPredictions.sort((a, b) => b.usuarios - a.usuarios);

      // Seleccionar el top 10 días más congestionados
      setPredictions(allPredictions.slice(0, 10));
    };

    fetchAllPredictions();
  }, []);

  const fetchPrediction = async (fecha: string, hora: string) => {
    try {
      const requestData = { date: fecha, time: hora };
      const response = await axios.post<AccesoProducNetOutput>(
        "https://localhost:7123/api/Prediction/accesosProdunet",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching prediction:", error);
      return null;
    }
  };
  

  if (loading) {
    return <div>Cargando predicciones...</div>;
  }

  if (error) {
    return <div>Ha ocurrido un error: {error}</div>;
  }

  return (
    <div className="w-96 h-[247px] overflow-x-auto mr-5  rounded-xl shadow-xl">
      <table className="text-center w-full bg-white text-black dark:bg-card border border-card dark:border-card">
        <thead>
          <tr className="bg-primary dark:bg-primary">
            <th className="px-4 py-2 text-emerald-700 border-b-2 border-emerald-700">Fecha</th>
            <th className="px-4 py-2 text-emerald-700 border-b-2 border-r-2 border-emerald-700">Hora</th>
            <th className="px-4 py-2 text-emerald-700 border-b-2 border-emerald-700">Cantidad de Accesos ProduNet</th>
          </tr>
        </thead>
        <tbody className=" overflow-y-scroll">
          {predictions.map((prediction) => (
            <tr
              key={`${prediction.fecha}-${prediction.hora}`}
              className="bg-card dark:bg-card"
            >
              <td className=" px-4 py-2">{(() => {
                const [month, day, year] = prediction.fecha.split('/').map(Number);
                const dayFormatted = String(day).padStart(2, '0');
                const monthFormatted = String(month).padStart(2, '0');
                const yearFormatted = year;
                return `${dayFormatted}/${monthFormatted}/${yearFormatted}`;
              })()}</td>
              <td className="px-4 py-2 border-r-2 border-emerald-700">{/*{prediction.hora}*/}24/7</td>
              <td className="px-4 py-2">{Math.round(prediction.usuarios)}</td>
            </tr>
            
          ))}
          <tr            >
              <td className=" px-4 py-2"></td>
              <td className="px-4 py-2 border-r-2 border-emerald-700">Total Maximo</td>
              <td className="px-4 py-2">1500</td>
            </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Top10Days;
