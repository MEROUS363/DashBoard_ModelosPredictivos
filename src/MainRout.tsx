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
const MainRouter: React.FC = () => {
  const [date, setdate] = useState<string>("");

  const filterDataByDate = (dateFromFilter: string) => {
    setdate(dateFromFilter);
  };

  return (
    <div className="flex">
      <NavBar />
      <div className="bg-gray-200 min-h-screen">
        <Picos />
        <div className="flex space-x-4 pl-10 pb-4">
          <div className="flex-1">
            <CantModulos />
          </div>
          <div className="flex-2">
          <Top10Days/>
            {/* <CanrTransf /> */}
          </div>
          <div className="flex1">
            <Filtro onFilter={filterDataByDate} />
          </div>
        </div>
        <div className="flex pl-10">
          <ConsumoTarjetaDeb />
          < TransSPI2/>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default MainRouter;
