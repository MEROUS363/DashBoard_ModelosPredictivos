import React, { useState } from "react";
import { Tab, Tabs, TabList } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useTop10Table, {
  ProdunetAndBancaMovilTop10,
} from "./hooks/fetchTop10TableHook";
import { Info } from "lucide-react";
import { LineGraphTop10 } from "./LineGraphTop10";

const TopTenTable: React.FC = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0); // Estado para rastrear el índice de la pestaña seleccionada
  const [selectedPrediction, setSelectedPrediction] =
    useState<ProdunetAndBancaMovilTop10 | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, error, loading } = useTop10Table(selectedTabIndex);

  const openModal = (prediction: ProdunetAndBancaMovilTop10) => {
    setSelectedPrediction(prediction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPrediction(null);
    setIsModalOpen(false);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error al cargar los datos</div>;
  }

  if (!data) {
    return <div>No hay datos disponibles</div>;
  }
  // Determinar qué datos mostrar en la tabla en función de la pestaña seleccionada

  return (
    <div className="w-full h-[420px] bg-white col-span-4 row-span-2 shadow-st rounded-lg flex">
      {/* Sección de Tabs en la parte izquierda */}
      <div className="h-full w-40 bg-[#ECECEC] rounded-l-lg p-1">
        <Tabs
          selectedIndex={selectedTabIndex}
          onSelect={(index) => setSelectedTabIndex(index)}
        >
          <TabList className="flex flex-col">
            <Tab
              className="p-3 cursor-pointer font-semibold text-gray-600 hover:bg-gray-300 rounded-md transition-all"
              selectedClassName="bg-white text-green-700 font-bold border-l-4 border-green-700"
            >
              Produnet y Movil
            </Tab>
            <Tab
              className="p-3 cursor-pointer font-semibold text-gray-600 hover:bg-gray-300 rounded-md transition-all"
              selectedClassName="bg-white text-green-700 font-bold border-l-4 border-green-700"
            >
              Tarjeta de débito
            </Tab>
          </TabList>
        </Tabs>
      </div>

      {/* Tabla de contenido */}
      <div className="w-full">
        <div className="overflow-y-auto w-full h-full">
          <table className="table-auto w-full bg-[#FDFDFD] text-black rounded-lg">
            <thead>
              <tr className="bg-[#EBF9F1]">
                <th className="px-4 py-2 text-left text-emerald-700 font-semibold">
                  Fecha
                </th>
                <th className="px-4 py-2 text-left text-emerald-700 font-semibold">
                  Accesos totales
                </th>
                <th className="px-4 py-2 text-emerald-700 font-semibold text-center">
                  Detalle diario
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((prediction) => (
                <tr
                  key={`${prediction.date}`}
                  className="hover:bg-emerald-50 cursor-pointer transition-colors duration-200"
                >
                  <td className="px-4 py-2 text-left">{prediction.date}</td>
                  <td className="px-4 py-2 border-l border-gray-300">
                    {Math.round(prediction.sumPrediction)}
                  </td>
                  <td className="px-4 py-2 border-l border-gray-300 text-center">
                    <label
                      htmlFor="prediction-modal"
                      className="btn btn-sm btn-ghost text-emerald-600"
                      onClick={() => openModal(prediction)}
                    >
                      <Info color="#00693C" />
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="modal-box bg-white rounded-lg p-6 w-3/4 h-auto max-w-4xl">
            <h3 className="font-bold text-lg mb-4">
              Detalles de la predicción
            </h3>
            {!selectedPrediction ? (
              <h2>No existen datos para la fecha indicada</h2>
            ) : (
              <LineGraphTop10
                date={selectedPrediction.date}
                selectedTab={selectedTabIndex}
              />
            )}
            <div className="modal-action mt-4">
              <button
                className="btn bg-emerald-600 text-white"
                onClick={closeModal}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopTenTable;
