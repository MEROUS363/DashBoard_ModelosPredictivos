import React from "react";
import imageLogo from '../../assets/web.webp';
import Filtro from "./Filtro";

const NavBar: React.FC = () => {
  const title = 'Cargas de trabajo balanceadas';
  return (
    <div className="block relative w-full shadow-xl bg-slate-50 text-green-800 cursor-default">
      <div className="w-full grid grid-cols-6 border-solid border-[1px] border-gray-300">
        <div className="col-span-4 w-full flex items-center">
          <img src={imageLogo} className="h-16 px-4" />
          <h2 className="text-lg font-medium text-green-800 leading-10">{title}</h2>
        </div>
        <div className="col-span-2 w-full flex items-center justify-end">
          {/* <h2 className="w-auto mr-12 text-[#222]">{userName || ''}</h2> */}
          {/* <LogoutButton /> */}
        </div>
      </div>
      <div className="w-full flex justify-center items-center ">
        <Filtro />
      </div>
    </div>
  );
}

export default NavBar;
