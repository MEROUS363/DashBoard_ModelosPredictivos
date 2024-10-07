import { useState, useEffect } from 'react';
import axios from 'axios';
import { calculateTimeUntilNextHour } from '../helper/dateAndTimeHelpers';
import { CommonOutputResultsFromAzure } from '../types/predictionTypes';


const TransSPI2 = (filterDate:string) => {
  const [data, setData] = useState<Record<number, CommonOutputResultsFromAzure | null>>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


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
              FECHA: filterDate ?? todayDate,
              CORTE: corte,
            },
          ],
        },
      };

      const response = await axios.post<CommonOutputResultsFromAzure>(
        '/api/score',
        dataToSend,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );



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


    const fetchAllCutOffs = async () => {
      // Ejecuta todas las llamadas API concurrentemente
      const cortes = [1, 2, 3];
      await Promise.all(cortes.map(fetchPredictionForCutOff));
    };

    fetchAllCutOffs();

    const timeoutId = setTimeout(() => {


      fetchAllCutOffs();

      const intervalId = setInterval(() => {

        fetchAllCutOffs();
      }, 3600000); // 3600000 ms = 1 hora

      return () => clearInterval(intervalId);
    }, calculateTimeUntilNextHour());

    return () => clearTimeout(timeoutId);
  }, [filterDate]); // Dependencias vacías para ejecutar solo al montar

  return {
    data,
    error,
    loading,
  };
};

export default TransSPI2;
