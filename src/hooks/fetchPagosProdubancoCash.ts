import { useState, useEffect } from "react";
import axios from "axios";
import { calculateTimeUntilNextHour, convertToISO } from "../helper/dateAndTimeHelpers";
import { CommonOutputResultsFromAzure } from "../types/predictionTypes";

const initialDataPagoProdubancoCash = {
  Results: [0],
};
const useFetchPagosProdubanco = (filterDate: string) => {
  const [data, setData] = useState<CommonOutputResultsFromAzure>(
    initialDataPagoProdubancoCash
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getTodayDate = (): string => {
    const now = new Date();
    now.setUTCHours(0, 0, 0, 0); // Establece la hora a 00:00:00 UTC
    return now.toISOString();
  };


  const fecha = convertToISO(filterDate);

  const fetchProdubancoCash = async () => {
    setLoading(true);
    setError(null);

    const todayDate = getTodayDate();
    try {
      const dataToSend = {
        Inputs: {
          data: [
            {
              FechaProceso: fecha ?? todayDate,
            },
          ],
        },
      };

      const response = await axios.post<CommonOutputResultsFromAzure>(
        "/cash/score",
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setData(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Error response:", err.response?.data);
        setError("Error response: " + err.response?.data);
      } else {
        console.error("Unexpected error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let intervalId: ReturnType<typeof setInterval> | undefined;

    fetchProdubancoCash();


    timeoutId = setTimeout(() => {
      fetchProdubancoCash();

      const intervalId = setInterval(() => {
        fetchProdubancoCash();
      }, 3600000); 

      return () => clearInterval(intervalId);
    }, calculateTimeUntilNextHour());

    return () => {
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      if (intervalId !== undefined) clearInterval(intervalId);
    };
  }, [filterDate]); 

  return {
    data,
    error,
    loading,
  };
};

export default useFetchPagosProdubanco;
