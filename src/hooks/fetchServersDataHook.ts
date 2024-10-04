import { useState, useEffect } from 'react';
import axios from 'axios';
import { addHours, differenceInMilliseconds} from 'date-fns';
import { ServerData } from '../ModalServidor';
import { CommonInputDateandTime } from '../types/predictionTypes';
import { getNextRoundedHour } from '../helper/dateAndTimeHelpers';


const usePredictServers = (filteredDate:string, filteredHour:string) => {
  const [data, setData] = useState<ServerData[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentHour, setCurrentHour] = useState<string | null>(null);



  const fetchPredictionForNextHour = async () => {
    setLoading(true);
    setError(null);

    const nextHour = getNextRoundedHour(); // Utilizar la siguiente hora redondeada

    
    try {
      const requestData: CommonInputDateandTime = {
        fecha: filteredDate,
        hora: filteredHour,
      };

      const response = await axios.post<ServerData[]>(
        'https://localhost:7123/api/Prediction/serverPredictions',
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


    // Realiza la primera llamada inmediatamente con la hora redondeada a la siguiente hora completa
    fetchPredictionForNextHour();

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


      // Realiza la primera llamada en la siguiente hora completa
      fetchPredictionForNextHour();

      // Establece un intervalo para realizar la llamada cada hora completa
      const intervalId = setInterval(() => {

        fetchPredictionForNextHour();
      }, 3600000); // 3600000 ms = 1 hora

      // Limpiar el intervalo si el componente se desmonta
      return () => clearInterval(intervalId);
    }, calculateTimeUntilNextHour());

    // Limpiar el timeout si el componente se desmonta
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
