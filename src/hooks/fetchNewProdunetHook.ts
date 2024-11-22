import { useState, useEffect } from 'react';
import axios from 'axios';
import { CommonInputDateandTime, PredictionByHour } from '../types/predictionTypes';
import { allDayhours } from '../constants/hours';


const useFetchNewProdunetHook = (filterDate:string, filterHour: string) => {
  const [dataAllHours, setData] = useState<PredictionByHour>(allDayhours);
  const [dataByHour, setDataByHour] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loadingAllHours, setLoadingAllHours] = useState<boolean>(false);
  const [loadingByHour, setLoadingByHour] = useState<boolean>(false);

  const endpoint = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_ENDPOINT_PRODUNETHORA}`;

  
  const fetchProdunetAllHours = async () => {
    setLoadingAllHours(true);
    setError(null);
    try {

      const updatedHours: PredictionByHour = { ...allDayhours };
      for(const hour in allDayhours){
        const requestData: CommonInputDateandTime = {
          fecha: filterDate,
          hora: hour,
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
        updatedHours[hour] = response.data;
      }
      
      setData(updatedHours);

    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Error response:', err.response?.data);
        setError('Error response: ' + err.response?.data);
      } else {
        console.error('Unexpected error:', err);
      }
    } finally {
      setLoadingAllHours(false);
    }
  };


  const fetchProdunetByHour = async () => {
    setLoadingByHour(true);
    setError(null);
    try {
      const requestData: CommonInputDateandTime = {
        fecha: filterDate,
        hora: filterHour,
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
        setDataByHour(response.data);

    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Error response:', err.response?.data);
        setError('Error response: ' + err.response?.data);
      } else {
        console.error('Unexpected error:', err);
      }
    } finally {
      setLoadingByHour(false);
    }
  };

  useEffect(() => {
    if (filterHour === "Todo el día") {
      console.log("fetching produnet all hours");
      fetchProdunetAllHours();
    } else {
      console.log("fetching produnet just an hour");
      fetchProdunetByHour();
    }
  }, [filterDate, filterHour]); // Dependencias vacías para ejecutar solo al montar

  return {
    dataAllHours,
    dataByHour,
    error,
    loadingAllHours,
    loadingByHour
  };
};

export default useFetchNewProdunetHook;
