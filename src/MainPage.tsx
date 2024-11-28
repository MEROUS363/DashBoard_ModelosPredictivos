import "./index.css";
import NavBar from "./components/general/Navbar.tsx";
import Filtro from "./components/general/Filtro.tsx";
import PicosServidores from "./components/servers/PicosServidores.tsx";
import TopTenTable from "./components/topten/TopTenTable.tsx";
import CantModulos from "./components/produnetandmovil/CantModulos.tsx";
import ConsumoTarjetaDeb from "./components/tarjetasDebito/ConsumosTarjetasD.tsx";
import TransSPI2 from "./components/spi/CantTransferenciasSPI2.tsx";

const MainPage: React.FC = () => {
  return (
    <div
      className="w-full pb-6 bg-gray-50"
      style={{ minHeight: "calc(100vh - 5rem)" }}
    >
      <div className="mb-5 relative bg-gray-200 rounded-lg temp-show-off">
        {/* Btn Filtro Selectivo */}
        <NavBar />
        {/* <Filtro /> */}
      </div>

      <div className="grid grid-cols-10 gap-5 p-4 mt-4">
        {" "}
        {/* Memorias & Procesadores Micro y BFF */}
        <PicosServidores />
        {/* Top 10 */}
        <TopTenTable />
        <div className="w-full h-[200px] bg-white col-span-6 rounded-lg shadow-st ">
          <ConsumoTarjetaDeb />
        </div>
        {/* Grafico */}
        <div className="w-full h-[200px] bg-white col-span-6 rounded-lg shadow-st ">
          <CantModulos />
        </div>{" "}
        {/* Grafico */}
        <div className="w-full h-[200px] bg-white col-span-6 rounded-lg shadow-st ">
          <TransSPI2 />
        </div>
        {/* SPI */}
        {/*<div className="w-full h-[200px] bg-white col-span-6 rounded-lg shadow-st ">
          <PagosProdubanco></PagosProdubanco>
        </div>}*/}
        {/* Grafico */}
      </div>
    </div>
  );
};

export default MainPage;
