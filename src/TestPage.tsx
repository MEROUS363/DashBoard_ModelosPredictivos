import React, { useState } from "react";
import "./index.css";
import NavBar from "./Navbar";
import Filtro from "./Filtro";
import PicosServidores from "./PicosServidores";
import TopTenTable from "./TopTenTable";

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
        {/* Top 10 */}
        <TopTenTable />
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
