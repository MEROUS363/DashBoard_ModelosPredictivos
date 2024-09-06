import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { format } from 'date-fns';

interface DateContextType {
  date: string;
  setDate: (date: string) => void;
  loadingContext: boolean;
  hour: string;
  setHour: (hour: string) => void;
}

interface DateProviderProps {
  children: ReactNode;
}

export const DateContext = createContext<DateContextType | undefined>(
  undefined
);

export const DateProvider: React.FC<DateProviderProps> = ({ children }) => {

  const actualTime  = new Date();
  actualTime.setHours(actualTime.getHours() + 1);

  const [date, setDate] = useState<string>(format(new Date(),'MM/dd/yyyy'));
  const [hour, setHour] = useState<string>(format(actualTime,'HH:mm:ss'));
  const [loadingContext, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("ejecutando contexto")
    // Simulating an initial load or async operation
    const initialDate = format(new Date(),'MM/dd/yyyy'); // Replace this with any initial fetch or computation
    setDate(initialDate);
    setLoading(false);
  }, []);

  return (
    <DateContext.Provider value={{ date, setDate, loadingContext, hour, setHour }}>
      {children}
    </DateContext.Provider>
  );
};

export const useDateContext = (): DateContextType => {
  const context = useContext(DateContext);
  if (context === undefined) {
    throw new Error('useDateContext must be used within a DateProvider');
  }
  return context;
};