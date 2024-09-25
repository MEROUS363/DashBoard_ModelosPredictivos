import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

export interface Top10Input {
  fecha: string;
}

export interface Top10Output {
  hour: number;
  sumPrediction: number; 
}

const useTop10Graph = (fecha: string) => {
  const [data, setData] = useState<Top10Output[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  
  const fetchScoresForDay = async () => {
    setLoading(true);
    setError(null);

    try {
        const requestData: Top10Input = {
          fecha: fecha,
        };
        const response = await axios.post<Top10Output[]>(
          'https://localhost:7123/api/Prediction/top10PredictionSum',
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
