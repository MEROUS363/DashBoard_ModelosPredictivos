import { useState, useEffect } from 'react';
import axios from 'axios';
import { calculateTimeUntilNextHour } from '../helper/dateAndTimeHelpers';



const TransSPI2 = (filterDate:string) => {
  const [data, setData] = useState<Record<number, number | null>>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const endpoint = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_ENDPOINT_SPI}`;
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
              fecha: filterDate ?? todayDate,
              corte: corte.toString(),
      };

   

      const response = await axios.post<number>(
        endpoint,
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
      await fetchPredictionForCutOff(1);
      await fetchPredictionForCutOff(2);
      await fetchPredictionForCutOff(3);
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
