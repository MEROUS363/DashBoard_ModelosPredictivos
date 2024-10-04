import { useState, useEffect } from 'react';
import axios from 'axios';



export interface ProdunetAndBancaMovilTop10 {
    date: string;
  sumPrediction: number; 
}


const useTop10Table = (selectedTab:number) => {
  const [data, setData] = useState<ProdunetAndBancaMovilTop10[] | null >(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  
  const fetchScoresForDay = async () => {
    setLoading(true);
    setError(null);

    try {
        const endpoint = selectedTab === 0 ? 'yearlySumTesting' : 'yearlySumDebitCard';
        const response = await axios.get<ProdunetAndBancaMovilTop10[]>(
          `https://localhost:7123/api/Prediction/${endpoint}`,
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
  }, [selectedTab]);

  return {
    data,
    error,
    loading,
  };
};

export default useTop10Table;
