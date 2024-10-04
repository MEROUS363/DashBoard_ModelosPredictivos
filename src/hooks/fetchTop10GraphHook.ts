import { useState, useEffect } from 'react';
import axios from 'axios';

export interface Top10Input {
  fecha: string;
}

export interface Top10Output {
  hour: number;
  sumPrediction: number; 
}

const useTop10Graph = (fecha: string, selectedTab: number) => {
  const [data, setData] = useState<Top10Output[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  
  const fetchScoresForDay = async () => {
    setLoading(true);
    setError(null);

    try {

        const endpoint = selectedTab === 0 ? 'top10PredictionSum' : 'top10PredictionSumDebitCard';
        const requestData: Top10Input = {
          fecha: fecha,
        };
        const response = await axios.post<Top10Output[]>(
          `https://localhost:7123/api/Prediction/${endpoint}`,
          requestData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      setData(response.data);
    } catch (err) {
      setError('Error al realizar la petición');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      fetchScoresForDay();
  }, [fecha]);

  return {
    data,
    error,
    loading,
  };
};

export default useTop10Graph;
