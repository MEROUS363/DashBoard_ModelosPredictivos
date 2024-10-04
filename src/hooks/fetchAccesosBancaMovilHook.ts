import { useState, useEffect } from 'react';
import axios from 'axios';
import { format, addHours, differenceInMilliseconds, set } from 'date-fns';
import { CommonInputDateandTime, PredicitionByHour } from '../types/predictionTypes';

interface AccesoBancaMovilOutput {
  score: number;
}


export const movilHours: PredicitionByHour = {
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

const useAccesoBancaMovil = (filterDate: string, filterHour: string) => {
  const [data, setData] = useState<PredicitionByHour>(movilHours);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentHour, setCurrentHour] = useState<string | null>(null);

  const getNextRoundedHour = (): string => {
    const now = new Date();
    const roundedHour = set(now, { minutes: 0, seconds: 0, milliseconds: 0 });
    const nextHour = addHours(roundedHour, 1); // Sumamos una hora
    return format(nextHour, 'HH:mm:ss');
  };

  const fetchPredictionForNextHour = async () => {
    setLoading(true);
    setError(null);

    const nextHour = getNextRoundedHour(); // Utilizar la siguiente hora redondeada
    try {

      const updatedHours: PredicitionByHour = { ...movilHours };

      for (const hour of Object.keys(movilHours)) {
        const requestData: CommonInputDateandTime = {
          fecha: filterDate,
          hora: hour,
        };
        const response = await axios.post<AccesoBancaMovilOutput>(
          'https://localhost:7123/api/Prediction/accesoBancaMovil',
          requestData,
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );

        updatedHours[hour] = response.data.score;
      }
      setData(updatedHours);
      setCurrentHour(nextHour);
    } catch (err) {
      setError('Error during API request');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let intervalId: ReturnType<typeof setInterval> | undefined;
      // Llamada inmediata
      fetchPredictionForNextHour();

      const calculateTimeUntilNextHour = (): number => {
        const now = new Date();
        const nextHour = addHours(now, 1);
        const startOfNextHour = new Date(
          nextHour.getFullYear(),
          nextHour.getMonth(),
          nextHour.getDate(),
          nextHour.getHours(),
          0,
          0,
          0 // Establecer al inicio de la siguiente hora
        );
        return differenceInMilliseconds(startOfNextHour, now);
      };

      timeoutId = setTimeout(() => {
        // Llamada en la siguiente hora completa
        fetchPredictionForNextHour();
        // Configurar intervalo para cada hora
        intervalId = setInterval(() => {
          fetchPredictionForNextHour();
        }, 3600000); //1 hora
      }, calculateTimeUntilNextHour());
    

    return () => {
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      if (intervalId !== undefined) clearInterval(intervalId);
    };
  }, [filterDate, filterHour]);
  

  return {
    data,
    currentHour,
    error,
    loading,
  };
};

export default useAccesoBancaMovil;
