//import App from './App.tsx'

import CantModulos from "./CantModulos.tsx";
import ConsumoTarjetaDeb from "./ConsumosTarjetasD.tsx";
import NavBar from "./Navbar.tsx";
import "./index.css";

import Picos from "./PicosRendimiento.tsx";
import Filtro from "./Filtro.tsx";
import { useState } from "react";
import Top10Days from "./Top10.tsx";
import TransSPI2 from "./CantTransferenciasSPI2.tsx";
import useValue
 from "./hooks/ContextValue.ts";
import { useDateContext } from "../contexts/DateContext.tsx";
interface MainRouterProps {
  onValueChange: (value: string) => void;
}

const MainRouter: React.FC<MainRouterProps> = ({onValueChange}) => {
  const [date, setdate] = useState<string>("");
  const { setTypeOfData, typeOfData } = useDateContext();

  const filterDataByDate = (dateFromFilter: string) => {
    setdate(dateFromFilter);
  };
  const handleButtonClick = (value: string) => {
    try {
      setTypeOfData(value);
      if (onValueChange) {
        onValueChange(value); // Llamar solo si está definida
      }
    } catch (error) {
      console.error("Error in handleButtonClick:", error);
    }
  };

  return (
    <div className="flex">
      <NavBar />
      <div className="bg-gray-200 min-h-screen">
      <div className="flex gap-3">
      <button
        onClick={() => handleButtonClick("FiltroXFecha")}
        className={`ml-9 rounded-b-xl border-b-2 p-2 ${
          typeOfData === "FiltroXFecha" ? "bg-emerald-700 text-white" : "bg-gray-200 text-secondary-foreground border-emerald-700"
        }`}
      >
        Por Fechas
      </button>
      <button
        onClick={() => handleButtonClick("FiltroXHora")}
        className={`rounded-b-xl border-b-2 p-2 ${
          typeOfData === "FiltroXHora" ? "bg-emerald-700 text-white" : "bg-gray-200 text-accent-foreground border-emerald-700"
        }`}
      >
        Por Horas
      </button>
      <p>{typeOfData}</p>
      </div>
          <Picos />
        <div className="flex ">
          <div className="flex-2">
            <Filtro onFilter={filterDataByDate} />
          </div>
          <div className="flex-1">
            <CantModulos />

            {/* <CanrTransf /> */}
          </div>
          <div className="flex1">
            <Top10Days />
          </div>
        </div>
        <div className="flex">
          <div className="flex2">
            <ConsumoTarjetaDeb />
          </div>
          <div className="flex1">
            <TransSPI2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainRouter;
