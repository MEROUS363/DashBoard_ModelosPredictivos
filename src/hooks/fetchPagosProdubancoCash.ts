import { useState, useEffect } from "react";
import axios from "axios";
import {
  addHours,
  differenceInMilliseconds,
} from "date-fns";
import { convertToISO } from "../helper/dateAndTimeHelpers";

interface AccesoProdunetOutPut {
  Results: number[];
}

const initialDataPagoProdubancoCash = {
  Results: [0],
};
const useFetchPagosProdubanco = (filterDate: string) => {
  const [data, setData] = useState<AccesoProdunetOutPut>(
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

      const response = await axios.post<AccesoProdunetOutPut>(
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

    const calculateTimeUntilNextHour = (): number => {
      const now = new Date();
      const nextHour = addHours(now, 1);
      const startOfNextHour = new Date(
        nextHour.getFullYear(),
        nextHour.getMonth(),
        nextHour.getDate(),
        nextHour.getHours(),
        0,
        0,
        0 // Set to start of the next hour
      );
      return differenceInMilliseconds(startOfNextHour, now);
    };

    timeoutId = setTimeout(() => {
      fetchProdubancoCash();

      const intervalId = setInterval(() => {
        fetchProdubancoCash();
      }, 3600000); // 3600000 ms = 1 hora

      return () => clearInterval(intervalId);
    }, calculateTimeUntilNextHour());

    return () => {
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      if (intervalId !== undefined) clearInterval(intervalId);
    };
  }, [filterDate]); // Dependencias vacías para ejecutar solo al montar

  return {
    data,
    error,
    loading,
  };
};

export default useFetchPagosProdubanco;
