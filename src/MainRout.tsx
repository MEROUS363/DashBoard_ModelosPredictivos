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
import useValue from "./hooks/ContextValue.ts";
import { useDateContext } from "../contexts/DateContext.tsx";
interface MainRouterProps {
  onValueChange: (value: string) => void;
}

const MainRouter: React.FC<MainRouterProps> = ({ onValueChange }) => {
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
      <div className="bg-[#FDFDFD] min-h-screen">
        <NavBar />
        <Filtro onFilter={filterDataByDate} />
        <div className="bg-[#FDFDFD] w-full grid grid-cols-7 gap-4">
          <div className="col-span-2">
            <Top10Days />
          </div>

          <div className="col-span-5">
            <div>
              <Picos />
            </div>

            <div className="flex ">
              <div className="flex-1">
                <CantModulos />
                {/* <CanrTransf /> */}
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
      </div>
    </div>
  );
};

export default MainRouter;
