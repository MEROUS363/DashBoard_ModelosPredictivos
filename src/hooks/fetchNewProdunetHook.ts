import { useState, useEffect } from 'react';
import axios from 'axios';
import {  addHours, differenceInMilliseconds, format, formatISO, parse, set } from 'date-fns';
import { convertToISO } from '../helper/convertDateToISOHelper';


interface AccesoProdunetOutPut {
  Results: number[];
}


const getHour = (completeHour:string) => {
    const extractedHour = completeHour.split(':')[0];
    return extractedHour;
}

const useFetchNewProdunetHook = (filterDate:string, filterHour: string) => {
  const [data, setData] = useState<number[] | null>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);



  const getTodayDate = (): string => {
    const now = new Date();
    now.setUTCHours(0, 0, 0, 0); // Establece la hora a 00:00:00 UTC
    return now.toISOString();
  };

  const getNextRoundedHour = (): string => {
    // Obtener la hora actual, redondearla a HH:00:00 y luego sumarle una hora
    const now = new Date();
    const roundedHour = set(now, { minutes: 0, seconds: 0, milliseconds: 0 });
    const nextHour = addHours(roundedHour, 1); // Sumamos una hora
    return format(nextHour, 'HH:mm:ss');
  };

  const hora = parseInt(getHour(filterHour));
  const fecha = convertToISO(filterDate);

  
  const fetchProdunetPrediction = async () => {
    setLoading(true);
    setError(null);

    const todayDate = getTodayDate();
    const nextHour = getNextRoundedHour(); 

    console.log("fecha y hora a mndar en produnet", fecha, hora, todayDate);
    try {
      const dataToSend = {
        Inputs: {
          data: [
            {
              FECHA: fecha ?? todayDate,
              HORA: hora,
            },
          ],
        },
      };

      const response = await axios.post<AccesoProdunetOutPut>(
        '/produnet/score',
        dataToSend,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setData(response.data.Results);

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
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let intervalId: ReturnType<typeof setInterval> | undefined;
    if (filterHour === "Todo el día") {
      setData(null);

      setError(null);
      setLoading(false);
    } else{

    fetchProdunetPrediction();

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

      timeoutId = setTimeout(() => {


      fetchProdunetPrediction();

      const intervalId = setInterval(() => {

        fetchProdunetPrediction();
      }, 3600000); // 3600000 ms = 1 hora

      return () => clearInterval(intervalId);
    }, calculateTimeUntilNextHour());
  }

    return () => {
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      if (intervalId !== undefined) clearInterval(intervalId);
    };
  }, [filterDate, filterHour]); // Dependencias vacías para ejecutar solo al montar

  return {
    data,
    error,
    loading,
  };
};

export default useFetchNewProdunetHook;
