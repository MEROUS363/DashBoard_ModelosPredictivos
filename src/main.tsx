import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//import App from './App.tsx'

import CantModulos from "./CantModulos.tsx";
import CanrTransf from "./CantTransferencias.tsx";
import ConsumoTarjetaDeb from "./ConsumosTarjetasD.tsx";
import NavBar from "./Navbar.tsx";
import "./index.css";
import TestConsumoTarjetas from "./testComponent.tsx";
import PredictComponent from "./testComponent.tsx";
import Picos from "./PicosRendimiento.tsx";
import TestComponent from "./testComponent.tsx";
import Filtro from "./Filtro.tsx";
import MainRouter from "./MainRout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainRouter/>
  </StrictMode>
);
