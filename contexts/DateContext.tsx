import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { format } from 'date-fns';

interface DateContextType {
  date: string;
  setDate: (date: string) => void;
  loadingContext: boolean;
}

interface DateProviderProps {
  children: ReactNode;
}

export const DateContext = createContext<DateContextType | undefined>(
  undefined
);

export const DateProvider: React.FC<DateProviderProps> = ({ children }) => {
  const [date, setDate] = useState<string>('');
  const [loadingContext, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulating an initial load or async operation
    const initialDate = format(new Date(),'MM/dd/yyyy'); // Replace this with any initial fetch or computation
    setDate(initialDate);
    setLoading(false);
  }, []);

  return (
    <DateContext.Provider value={{ date, setDate, loadingContext }}>
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