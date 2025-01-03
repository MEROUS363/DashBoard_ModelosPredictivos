import { useState } from "react";
import { PredictSingleOutput } from "../../hooks/fetchIndividualServers";
import { Server, X } from "lucide-react";
import ModalServidor from "./ModalServidor";

interface SingleDayServersProps {
  dataIndividual: PredictSingleOutput | null;
}

const SingleDayServers: React.FC<SingleDayServersProps> = ({
  dataIndividual,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className="w-full h-[150px] bg-white col-span-10 rounded-lg shadow-md py-1 grid grid-cols-10">
      <div className="w-full h-full col-span-2 rounded-l-lg border-r-2 border-gray-300 p-3">
        <h2 className="text-lg font-bold text-foreground text-emerald-700">
          Procesador BFF
        </h2>
        <p className="text-muted-foreground">Uso de Procesador BFF </p>
        <div className="relative m-2 bg-slate-200 rounded-full">
          <div className="h-4 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${dataIndividual && dataIndividual.bffProcessorScore < 80
                ? "bg-blue-400"
                : "bg-red-500"
                }`}
              style={{ width: `${dataIndividual?.bffProcessorScore ?? 0}%` }}
            />
          </div>
          <div
            className="absolute top-0 right-0 text-xs text-foreground font-medium text-right bg-slate-200 rounded-r-full"
            style={{
              width: `${100 - (dataIndividual?.bffProcessorScore ?? 0)}%`,
            }}
          ></div>
          <div className="absolute top-0 left-0 text-xs text-muted-foreground font-medium">
            % CPU
          </div>
        </div>
        <p className="mt-2 text-muted-foreground">
          {dataIndividual?.bffProcessorScore
            ? Math.round(dataIndividual.bffProcessorScore)
            : "N/A"}{" "}
          CPU%
        </p>
      </div>

      <div className="w-full h-full col-span-2 rounded-l-lg border-r-2 border-gray-300 p-3">
        <h2 className="text-lg font-bold text-foreground text-emerald-700">
          Promedio de Memoria BFF
        </h2>
        <p className="text-muted-foreground">Uso de Memoria BFF</p>
        <div className="relative m-2 bg-slate-200 rounded-full">
          <div className="h-4 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${dataIndividual && dataIndividual.bffMemoryScore < 80
                ? "bg-yellow-400"
                : "bg-red-500"
                }`}
              style={{ width: `${dataIndividual?.bffMemoryScore ?? 0}%` }}
            />
          </div>
          <div
            className="absolute top-0 right-0 text-xs text-foreground font-medium text-right bg-slate-200 rounded-r-full"
            style={{
              width: `${100 - (dataIndividual?.bffMemoryScore ?? 0)}%`,
            }}
          ></div>
          <div className="absolute top-0 left-0 text-xs text-muted-foreground font-medium">
            % Memoria
          </div>
        </div>
        <p className="mt-2 text-muted-foreground">
          {dataIndividual?.bffMemoryScore
            ? Math.round(dataIndividual.bffMemoryScore)
            : "N/A"}{" "}
          Memoria%
        </p>
      </div>

      <div className="w-full h-full col-span-2 rounded-l-lg border-r-2 border-gray-300 p-3">
        <h2 className="text-lg font-bold text-foreground text-emerald-700">
          Procesador Micro
        </h2>
        <p className="text-muted-foreground">Uso de Procesador Micro</p>
        <div className="relative m-2 bg-slate-200 rounded-full">
          <div className="h-4 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${dataIndividual && dataIndividual.microProcessorScore < 80
                ? "bg-green-400"
                : "bg-red-500"
                }`}
              style={{ width: `${dataIndividual?.microProcessorScore ?? 0}%` }}
            />
          </div>
          <div
            className="absolute top-0 right-0 text-xs text-foreground font-medium text-right bg-slate-200 rounded-r-full"
            style={{
              width: `${100 - (dataIndividual?.microProcessorScore ?? 0)}%`,
            }}
          ></div>
          <div className="absolute top-0 left-0 text-xs text-muted-foreground font-medium">
            % CPU
          </div>
        </div>
        <p className="mt-2 text-muted-foreground">
          {dataIndividual?.microProcessorScore
            ? Math.round(dataIndividual.microProcessorScore)
            : "N/A"}{" "}
          CPU%{" "}
        </p>
      </div>
      <div className="w-full h-full col-span-2 rounded-l-lg border-r-2 border-gray-300 p-3">
        <h2 className="text-lg font-bold text-foreground text-emerald-700">
          Memoria Micro
        </h2>
        <p className="text-muted-foreground">Uso de Memoria</p>
        <div className="relative m-2 bg-slate-200 rounded-full">
          <div className="h-4 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${dataIndividual && dataIndividual.microMemoryScore < 80
                ? "bg-purple-400"
                : "bg-red-500"
                }`}
              style={{ width: `${dataIndividual?.microMemoryScore ?? 0}%` }}
            />
          </div>
          <div
            className="absolute top-0 right-0 text-xs text-foreground font-medium text-right bg-slate-200 rounded-r-full"
            style={{
              width: `${100 - (dataIndividual?.microMemoryScore ?? 0)}%`,
            }}
          ></div>
          <div className="absolute top-0 left-0 text-xs text-muted-foreground font-medium">
            % Memoria
          </div>
        </div>
        <p className="mt-2 text-muted-foreground">
          {dataIndividual?.microMemoryScore
            ? Math.round(dataIndividual.microMemoryScore)
            : "N/A"}{" "}
          Memoria%
        </p>
      </div>
      <div className="w-full h-full flex-col flex items-center  justify-center  col-span-2 
      ">
        <div className="transition-transform transform cursor-pointer hover:scale-105s flex flex-col items-center">
          <Server
            className="flex items-center justify-center p-2 rounded-lg text-emerald-700 h-16 w-16   text-sm "
            onClick={toggleModal}
          />
          <p className="italic p-1">Ver Servidores</p>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-[60]">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button className=" text-[#222] absolute right-3 -top-0" onClick={toggleModal}> <X className="h-10" /> </button>

            <ModalServidor />
            <button
              onClick={toggleModal}
              className="mt-4 h-10 w-20 bg-blue-500 text-white  rounded" >
              Salir
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleDayServers;
