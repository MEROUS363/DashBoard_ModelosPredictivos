// src/components/Top10Days.tsx

import React, { useState, useEffect } from "react";
import useAccesoProducNet from "./hooks/fetchAcesoProdunetHook";
import axios from "axios";
import { useDateContext } from "../contexts/DateContext";

interface Prediction {
  fecha: string;
  hora: string;
  usuarios: number;
}
interface AccesoProducNetOutput {
  score: number;
}
const Top10Days: React.FC = () => {



  const [predictions, setPredictions] = useState<Prediction[]>([]);

  useEffect(() => {
    const fetchAllPredictions = async () => {
      const date = new Date();
      const days = 30;
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


  return (
    <div className="w-96 h-[247px] overflow-x-auto rounded-lg shadow-xl">
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
              <td className=" px-4 py-2">{prediction.fecha}</td>
              <td className="px-4 py-2 border-r-2 border-emerald-700">{prediction.hora}</td>
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
