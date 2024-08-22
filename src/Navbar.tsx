import React, { useState } from "react";
import startPro from "./assets/startPro.png";
import IconCalendario from "./assets/Filtro Icon.png";
import { toDate } from "date-fns";
//import startPro from '../images/startPro.png';

// import ImgTransaccion from '../ico/Transaccion.svg';
// import ImgBanck from '../ico/Bancço.svg';
// import ImgNone from '../ico/None.svg';
interface HourSelectProps {
    hour: string;
    date: string;
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
const NavBar: React.FC = (value) => {
    const [selectedDate, setSelectedDate] = useState(getCurrentDate());
    const [selectedHour, setSelectedHour] = useState(getCurrentHour());

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar la modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const hours = Array.from({ length: 24 }, (_, index) => {
    const hour = String(index).padStart(2, '0');
    return `${hour}:00`;
  });

  return (
    <div className="h-screen w-24 pt-4 sticky top-0 left-0">
      <img src={startPro} className="w-full" />
      <ul className="list-none mt-2.5">
        {/* <li
          className="p-2 flex justify-center items-center rounded st-hv-cl duration-100 mb-0.5"
          title="Inicio"
        >
          <img src={IconCalendario} onClick={openModal} className="w-5 h-5" />
        </li> */}
      </ul>
    
    </div>
      
  );
};

export default NavBar;
