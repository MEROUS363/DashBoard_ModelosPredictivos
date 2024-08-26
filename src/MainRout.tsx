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
        <div className="flex ">
          <div className="flex-2">
          <Filtro onFilter={filterDataByDate} />
          </div>
          <div className="flex-1">
          <CantModulos />

            {/* <CanrTransf /> */}
          </div>
          <div className="flex1">
          <Top10Days/>

          </div>
        </div>
        <div className="flex">
          <ConsumoTarjetaDeb />
          < TransSPI2/>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default MainRouter;
