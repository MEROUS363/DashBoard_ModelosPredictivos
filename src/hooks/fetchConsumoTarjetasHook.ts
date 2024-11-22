import { useState, useEffect } from 'react';
import axios from 'axios';
import { CommonInputDate, CommonInputDateandTime, PredicitionByHour } from '../types/predictionTypes';


interface ConsumoTarjetasDebitoOutput {
  score: number;
  maxScore: number; 
  peakHour: number;
}

export const hours: PredicitionByHour = {
  '00:00': 0,
  '01:00': 0,
  '02:00': 0,
  '03:00': 0,
  '04:00': 0,
  '05:00': 0,
  '06:00': 0,
  '07:00': 0,
  '08:00': 0,
  '09:00': 0,
  '10:00': 0,
  '11:00': 0,
  '12:00': 0,
  '13:00': 0,
  '14:00': 0,
  '15:00': 0,
  '16:00': 0,
  '17:00': 0,
  '18:00': 0,
  '19:00': 0,
  '20:00': 0,
  '21:00': 0,
  '22:00': 0,
  '23:00': 0,

};

const useConsumoTarjetasDebito = (fecha: string, hora: string) => {
  const [dataByHour, setDataByHour] = useState<PredicitionByHour>(hours);
  const [dataByDay, setDataByDay] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  const [maxScore, setMaxScore] = useState<number | null>(null);
  const [peakHour, setPeakHour] = useState<string | null>(null);
  
  const fetchScoresForDay = async () => {
    setLoading(true);
    setError(null);

    try {
        const endpoint =`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_ENDPOINT_DEBITODIA}`;
        const requestData: CommonInputDate = {
          fecha: fecha,
        };

        const response = await axios.post<number>(
          endpoint,
          requestData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
     
      setDataByDay(response.data);
    } catch (err) {
      setError('Error al realizar la petición');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const fetchScoresForHour = async () => {
    setLoading(true);
    setError(null);
    const endpoint = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_ENDPOINT_DEBITOHORA}`;

    try {
      const updatedHours: PredicitionByHour = { ...hours };

      for (const hour of Object.keys(hours)) {
        const requestData: CommonInputDateandTime = {
          fecha: fecha,
          hora: hour,
        };
        const response = await axios.post<ConsumoTarjetasDebitoOutput>(
          endpoint,
          requestData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        updatedHours[hour] = response.data.score;
        
      }

      setDataByHour(updatedHours);
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
    if (hora === "Todo el día") {
      fetchScoresForDay();
    } else {
      fetchScoresForHour();
    }
  }, [fecha, hora]);
 


  return {
    dataByHour,
    dataByDay,
    error,
    loading,
    fetchScoresForDay,
    maxScore, 
    peakHour
  };
};

export default useConsumoTarjetasDebito;
