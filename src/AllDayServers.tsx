import { PredictAllOutput } from "./hooks/fetchPicosRendimientoHooh";

interface AlldayServerProps {
  data: PredictAllOutput | null;
}

const AllDayServers: React.FC<AlldayServerProps> = ({ data }) => {
  return (
    <div className="w-full h-[150px] bg-white col-span-10 rounded-lg shadow-st  py-1 grid grid-cols-8">
      {/* Procesador BFF */}
      <div className="w-full h-full col-span-2 rounded-l-lg border-r-2 border-gray-300 p-3">
        <h2 className="text-lg font-bold text-foreground text-emerald-700">
          Procesador BFF
        </h2>
        <p className="text-muted-foreground">Uso de Procesador BFF </p>
        {Object.entries(data!.bffProcessorScores).map(([hour, score]) => (
          <div key={hour}>
            <div className="relative m-2 bg-slate-200 rounded-full">
              <div className="h-4 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    score < 80 ? "bg-blue-400" : "bg-red-500"
                  }`}
                  style={{ width: `${score}%` }}
                />
              </div>
              <div
                className="absolute top-0 right-0 text-xs text-foreground font-medium text-right bg-slate-200 rounded-r-full"
                style={{ width: `${100 - score}%` }}
              ></div>
              <div className="absolute top-0 left-0 text-xs text-muted-foreground font-medium">
                % CPU
              </div>
            </div>
            <p className="mt-2 text-muted-foreground">
              Hora: {hour}, {Math.round(score)} CPU%
            </p>
          </div>
        ))}
      </div>

      {/* Memoria BFF */}
      <div className="w-full h-full p-3 col-span-2 border-r-2 border-gray-300">
        <h2 className="text-lg font-bold text-foreground text-emerald-700">
          Promedio de Memoria BFF
        </h2>
        <p className="text-muted-foreground">Uso de Memoria BFF</p>
        {Object.entries(data!.bffMemoryScores).map(([hour, score]) => (
          <div key={hour}>
            <div className="relative m-2 bg-slate-200 rounded-full">
              <div className="h-4 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    score < 80 ? "bg-yellow-400" : "bg-red-500"
                  }`}
                  style={{ width: `${score}%` }}
                />
              </div>
              <div
                className="absolute top-0 right-0 text-xs text-foreground font-medium text-right bg-slate-200 rounded-r-full"
                style={{ width: `${100 - score}%` }}
              ></div>
              <div className="absolute top-0 left-0 text-xs text-muted-foreground font-medium">
                % Memoria
              </div>
            </div>
            <p className="mt-2 text-muted-foreground">
              Hora: {hour}, {Math.round(score)} Memoria%
            </p>
          </div>
        ))}
      </div>

      {/* Procesador Micro */}
      <div className="w-full h-full col-span-2 border-r-2 border-gray-300 p-3">
        <h2 className="text-lg font-bold text-foreground text-emerald-700">
          Procesador Micro
        </h2>
        <p className="text-muted-foreground">Uso de Procesador Micro</p>
        {Object.entries(data!.microProcessorScores).map(([hour, score]) => (
          <div key={hour}>
            <div className="relative m-2 bg-slate-200 rounded-full">
              <div className="h-4 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    score < 80 ? "bg-green-400" : "bg-red-500"
                  }`}
                  style={{ width: `${score}%` }}
                />
              </div>
              <div
                className="absolute top-0 right-0 text-xs text-foreground font-medium text-right bg-slate-200 rounded-r-full"
                style={{ width: `${100 - score}%` }}
              ></div>
              <div className="absolute top-0 left-0 text-xs text-muted-foreground font-medium">
                % CPU
              </div>
            </div>
            <p className="mt-2 text-muted-foreground">
              Hora: {hour}, {Math.round(score)} CPU%
            </p>
          </div>
        ))}
      </div>

      {/* Memoria Micro */}
      <div className="w-full h-full col-span-2  p-3">
        <h2 className="text-lg font-bold text-foreground text-emerald-700">
          Memoria Micro
        </h2>
        <p className="text-muted-foreground">Uso de Memoria Micro</p>
        {Object.entries(data!.microMemoryScores).map(([hour, score]) => (
          <div key={hour}>
            <div className="relative m-2 bg-slate-200 rounded-full">
              <div className="h-4 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    score < 80 ? "bg-purple-400" : "bg-red-500"
                  }`}
                  style={{ width: `${score}%` }}
                />
              </div>
              <div
                className="absolute top-0 right-0 text-xs text-foreground font-medium text-right bg-slate-200 rounded-r-full"
                style={{ width: `${100 - score}%` }}
              ></div>
              <div className="absolute top-0 left-0 text-xs text-muted-foreground font-medium">
                % Memoria
              </div>
            </div>
            <p className="mt-2 text-muted-foreground">
              Hora: {hour}, {Math.round(score)} Memoria%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllDayServers;
