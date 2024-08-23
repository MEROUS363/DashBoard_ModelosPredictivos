import { format } from "date-fns";
import React, { useState } from "react";
import { useDateContext } from '../contexts/DateContext';
//import startPro from '../images/startPro.png';

// import ImgTransaccion from '../ico/Transaccion.svg';
// import ImgBanck from '../ico/Bancço.svg';
// import ImgNone from '../ico/None.svg';
interface HourSelectProps {
    
    onFilter:(date: string) => void;
  }
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const getCurrentHour = () => {
    const now = new Date();
    const hour = String(now.getHours()).padStart(2, '0');
    return `${hour}:00`;
  };
const Filtro: React.FC<HourSelectProps> = ({onFilter}) => {
    const [selectedDate, setSelectedDate] = useState(getCurrentDate());
    const [selectedHour, setSelectedHour] = useState(getCurrentHour());

    const {setDate} = useDateContext();

  const hours = Array.from({ length: 24 }, (_, index) => {
    const hour = String(index).padStart(2, '0');
    return `${hour}:00`;
  });


  const handleFilterClick = () => {
    const date = format(selectedDate,'MM/dd/yyyy')
    console.log(date)
    setDate(date);
    onFilter(date)
    return true;
  };

  
  return (
    <div className="bg-emerald-700 pt-3  p-6 rounded-l-xl h-[247px] shadow-xl max-w-sm mx-auto">
    <h2 className="text-xl font-bold text-white pb-2">Filtro de Predicción</h2>
    <div className="space-y-4">
      <div className="bg-card  rounded-t-lg p-4 bg-white h-[200px]">
        <label className="block text-sm font-medium text-primary">Seleccione el Día:</label>
        <input
          type="date"
          id="date"
          name="date"
          className="block w-full mt-1 p-2 border border-input rounded-md focus:outline-none focus:ring focus:ring-primary"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <label className="block mt-4 text-sm font-medium text-primary">Seleccione la Hora:</label>
        <select
            value={selectedHour}
            onChange={(e) => setSelectedHour(e.target.value)}
            className="block w-full mt-1 p-2 border border-input rounded-md focus:outline-none focus:ring focus:ring-primary"
            >
            {hours.map(hour => (
                <option key={hour} value={hour}>
                {hour}:00
                </option>
            ))}
        </select>
        <button onClick={handleFilterClick}>
            Buscar
        </button>
      </div>
    </div>
    
  </div>
  );
};

export default Filtro;
