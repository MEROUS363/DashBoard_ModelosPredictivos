import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//import App from './App.tsx'
import Picos from "./PicosRendimiento.tsx";
import CantModulos from "./CantModulos.tsx";
import CanrTransf from "./CantTransferencias.tsx";
import ConsumoTarjetaDeb from "./ConsumosTarjetasD.tsx";
import NavBar from "./Navbar.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="flex">
      <NavBar />
      <div className="bg-gray-100 min-h-screen">
        <Picos />

        <div className="flex space-x-4 p-4">
          <div className="flex-1">
            <CantModulos />
          </div>
          <div className="flex-1">
            <CanrTransf />
          </div>
        </div>
        <ConsumoTarjetaDeb />
      </div>
    </div>
  </StrictMode>
);
