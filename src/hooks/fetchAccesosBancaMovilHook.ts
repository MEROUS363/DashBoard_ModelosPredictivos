import { useState, useEffect } from 'react';
import axios from 'axios';
import { CommonInputDateandTime, PredictionByHour } from '../types/predictionTypes';
import { getNextRoundedHour } from '../helper/dateAndTimeHelpers';
import { allDayhours } from '../constants/hours';

const useAccesoBancaMovil = (filterDate: string, filterHour: string) => {
  const [dataAllHours, setDataAllHours] = useState<PredictionByHour>(allDayhours);
  const [dataByHour, setDataByHour] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loadingAllHours, setLoadingForAllHours] = useState<boolean>(false);
  const [loadingByHour, setLoadingByHour] = useState<boolean>(false);
  const [currentHour, setCurrentHour] = useState<string | null>(null);
  const endpoint = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_ENDPOINT_MOVILHORA}`;

  const fetchPredictionForAllHours = async () => {
    setLoadingForAllHours(true);
    setError(null);
    const nextHour = getNextRoundedHour(); // Utilizar la siguiente hora redondeada
    try {

      const updatedHours: PredictionByHour = { ...allDayhours };

      for (const hour of Object.keys(allDayhours)) {
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
            }
          }
        );

        updatedHours[hour] = response.data;
      }
      setDataAllHours(updatedHours);
      setCurrentHour(nextHour);
    } catch (err) {
      setError('Error during API request');
      console.error(err);
    } finally {
      setLoadingForAllHours(false);
    }
  };

  const fetchPredictionForHour = async () => {
    setLoadingByHour(true);
    setError(null);

    const nextHour = getNextRoundedHour(); // Utilizar la siguiente hora redondeada
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
            }
          }
        );

      setDataByHour(response.data);
      setCurrentHour(nextHour);
    } catch (err) {
      setError('Error during API request');
      console.error(err);
    } finally {
      setLoadingByHour(false);
    }
  };

  useEffect(() => {
    if (filterHour === "Todo el día") {
      console.log("fetching movil all hours");
      fetchPredictionForAllHours();
    } else {
      console.log("fetching movil just an hour");
      fetchPredictionForHour();
    }
  }, [filterDate, filterHour]);
  

  return {
    dataAllHours,
    dataByHour,
    currentHour,
    error,
    loadingAllHours,
    loadingByHour,
  };
};

export default useAccesoBancaMovil;
