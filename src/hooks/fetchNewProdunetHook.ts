import { useState, useEffect } from 'react';
import axios from 'axios';
import { calculateTimeUntilNextHour, convertToISO } from '../helper/dateAndTimeHelpers';
import { CommonOutputResultsFromAzure, PredictionByHour } from '../types/predictionTypes';
import { allDayhours } from '../constants/hours';

const getHour = (completeHour:string) => {
    const extractedHour = completeHour.split(':')[0];
    return extractedHour;
}




const useFetchNewProdunetHook = (filterDate:string, filterHour: string) => {
  const [dataAllHours, setData] = useState<PredictionByHour>(allDayhours);
  const [dataByHour, setDataByHour] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);



  const getTodayDate = (): string => {
    const now = new Date();
    now.setUTCHours(0, 0, 0, 0); // Establece la hora a 00:00:00 UTC
    return now.toISOString();
  };

 
  const fecha = convertToISO(filterDate);

  
  const fetchProdunetAllHours = async () => {
    setLoading(true);
    setError(null);

    const todayDate = getTodayDate();
    try {

      const updatedHours: PredictionByHour = { ...allDayhours };
      for(const hour in allDayhours){
        const dataToSend = {
          Inputs: {
            data: [
              {
                FECHA: fecha ?? todayDate,
                HORA: parseInt(getHour(hour)),
              },
            ],
          },
        };
        const token = `${import.meta.env.VITE_KEY_ACCESOSPRODUNET_HORA}`;
        console.log("token",token);
        const response = await axios.post<CommonOutputResultsFromAzure>(
          '/produnethora/score',
          dataToSend,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          }
        );
        updatedHours[hour] = response.data.Results[0];
      }
      
      console.log("updated hours produnet",updatedHours);
      setData(updatedHours);

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

    fetchProdunetAllHours();


      timeoutId = setTimeout(() => {


      fetchProdunetAllHours();

      const intervalId = setInterval(() => {

        fetchProdunetAllHours();
      }, 3600000); // 3600000 ms = 1 hora

      return () => clearInterval(intervalId);
    }, calculateTimeUntilNextHour());

    return () => {
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      if (intervalId !== undefined) clearInterval(intervalId);
    };
  }, [filterDate, filterHour]); // Dependencias vacías para ejecutar solo al montar

  return {
    data: dataAllHours,
    error,
    loading,
  };
};

export default useFetchNewProdunetHook;
