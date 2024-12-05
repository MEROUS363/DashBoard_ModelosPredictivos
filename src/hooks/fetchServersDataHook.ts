import { useState, useEffect } from 'react';
import axios from 'axios';
import { ServerData } from '../components/servers/ModalServidor';
import { CommonInputDateandTime } from '../types/predictionTypes';
import { calculateTimeUntilNextHour, getNextRoundedHour } from '../helper/dateAndTimeHelpers';


const usePredictServers = (filteredDate:string, filteredHour:string) => {
  const [data, setData] = useState<ServerData[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentHour, setCurrentHour] = useState<string | null>(null);
  const endpoint = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_ENDPOINT_SERVERPREDICTIONS}`;

  const fetchPredictionForNextHour = async () => {
    setLoading(true);
    setError(null);

    const nextHour = getNextRoundedHour(); 
    try {
      const requestData: CommonInputDateandTime = {
        fecha: filteredDate,
        hora: filteredHour,
      };

      const response = await axios.post<ServerData[]>(
        endpoint,
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
      setError('Error en la petición a la API');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchPredictionForNextHour();
    const timeoutId = setTimeout(() => {


      fetchPredictionForNextHour();

          
      const intervalId = setInterval(() => {

        fetchPredictionForNextHour();
      }, 3600000); 


      return () => clearInterval(intervalId);
    }, calculateTimeUntilNextHour());


    return () => clearTimeout(timeoutId);
  }, [filteredDate, filteredHour]);

  return {
    data,
    currentHour,
    error,
    loading,
  };
};

export default usePredictServers;
