import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';


export interface ProdunetAndBancaMovilTop10 {
    date: string;
  sumPrediction: number; 
}


const useTop10Table = () => {
  const [data, setData] = useState<ProdunetAndBancaMovilTop10[] | null >(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  
  const fetchScoresForDay = async () => {
    setLoading(true);
    setError(null);

    try {
        const response = await axios.get<ProdunetAndBancaMovilTop10[]>(
          'https://localhost:7123/api/Prediction/yearlySum'
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
  }, []);

  return {
    data,
    error,
    loading,
  };
};

export default useTop10Table;
