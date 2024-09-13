import React, { useState, useEffect } from "react";
import { useDateContext } from "../contexts/DateContext";
import axios from "axios";

interface Prediction {
  fecha: string;
  hora: string;
  usuarios: number;
}

interface AccesoProducNetOutput {
  score: number;
}

interface AccesoBancaMovilOutput {
  score: number;
}

const Top10Days: React.FC = () => {
  const { typeOfData } = useDateContext();
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  useEffect(() => {
    const fetchAllPredictions = async (typeOfData: string) => {
      console.log("Fetching predictions for typeOfData:", typeOfData); // Verifica cuando se llama
  
      try {
        if (typeOfData === "FiltroXHora") {
          const fechaxDia = "09/06/2024"; // UTILIZAR EL VALOR DEL FILTRO
          let allPredictions: Prediction[] = [];
  
          for (let hour = 0; hour < 24; hour++) {
            const hora = `${hour.toString().padStart(2, "0")}:00:00`;
            const response = await fetchPrediction(fechaxDia, hora);
            const response2 = await fetchPredictionMovil(fechaxDia, hora);
            let dailyTotal = 0;
  
            if (response && response2) {
              dailyTotal = Math.round(response.score) + Math.round(response2.score);
              allPredictions.push({
                fecha: fechaxDia,
                hora: hora,
                usuarios: dailyTotal,
              });
            } else {
              console.error(`Error fetching data for ${fechaxDia} ${hora}`);
            }
          }
  
          allPredictions.sort((a, b) => b.usuarios - a.usuarios);
          setPredictions(allPredictions.slice(0, 10));
        } else if (typeOfData === "FiltroXFecha") {
          const date = new Date();
          const endOfYear = new Date(date.getFullYear(), 11, 31);
          const daysRemaining = Math.ceil((endOfYear.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
          let currentDate = new Date(date);
          let allPredictions: Prediction[] = [];
  
          for (let i = 0; i < daysRemaining; i++) {
            const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
            const day = currentDate.getDate().toString().padStart(2, "0");
            const year = currentDate.getFullYear();
            const fecha = `${month}/${day}/${year}`;
            let dailyTotal = 0;
            let maxDailyTotal = 0;
            let maxHora = "";
  
            for (let hour = 0; hour < 24; hour++) {
              const hora = `${hour.toString().padStart(2, "0")}:00:00`;
              const response = await fetchPrediction(fecha, hora);
              const response2 = await fetchPredictionMovil(fecha, hora);
  
              if (response && response2) {
                dailyTotal = Math.round(response.score) + Math.round(response2.score);
  
                if (maxDailyTotal < dailyTotal) {
                  maxDailyTotal = dailyTotal;
                  maxHora = hora;
                }
              } else {
                console.error(`Error fetching data for ${fecha} ${hora}`);
              }
            }
  
            allPredictions.push({ fecha, hora: maxHora, usuarios: maxDailyTotal });
            currentDate.setDate(currentDate.getDate() + 1);
          }
  
          allPredictions.sort((a, b) => b.usuarios - a.usuarios);
          setPredictions(allPredictions.slice(0, 10));
        } else {
          console.warn(`Unknown typeOfData: ${typeOfData}`);
          // Opcionalmente, podrías manejar valores desconocidos de otra manera aquí
          setPredictions([]);
        }
      } catch (error) {
        console.error("Error fetching predictions:", error);
      }
    };
  
    // Asegúrate de que typeOfData esté definido y tenga un valor válido
    if (typeOfData) {
      fetchAllPredictions(typeOfData);
    } else {
      console.warn("typeOfData is not defined");
    }
  }, [typeOfData]);
  
  

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

  const fetchPredictionMovil = async (fecha: string, hora: string) => {
    try {
      const requestData2 = { fecha: fecha, hora: hora };

      const response = await axios.post<AccesoBancaMovilOutput>(
        "https://localhost:7123/api/Prediction/accesoBancaMovil",
        requestData2,
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
    <div className="w-96 h-[247px] overflow-x-auto mr-5 rounded-xl shadow-xl">
      <table className="text-center w-full bg-white text-black dark:bg-card border border-card dark:border-card">
        <thead>
          <tr className="bg-primary dark:bg-primary">
            <th className="px-4 py-2 text-emerald-700 border-b-2 border-emerald-700">
              Fecha
            </th>
            <th className="px-4 py-2 text-emerald-700 border-b-2 border-r-2 border-emerald-700">
              Hora
            </th>
            <th className="px-4 py-2 text-emerald-700 border-b-2 border-emerald-700">
              Cantidad de Accesos
            </th>
          </tr>
        </thead>
        <tbody className="overflow-y-scroll">
          {predictions.map((prediction) => (
            <tr
              key={`${prediction.fecha}-${prediction.hora}`}
              className="bg-card dark:bg-card"
            >
              <td className="px-4 py-2">
                {(() => {
                  const [month, day, year] = prediction.fecha
                    .split("/")
                    .map(Number);
                  const dayFormatted = String(day).padStart(2, "0");
                  const monthFormatted = String(month).padStart(2, "0");
                  const yearFormatted = year;
                  return `${dayFormatted}/${monthFormatted}/${yearFormatted}`;
                })()}
              </td>
              <td className="px-4 py-2 border-r-2 border-emerald-700">
                {prediction.hora}
              </td>
              <td className="px-4 py-2">{Math.round(prediction.usuarios)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Top10Days;
