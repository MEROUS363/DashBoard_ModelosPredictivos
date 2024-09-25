import React, { useState, useEffect } from "react";
import { useDateContext } from "../contexts/DateContext";
import axios from "axios";
import { Info } from "lucide-react";
import { Line } from "react-chartjs-2";
import { LineGraphTop10 } from "./LineGraphTop10";

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
  const { typeOfData, date } = useDateContext();
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [selectedPrediction, setSelectedPrediction] =
    useState<Prediction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (prediction: Prediction) => {
    setSelectedPrediction(prediction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPrediction(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchAllPredictions = async (typeOfData: string) => {


      try {
        if (typeOfData === "FiltroXHora") {
          const fechaxDia = "09/06/2024"; // UTILIZAR EL VALOR DEL FILTRO
          let allPredictions: Prediction[] = [];

          for (let hour = 0; hour < 24; hour++) {
            const hora = `${hour.toString().padStart(2, "0")}:00:00`;
            const response = await fetchPrediction(date, hora);
            const response2 = await fetchPredictionMovil(date, hora);
            let dailyTotal = 0;

            if (response && response2) {
              dailyTotal =
                Math.round(response.score) + Math.round(response2.score);
              allPredictions.push({
                fecha: date,
                hora: hora,
                usuarios: dailyTotal,
              });
            } else {
              console.error(`Error fetching data for ${date} ${hora}`);
            }
          }

          allPredictions.sort((a, b) => b.usuarios - a.usuarios);
          setPredictions(allPredictions.slice(0, 10));
        } else if (typeOfData === "FiltroXFecha") {
          const date = new Date();
          const endOfYear = new Date(date.getFullYear(), 11, 31);
          const daysRemaining = Math.ceil(
            (endOfYear.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
          );
          let currentDate = new Date(date);
          let allPredictions: Prediction[] = [];

          for (let i = 0; i < daysRemaining; i++) {
            const month = (currentDate.getMonth() + 1)
              .toString()
              .padStart(2, "0");
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
                dailyTotal =
                  Math.round(response.score) + Math.round(response2.score);

                if (maxDailyTotal < dailyTotal) {
                  maxDailyTotal = dailyTotal;
                  maxHora = hora;
                }
              } else {
                console.error(`Error fetching data for ${fecha} ${hora}`);
              }
            }

            allPredictions.push({
              fecha,
              hora: maxHora,
              usuarios: maxDailyTotal,
            });
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
  }, [typeOfData, date]);

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
    <div className="max-w-lg mx-auto h-auto bg-white rounded-lg shadow-md p-5 text-center">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-emerald-700 mb-3">
          Top 10 Días más transaccionales
        </h2>
        <div className=" rounded-lg">
          <table className="table-auto w-full bg-gray-100 text-black rounded-lg">
            <thead>
              <tr className="bg-emerald-100">
                <th className="px-4 py-2 text-left text-emerald-700 font-semibold">
                  Fecha
                </th>
                <th className="px-4 py-2 text-left text-emerald-700 font-semibold">
                  Hora
                </th>
                <th className="px-4 py-2 text-left text-emerald-700 font-semibold">
                  Accesos
                </th>
                <th className="px-4 py-2 text-emerald-700 font-semibold text-center">
                  Detalle diario
                </th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((prediction) => (
                <tr
                  key={`${prediction.fecha}-${prediction.hora}`}
                  className="hover:bg-emerald-50 cursor-pointer transition-colors duration-200"
                >
                  <td className="px-4 py-2 text-left">
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
                  <td className="px-4 py-2 border-l border-gray-300">
                    {prediction.hora}
                  </td>
                  <td className="px-4 py-2 border-l border-gray-300">
                    {Math.round(prediction.usuarios)}
                  </td>
                  <td className="px-4 py-2 border-l border-gray-300 text-center">
                    <label
                      htmlFor="prediction-modal"
                      className="btn btn-sm btn-ghost text-emerald-600"
                      onClick={() => openModal(prediction)}
                    >
                      <Info color="#00693C" />
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="modal-box bg-white rounded-lg p-6 w-3/4 h-auto max-w-4xl">
            <h3 className="font-bold text-lg mb-4">
              Detalles de la predicción
            </h3>
            {!selectedPrediction ? (
              <h2>No existen datos para la fecha indicada</h2>
            ) : (
              <LineGraphTop10 date={selectedPrediction.fecha} />
            )}
            <div className="modal-action mt-4">
              <button
                className="btn bg-emerald-600 text-white"
                onClick={closeModal}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Top10Days;
