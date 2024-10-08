import React from "react";
import startPro from "./assets/startPro.png";

//import startPro from '../images/startPro.png';

// import ImgTransaccion from '../ico/Transaccion.svg';
// import ImgBanck from '../ico/Bancço.svg';
// import ImgNone from '../ico/None.svg';

const NavBar: React.FC = () => {

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
