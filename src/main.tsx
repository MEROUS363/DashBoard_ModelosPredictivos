import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//import App from './App.tsx'

import MainRouter from "./MainRout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainRouter/>
  </StrictMode>
);
