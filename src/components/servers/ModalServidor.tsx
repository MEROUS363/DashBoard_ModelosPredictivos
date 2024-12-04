import { useState } from "react";
import { ServerIcon, Search } from "lucide-react";
import { useDateContext } from "../../contexts/DateContext";
import usePredictServers from "../../hooks/fetchServersDataHook";

export interface ServerData {
  id: number;
  name: string;
  usage: number;
}

function getStatusColor(usage: number) {
  if (usage <= 80) return "text-green-500";
  if (usage < 90) return "text-yellow-500";
  return "text-red-500";
}

function DonutChart({ percentage }: { percentage: number }) {
  const circumference = 2 * Math.PI * 40;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-32 h-32">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-gray-200"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r="40"
          cx="50"
          cy="50"
        />
        <circle
          className={`${getStatusColor(
            percentage
          )} transition-all duration-300 ease-in-out`}
          strokeWidth="10"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="40"
          cx="50"
          cy="50"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold">{percentage}%</span>
      </div>
    </div>
  );
}

export default function ServerStatusCards() {
  const [searchTerm, setSearchTerm] = useState("");
  const { date, hour } = useDateContext();

  const { data, error, loading } = usePredictServers(date, hour);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!data) {
    return <p>No hay datos disponibles</p>;
  }

  const filteredServers = data.filter((server) =>
    server.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container w-[1100px] h-[620px] p-2 ">
      <h1 className="text-3xl font-bold mb-6 text-center text-emerald-700 ">
        Detalle Servidores
      </h1>
      <div className="mb-6 ml-5 relative w-[200px] ">
        <input
          type="text"
          placeholder="Buscar servidor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 w-[200px] border-2 border-gray-500 rounded-2xl"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 "
          size={20}
        />
      </div>
      <div className="max-h-[500px] w-full p-3 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 ">
        {filteredServers.map((server) => (
          <div
            key={server.name}
            className="overflow-hidden transition-all duration-200  hover:scale-105 shadow-2xl rounded-xl m-1 w-48"
          >
            <div className="">
              <div className="text-sm font-medium flex justify-center items-center gap-2 p-3 text-white bg-slate-700">
                <ServerIcon className="w-5 h-5 " />
                Servidor: <br /> {server.name}
              </div>
            </div>
            <div className="p-3 flex flex-col items-center cursor-default">
              <DonutChart percentage={Math.round(server.usage)} />
            </div>
          </div>
        ))}
      </div>
      {filteredServers.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No se encontraron servidores que coincidan con la búsqueda.
        </p>
      )}
    </div>
  );
}
