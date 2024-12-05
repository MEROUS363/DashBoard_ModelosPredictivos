import { useState, useEffect } from 'react';
import axios from 'axios';
import { CommonInputDateandTime, PredictionByHour } from '../types/predictionTypes';


export const hours: PredictionByHour = {
  '00:00': 0,
  '01:00': 0,
  '02:00': 0,
  '03:00': 0,
  '04:00': 0,
  '05:00': 0,
  '06:00': 0,
  '07:00': 0,
  '08:00': 0,
  '09:00': 0,
  '10:00': 0,
  '11:00': 0,
  '12:00': 0,
  '13:00': 0,
  '14:00': 0,
  '15:00': 0,
  '16:00': 0,
  '17:00': 0,
  '18:00': 0,
  '19:00': 0,
  '20:00': 0,
  '21:00': 0,
  '22:00': 0,
  '23:00': 0,

};

const useConsumoTarjetasDebito = (fecha: string, hora: string) => {
  const [dataAllHours, setDataAllHours] = useState<PredictionByHour>(hours);
  const [dataByHour, setDataByHour] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loadingAllHours, setLoadingAllHours] = useState<boolean>(false);
  const [loadingByHour, setLoadingByHour] = useState<boolean>(false);


  const [maxScore, setMaxScore] = useState<number | null>(null);
  const [peakHour, setPeakHour] = useState<string | null>(null);
  const endpoint = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_ENDPOINT_DEBITOHORA}`;


  const fetchScoresForAllHours = async () => {
    setLoadingAllHours(true);
    setError(null);

    try {
      const updatedHours: PredictionByHour = { ...hours };

      for (const hour of Object.keys(hours)) {
        const requestData: CommonInputDateandTime = {
          fecha: fecha,
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

     
      setDataAllHours(updatedHours);
      const maxScore = Math.max(...Object.values(updatedHours).filter((score): score is number => score !== null));
      const peakHour = Object.keys(updatedHours).find(hour => updatedHours[hour] === maxScore) || null;

      setMaxScore(maxScore);
    
      setPeakHour(peakHour);
    
    } catch (err) {
      setError('Error al realizar la petición');
      console.error(err);
    } finally {
      setLoadingAllHours(false);
    }
  };

  const fetchScoresForHour = async () => {
    setLoadingByHour(true);
    setError(null);


    try {
        const requestData: CommonInputDateandTime = {
          fecha: fecha,
          hora: hora,
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
      setError('Error al realizar la petición');
      console.error(err);
    } finally {
      setLoadingByHour(false);
    }
  };

  useEffect(() => {
    if (hora === "Todo el día") {
      
      fetchScoresForAllHours();
    } else {
    
      fetchScoresForHour();
    }
  }, [fecha, hora]);
 

  return {
    dataAllHours,
    dataByHour,
    error,
    loadingAllHours,
    loadingByHour,
    maxScore, 
    peakHour
  };
};

export default useConsumoTarjetasDebito;
