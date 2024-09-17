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
  [key: string]: number | null;
};

export const hours: Hours = {
  '00:00:00': null,
  '01:00:00': null,
  '02:00:00': null,
  '03:00:00': null,
  '04:00:00': null,
  '05:00:00': null,
  '06:00:00': null,
  '07:00:00': null,
  '08:00:00': null,
  '09:00:00': null,
  '10:00:00': null,
  '11:00:00': null,
  '12:00:00': null,
  '13:00:00': null,
  '14:00:00': null,
  '15:00:00': null,
  '16:00:00': null,
  '17:00:00': null,
  '18:00:00': null,
  '19:00:00': null,
  '20:00:00': null,
  '21:00:00': null,
  '22:00:00': null,
  '23:00:00': null,

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
