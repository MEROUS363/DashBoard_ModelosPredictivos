import { useState, useEffect } from 'react';
import axios from 'axios';
import { CommonInputDateandTime } from '../types/predictionTypes';
import { calculateTimeUntilNextHour, getNextRoundedHour } from '../helper/dateAndTimeHelpers';

export interface PredictSingleOutput {
  bffProcessorScore: number;
  microProcessorScore: number;
  bffMemoryScore: number;
  microMemoryScore: number;
}

const usePredictSingleServers = (filteredDate:string, filteredHour:string) => {
  const [data, setData] = useState<PredictSingleOutput | null>(null);
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

      const response = await axios.post<PredictSingleOutput>(
        'https://localhost:7123/api/Prediction/predictAll',
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

export default usePredictSingleServers;
