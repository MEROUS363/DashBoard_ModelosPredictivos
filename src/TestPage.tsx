import React, { useState } from "react";
import "./index.css";
import NavBar from "./Navbar";
import Filtro from "./Filtro";
import PicosServidores from "./PicosServidores";

const TestPage: React.FC = () => {
  const [date, setdate] = useState<string>("");

  const filterDataByDate = (dateFromFilter: string) => {
    setdate(dateFromFilter);
  };
  return (
    <div
      className="w-full p-1 pb-6 bg-gray-50"
      style={{ minHeight: "calc(100vh - 5rem)" }}
    >
      <div className="mb-5 relative bg-gray-200 rounded-lg temp-show-off">
        {/* Btn Filtro Selectivo */}
        <NavBar />
        <Filtro onFilter={filterDataByDate} />
      </div>

      <div className="grid grid-cols-10 gap-5 p-4 mt-4">
        {" "}
        {/* Memorias & Procesadores Micro y BFF */}
        <PicosServidores />
        <div className="w-full h-[420px] bg-white col-span-4 row-span-2 shadow-st rounded-lg flex">
          {" "}
          {/* Top 10 */}
          <div className="h-full w-20 bg-gray-200 rounded-l-lg p-1">
            <div className="w-full h-14"></div>
            {/* Espacio */}
            {/* Btn Top 10 */}
            <div className="w-full h-14 bg-[#00693C] rounded-lg text-white flex justify-center items-center">
              trs
            </div>
          </div>
          <div className="w-full">
            <div className="w-full h-14 rounded-tr-lg bg-[#FDFDFD] border-b-2 border-[#C5C5C5] grid grid-cols-7 py-1 items-center">
              <p className="ml-4 col-span-2 border-r-2 border-gray-300">
                Fecha
              </p>
              <p className="ml-4 col-span-2 border-r-2 border-gray-300">Hora</p>
              <p className="ml-4 col-span-2 border-r-2 border-gray-300">Pico</p>
              <p className="ml-4 col-span-1"></p>
            </div>
            {/* Tabla de contenido */}
            <div className="overflow-y-auto w-full h-[360px]">
              <div className="w-full h-12 bg-[#FDFDFD] border-b-2 border-[#F5F5F5]"></div>
              <div className="w-full h-12 bg-[#FDFDFD] border-b-2 border-[#F5F5F5]"></div>
              <div className="w-full h-12 bg-[#FDFDFD] border-b-2 border-[#F5F5F5]"></div>
              <div className="w-full h-12 bg-[#FDFDFD] border-b-2 border-[#F5F5F5]"></div>
              <div className="w-full h-12 bg-[#FDFDFD] border-b-2 border-[#F5F5F5]"></div>
              <div className="w-full h-12 bg-[#FDFDFD] border-b-2 border-[#F5F5F5]"></div>
              <div className="w-full h-12 bg-[#FDFDFD] border-b-2 border-[#F5F5F5]"></div>
              <div className="w-full h-12 bg-[#FDFDFD] border-b-2 border-[#F5F5F5]"></div>
              <div className="w-full h-12 bg-[#FDFDFD] border-b-2 border-[#F5F5F5]"></div>
              <div className="w-full h-12 bg-[#FDFDFD] border-b-2 border-[#F5F5F5]"></div>
            </div>
          </div>
        </div>
        <div className="w-full h-[200px] bg-white col-span-6 rounded-lg shadow-st ">
          {" "}
        </div>{" "}
        {/* Grafico */}
        <div className="w-full h-[200px] bg-white col-span-6 rounded-lg shadow-st ">
          {" "}
        </div>{" "}
        {/* Grafico */}
        <div className="w-full h-[200px] bg-white col-span-4 rounded-lg shadow-st ">
          {" "}
        </div>{" "}
        {/* SPI */}
        <div className="w-full h-[200px] bg-white col-span-6 rounded-lg shadow-st ">
          {" "}
        </div>{" "}
        {/* Grafico */}
      </div>
    </div>
  );
};

export default TestPage;
