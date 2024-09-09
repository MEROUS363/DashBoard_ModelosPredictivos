import { useState } from 'react';

const useValue = (initialValue: string = "") => {  // Añadir valor inicial opcional
  const [valor, setValor] = useState<string>(initialValue);

  const updateValor = (newValue: string) => {
    setValor(newValue);
    console.log(newValue)
  };

  return {
    valor,
    updateValor,
  };
};

export default useValue;

