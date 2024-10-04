import { useState, useEffect } from "react";
import axios from "axios";
import { convertToISO } from "../helper/convertDateToISOHelper";

export interface ProdunetAndBancaMovilInput {
  fecha: string;
  hour?: number;
}

export interface ProdunetAndBancaMovilOutput {
  hourPrediction: number;
}

export interface ProdunetanMovilResponse {
  produnetResults: ProdunetAndBancaMovilOutput[];
  movilResults: ProdunetAndBancaMovilOutput[];
}

const useProdunetAndMovil = (fecha: string, hour: string) => {
  const [data, setData] = useState<ProdunetanMovilResponse>({
    produnetResults: [],
    movilResults: [],
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchScoresForDay = async () => {
    setLoading(true);
    setError(null);

    try {
      // **Obtener total de movilResults con una sola solicitud**
      const movilRequestData: ProdunetAndBancaMovilInput = {
        fecha: fecha,
      };
      const movilResponse = await axios.post<ProdunetanMovilResponse>(
        "https://localhost:7123/api/Prediction/movilSum",
        movilRequestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const totalMovilSum = movilResponse.data.movilResults.reduce(
        (acc, result) => acc + result.hourPrediction,
        0
      );

      // **Realizar solicitudes para cada hora de produnetResults**
      const produnetResultsPromises: Promise<number>[] = [];

      for (let hora = 0; hora < 24; hora++) {
        const fetchProdunetData = async (h: number) => {
          try {
            // Convertir la fecha a formato ISO con hora 00:00:00.000Z
            const fechaISO = convertToISO(fecha);

            // Construir la estructura de solicitud requerida
            const requestData = {
              Inputs: {
                data: [
                  {
                    FECHA: fechaISO,
                    HORA: hora,
                  },
                ],
              },
              GlobalParameters: 1,
            };

            const response = await axios.post(
              "/produnet/score", // Reemplaza con el endpoint correcto
              requestData,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            // Extraer el resultado de la estructura de respuesta
            const sumPrediction = response.data.Results[0] || 0;
            return sumPrediction;
          } catch (error) {
            console.error(`Error en la hora ${h}:`, error);
            // Retorna 0 en caso de error para poder continuar con la suma
            return 0;
          }
        };
        produnetResultsPromises.push(fetchProdunetData(hora));
      }

      // Esperamos a que todas las promesas se resuelvan
      const produnetResults = await Promise.all(produnetResultsPromises);

      // Sumamos los resultados de produnetResults
      const totalProdunetSum = produnetResults.reduce(
        (acc, sumPrediction) => acc + sumPrediction,
        0
      );

      // Actualizamos el estado con los resultados obtenidos
      setData({
        produnetResults: [{ hourPrediction: totalProdunetSum }],
        movilResults: [{ hourPrediction: totalMovilSum }],
      });
    } catch (err) {
      setError("Error al realizar la petición");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Solo ejecutamos el fetch si es "Todo el día"
    if (hour !== "Todo el día") {
      return;
    }

    fetchScoresForDay();
  }, [fecha, hour]);

  return {
    data,
    error,
    loading,
  };
};

export default useProdunetAndMovil;
