import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//import App from './App.tsx'

import { DateProvider } from "./contexts/DateContext.tsx";
import MainPage from "./MainPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DateProvider>
      <MainPage></MainPage>
    </DateProvider>
  </StrictMode>
);
