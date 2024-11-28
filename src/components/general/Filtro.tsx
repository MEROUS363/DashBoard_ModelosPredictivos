import { format } from "date-fns";
import React, { useState } from "react";
import { useDateContext } from "../../contexts/DateContext";
import { hoursWithAllDay } from "../../constants/hours";

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Los meses en JavaScript van de 0 a 11
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
const getCurrentHour = () => {
  const now = new Date();
  const hour = String(now.getHours()).padStart(2, "0");
  return `${hour}:00`;
};

const Filtro: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [selectedHour, setSelectedHour] = useState(getCurrentHour());

  const { setDate, setHour } = useDateContext();

  const handleFilterClick = () => {
    const dateParts = selectedDate.split("-");
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const day = parseInt(dateParts[2], 10);

    const date = new Date(year, month, day);
    const formattedDate = format(date, "MM/dd/yyyy");

    setDate(formattedDate);
    setHour(selectedHour);
    return true;
  };

  console.log("selected hour inicial", selectedHour);
  return (
    <div className="w-full h-20 flex justify-center items-center p-4 bg-gray-100">
      <div className="grid grid-cols-5 gap-4 items-center w-2/4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-[#00693C]">
            Seleccione el Día:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="block w-full mt-1 p-2 border border-input rounded-md focus:outline-none focus:ring focus:ring-primary text-[#222]"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-[#00693C]">
            Seleccione la Hora:
          </label>
          <select
            value={selectedHour}
            onChange={(e) => setSelectedHour(e.target.value)}
            className="block w-full mt-1 p-2 border border-input rounded-md focus:outline-none focus:ring focus:ring-primary text-[#222]"
          >
            {hoursWithAllDay.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-1 flex items-center">
          <button
            className="bg-[#00693C] text-white rounded-md px-4 py-2 mt-6"
            onClick={handleFilterClick}
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filtro;
