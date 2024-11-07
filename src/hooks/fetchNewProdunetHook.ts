import { useState, useEffect } from 'react';
import axios from 'axios';
import { calculateTimeUntilNextHour, convertToISO } from '../helper/dateAndTimeHelpers';
import { CommonOutputResultsFromAzure, PredicitionByHour } from '../types/predictionTypes';




const getHour = (completeHour:string) => {
    const extractedHour = completeHour.split(':')[0];
    return extractedHour;
}

export const produnetHours: PredicitionByHour = {
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


const useFetchNewProdunetHook = (filterDate:string, filterHour: string) => {
  const [data, setData] = useState<PredicitionByHour>(produnetHours);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);



  const getTodayDate = (): string => {
    const now = new Date();
    now.setUTCHours(0, 0, 0, 0); // Establece la hora a 00:00:00 UTC
    return now.toISOString();
  };

 
  const fecha = convertToISO(filterDate);

  
  const fetchProdunetPrediction = async () => {
    setLoading(true);
    setError(null);

    const todayDate = getTodayDate();
    try {

      const updatedHours: PredicitionByHour = { ...produnetHours };
      for(const hour in produnetHours){
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
  
        const response = await axios.post<CommonOutputResultsFromAzure>(
          '/produnet/score',
          dataToSend,
          {
            headers: {
              'Content-Type': 'application/json',
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

    fetchProdunetPrediction();


      timeoutId = setTimeout(() => {


      fetchProdunetPrediction();

      const intervalId = setInterval(() => {

        fetchProdunetPrediction();
      }, 3600000); // 3600000 ms = 1 hora

      return () => clearInterval(intervalId);
    }, calculateTimeUntilNextHour());

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
