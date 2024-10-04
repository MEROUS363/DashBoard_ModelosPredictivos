import { useState, useEffect } from 'react';
import axios from 'axios';
import { format, addHours, differenceInMilliseconds, set } from 'date-fns';

interface AccesoBancaMovilInput {
  fecha: string; // Date as string
  hora: string;  // Time as string
}

interface AccesoBancaMovilOutput {
  score: number;
}

const useAccesoBancaMovil = (filterDate: string, filterHour: string) => {
  const [data, setData] = useState<AccesoBancaMovilOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentHour, setCurrentHour] = useState<string | null>(null);


  const getTodayDate = (): string => {
    return format(new Date(), 'MM/dd/yyyy');
  };

  const getNextRoundedHour = (): string => {
    // Obtener la hora actual, redondearla a HH:00:00 y luego sumarle una hora
    const now = new Date();
    const roundedHour = set(now, { minutes: 0, seconds: 0, milliseconds: 0 });
    const nextHour = addHours(roundedHour, 1); // Sumamos una hora
    return format(nextHour, 'HH:mm:ss');
  };

  const fetchPredictionForNextHour = async () => {
    setLoading(true);
    setError(null);

    const todayDate = getTodayDate();
    const nextHour = getNextRoundedHour(); // Utilizar la siguiente hora redondeada


    try {
      const requestData: AccesoBancaMovilInput = {
        fecha: filterDate,
        hora: filterHour,
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
      setData(response.data);
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

    if (filterHour === "Todo el día") {
      setData(null);
      setCurrentHour(null);
      setError(null);
      setLoading(false);
    } else {

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
        }, 3600000); // 3600000 ms = 1 hora
      }, calculateTimeUntilNextHour());
    }

    // Función de limpieza que siempre se retorna
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
