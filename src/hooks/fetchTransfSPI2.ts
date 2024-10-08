import { useState, useEffect } from 'react';
import axios from 'axios';
import { format, addHours, differenceInMilliseconds } from 'date-fns';

interface AccesoTransSPI2 {
  fecha: string; // Date as string in MM/DD/YYYY format
  corte: number;  // Cut-off number as a number
}

interface AccesoTransSPI2OutPut {
  score: number;
}

const TransSPI2 = () => {
  const [data, setData] = useState<Record<number, AccesoTransSPI2OutPut | null>>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentCorte, setCurrentCorte] = useState<number | null>(null);

  const getTodayDate = (): string => {
    const now = new Date();
    now.setUTCHours(0, 0, 0, 0); // Establece la hora a 00:00:00 UTC
    return now.toISOString();
  };

  const fetchPredictionForCutOff = async (corte: number) => {
    setLoading(true);
    setError(null);

    const todayDate = getTodayDate();


    try {
      const dataToSend = {
        Inputs: {
          data: [
            {
              FECHA: todayDate,
              CORTE: corte,
            },
          ],
        },
      };

      const response = await axios.post<AccesoTransSPI2OutPut>(
        '/api/score',
        dataToSend,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('API Response SPI2 corte:',corte , response.data);

      setData(prevData => ({ ...prevData, [corte]: response.data }));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Error response:', err.response?.data);
        setError('Error response: ' + err.response?.data);
      } else {
        console.error('Unexpected error:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("useEffect has been triggered");

    const fetchAllCutOffs = async () => {
      // Ejecuta todas las llamadas API concurrentemente
      const cortes = [1, 2, 3];
      await Promise.all(cortes.map(fetchPredictionForCutOff));
    };

    fetchAllCutOffs();

    const calculateTimeUntilNextHour = (): number => {
      const now = new Date();
      const nextHour = addHours(now, 1);
      const startOfNextHour = new Date(
        nextHour.getFullYear(),
        nextHour.getMonth(),
        nextHour.getDate(),
        nextHour.getHours(),
        0, 0, 0 // Set to start of the next hour
      );
      return differenceInMilliseconds(startOfNextHour, now);
    };

    const timeoutId = setTimeout(() => {

      fetchAllCutOffs();

      const intervalId = setInterval(() => {
        fetchAllCutOffs();
      }, 3600000); // 3600000 ms = 1 hora

      return () => clearInterval(intervalId);
    }, calculateTimeUntilNextHour());

    return () => clearTimeout(timeoutId);
  }, []); // Dependencias vacías para ejecutar solo al montar

  return {
    data,
    currentCorte,
    error,
    loading,
  };
};

export default TransSPI2;
