import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

interface ConsumoTarjetasDebitoInput {
  fecha: string;
  hora: string;
}

interface ConsumoTarjetasDebitoOutput {
  score: number;
  maxScore: number; 
  peakHour: number;
}

type Hours = {
  [key: string]: number;
};

export const hours: Hours = {
  '00:00:00': 0,
  '01:00:00': 0,
  '02:00:00': 0,
  '03:00:00': 0,
  '04:00:00': 0,
  '05:00:00': 0,
  '06:00:00': 0,
  '07:00:00': 0,
  '08:00:00': 0,
  '09:00:00': 0,
  '10:00:00': 0,
  '11:00:00': 0,
  '12:00:00': 0,
  '13:00:00': 0,
  '14:00:00': 0,
  '15:00:00': 0,
  '16:00:00': 0,
  '17:00:00': 0,
  '18:00:00': 0,
  '19:00:00': 0,
  '20:00:00': 0,
  '21:00:00': 0,
  '22:00:00': 0,
  '23:00:00': 0,

};

const useConsumoTarjetasDebito = (fecha: string, hora: string) => {
  const [data, setData] = useState<Hours>(hours);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  const [maxScore, setMaxScore] = useState<number | null>(null);
  const [peakHour, setPeakHour] = useState<string | null>(null);

  const fetchScoresForDay = async () => {
    setLoading(true);
    setError(null);

    try {
      const updatedHours: Hours = { ...hours };

      for (const hour of Object.keys(hours)) {
        const requestData: ConsumoTarjetasDebitoInput = {
          fecha: fecha,
          hora: hour,
        };
        console.log("consultando tarjetas para", requestData.fecha, requestData.hora);
        const response = await axios.post<ConsumoTarjetasDebitoOutput>(
          'https://localhost:7123/api/Prediction/consumoTarjetasDebito',
          requestData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        updatedHours[hour] = response.data.score;
      }

      setData(updatedHours);
      const maxScore = Math.max(...Object.values(updatedHours).filter((score): score is number => score !== null));
      const peakHour = Object.keys(updatedHours).find(hour => updatedHours[hour] === maxScore) || null;

      setMaxScore(maxScore);
      setPeakHour(peakHour);
    } catch (err) {
      setError('Error al realizar la petición');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      fetchScoresForDay();
  }, [fecha, hora]);

  return {
    data,
    error,
    loading,
    fetchScoresForDay,
    maxScore, 
    peakHour
  };
};

export default useConsumoTarjetasDebito;
