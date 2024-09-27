import React, { useState, useEffect } from "react";
import { useDateContext } from "../contexts/DateContext";
import axios from "axios";
import { Info } from "lucide-react";
import { Line } from "react-chartjs-2";
import { LineGraphTop10 } from "./LineGraphTop10";
import useTop10Table, { ProdunetAndBancaMovilTop10 } from "./hooks/fetchTop10TableHook";


const Top10Days: React.FC = () => {
  const [selectedPrediction, setSelectedPrediction] =
    useState< ProdunetAndBancaMovilTop10| null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

 const {data,error,loading} = useTop10Table(); // No need to call fetchScoresForDay manually

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

  return (
    <div className="max-w-lg mx-auto h-auto bg-white rounded-lg shadow-md p-5 text-center">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-emerald-700 mb-3">
          Top 10 Días más transaccionales
        </h2>
        <div className=" rounded-lg">
          <table className="table-auto w-full bg-gray-100 text-black rounded-lg">
            <thead>
              <tr className="bg-emerald-100">
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
                  <td className="px-4 py-2 text-left">
                    {prediction.date}
                  </td>
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
              <LineGraphTop10 date={selectedPrediction.date} />
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

export default Top10Days;
