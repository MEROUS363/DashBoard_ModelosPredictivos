import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

export interface ProdunetAndBancaMovilInput {
  fecha: string;
}

export interface ProdunetAndBancaMovilOutput {
  sumPrediction: number; 
}

export interface ProdunetanMovilResponse{
    produnetResults: ProdunetAndBancaMovilOutput[];
    movilResults: ProdunetAndBancaMovilOutput[];
}

const useProdunetAndMovil = (fecha: string, hour: string) => {
  const [data, setData] = useState<ProdunetanMovilResponse>({produnetResults: [], movilResults: []});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  console.log("fecha en produnet y hora", fecha, hour);
  
  const fetchScoresForDay = async () => {
    console.log("ejecutando fetchforday en produnet y movil para", fecha);
    setLoading(true);
    setError(null);

    try {
        const requestData: ProdunetAndBancaMovilInput = {
          fecha: fecha,
        };

        const response = await axios.post<ProdunetanMovilResponse>(
          'https://localhost:7123/api/Prediction/produnetAndMovilSum',
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
     //Si es todo el dia no se debe ejecutar este hook)
     if(hour !== "Todo el día"){
      return;
    }

      fetchScoresForDay();
  }, [fecha,hour]);

  return {
    data,
    error,
    loading,
  };
};

export default useProdunetAndMovil;
