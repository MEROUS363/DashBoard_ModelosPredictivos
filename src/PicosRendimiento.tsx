import { useEffect, useState } from 'react';
import { useDateContext } from '../contexts/DateContext';
import './App.css';
import usePredictAll from './hooks/fetchPicosRendimientoHooh';
import ModalServidor from './ModalServidor';
import { CircleEllipsis } from 'lucide-react';
import usePredictSingleServers from './hooks/fetchIndividualServers';

const Picos: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const { date, hour, loadingContext, typeOfData } = useDateContext();
 const { data, loading, error } = usePredictAll(date, hour);
 const {data: dataIndividual, loading: loadingIndividual, error: errorIndividual} = usePredictSingleServers(date, hour);



  if (loading || loadingContext || loadingIndividual) {
    return <p>Cargando...</p>;
  }

  if (error || errorIndividual) {
    return <p>Error: {error}</p>;
  }
  if(hour==="Todo el día"){
    return (
      <div className='flex gap-2 justify-center m-2'>
        
       {/* Procesador BFF */}
    <div className="p-4 bg-white rounded-lg shadow-lg w-80 m-4 border-l-4 border-green-400 transition-transform transform hover:scale-105">
      <h2 className="text-lg font-bold text-foreground text-emerald-700">Procesador BFF</h2>
      <p className="text-muted-foreground">Uso de Procesador BFF </p>
      {Object.entries(data!.bffProcessorScores).map(([hour, score]) => (
        <div key={hour}>
          <div className="relative m-2 bg-slate-200 rounded-full">
            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${score < 80 ? 'bg-blue-400' : 'bg-red-500'}`} 
                style={{ width: `${score}%` }}
              />
            </div>
            <div className="absolute top-0 right-0 text-xs text-foreground font-medium text-right bg-slate-200 rounded-r-full" style={{ width: `${100 - score}%` }}>
            </div>
            <div className="absolute top-0 left-0 text-xs text-muted-foreground font-medium">% CPU</div>
          </div>
          <p className="mt-2 text-muted-foreground">Hora: {hour}, {Math.round(score)} CPU%</p>
        </div>
      ))}
    </div>

    {/* Memoria BFF */}
    <div className="p-4 bg-white rounded-lg shadow-lg w-80 m-4 border-l-4 border-green-400 transition-transform transform hover:scale-105">
      <h2 className="text-lg font-bold text-foreground text-emerald-700">Promedio de Memoria BFF</h2>
      <p className="text-muted-foreground">Uso de Memoria BFF</p>
      {Object.entries(data!.bffMemoryScores).map(([hour, score]) => (
        <div key={hour}>
          <div className="relative m-2 bg-slate-200 rounded-full">
            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${score < 80 ? 'bg-yellow-400' : 'bg-red-500'}`} 
                style={{ width: `${score}%` }}
              />
            </div>
            <div className="absolute top-0 right-0 text-xs text-foreground font-medium text-right bg-slate-200 rounded-r-full" style={{ width: `${100 - score}%` }}>
            </div>
            <div className="absolute top-0 left-0 text-xs text-muted-foreground font-medium">% Memoria</div>
          </div>
          <p className="mt-2 text-muted-foreground">Hora: {hour}, {Math.round(score)} Memoria%</p>
        </div>
      ))}
    </div>

    {/* Procesador Micro */}
    <div className="p-4 bg-white rounded-lg shadow-lg w-80 m-4 border-l-4 border-green-400 transition-transform transform hover:scale-105">
      <h2 className="text-lg font-bold text-foreground text-emerald-700">Procesador Micro</h2>
      <p className="text-muted-foreground">Uso de Procesador Micro</p>
      {Object.entries(data!.microProcessorScores).map(([hour, score]) => (
        <div key={hour}>
          <div className="relative m-2 bg-slate-200 rounded-full">
            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${score < 80 ? 'bg-green-400' : 'bg-red-500'}`} 
                style={{ width: `${score}%` }}
              />
            </div>
            <div className="absolute top-0 right-0 text-xs text-foreground font-medium text-right bg-slate-200 rounded-r-full" style={{ width: `${100 - score}%` }}>
            </div>
            <div className="absolute top-0 left-0 text-xs text-muted-foreground font-medium">% CPU</div>
          </div>
          <p className="mt-2 text-muted-foreground">Hora: {hour}, {Math.round(score)} CPU%</p>
        </div>
      ))}
    </div>

    {/* Memoria Micro */}
    <div className="p-4 bg-white rounded-lg shadow-lg w-80 m-4 border-l-4 border-green-400 transition-transform transform hover:scale-105">
      <h2 className="text-lg font-bold text-foreground text-emerald-700">Memoria Micro</h2>
      <p className="text-muted-foreground">Uso de Memoria Micro</p>
      {Object.entries(data!.microMemoryScores).map(([hour, score]) => (
        <div key={hour}>
          <div className="relative m-2 bg-slate-200 rounded-full">
            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${score < 80 ? 'bg-purple-400' : 'bg-red-500'}`} 
                style={{ width: `${score}%` }}
              />
            </div>
            <div className="absolute top-0 right-0 text-xs text-foreground font-medium text-right bg-slate-200 rounded-r-full" style={{ width: `${100 - score}%` }}>
            </div>
            <div className="absolute top-0 left-0 text-xs text-muted-foreground font-medium">% Memoria</div>
          </div>
          <p className="mt-2 text-muted-foreground">Hora: {hour}, {Math.round(score)} Memoria%</p>
        </div>
      ))}
    </div>
       
      </div>
    );
  }
  if(hour!=="Todo el día"){
    return (
      <div className='flex gap-2 justify-center  m-2'>
        
        <div className="p-4 bg-white rounded-lg shadow-lg w-80 m-4 border-l-4 border-green-400 transition-transform transform hover:scale-105">
          <h2 className="text-lg font-bold text-foreground text-emerald-700">Procesador BFF</h2>
          <p className="text-muted-foreground">Pico Mas Alto Procesador BFF </p>
          <div className="relative m-2 bg-slate-200 rounded-full">
            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${dataIndividual && dataIndividual.bffProcessorScores < 80 ? 'bg-blue-400' : 'bg-red-500'}`} 
                style={{ width: `${dataIndividual?.bffProcessorScores ?? 0}%` }}
              />
            </div>
            <div className="absolute top-0 right-0 text-xs text-foreground font-medium text-right bg-slate-200 rounded-r-full" style={{ width: `${100 - (dataIndividual?.bffProcessorScores ?? 0)}%` }}>
            </div>
            <div className="absolute top-0 left-0 text-xs text-muted-foreground font-medium">% CPU</div>
          </div>
          <p className="mt-2 text-muted-foreground">{dataIndividual?.bffProcessorScores ? Math.round(dataIndividual.bffProcessorScores): 'N/A'} CPU%</p>
        </div>
  
        <div className="p-4 bg-white rounded-lg shadow-lg w-80 m-4 border-l-4 border-green-400 transition-transform transform hover:scale-105">
          <h2 className="text-lg font-bold text-foreground text-emerald-700">Promedio de Memoria BFF</h2>
          <p className="text-muted-foreground">Pico Mas Alto de Memoria BFF</p>
          <div className="relative m-2 bg-slate-200 rounded-full">
            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${dataIndividual && dataIndividual.bffMemoryScores < 80 ? 'bg-yellow-400' : 'bg-red-500'}`} 
                style={{ width: `${dataIndividual?.bffMemoryScores ?? 0}%` }}
              />
            </div>
            <div className="absolute top-0 right-0 text-xs text-foreground font-medium text-right bg-slate-200 rounded-r-full" style={{ width: `${100 - (dataIndividual?.bffMemoryScores ?? 0)}%` }}>
            </div>
            <div className="absolute top-0 left-0 text-xs text-muted-foreground font-medium">% Memoria</div>
          </div>
          <p className="mt-2 text-muted-foreground">{dataIndividual?.bffMemoryScores ? Math.round(dataIndividual.bffMemoryScores) : 'N/A'} Memoria%</p>
        </div>
  
        <div className="p-4 bg-white rounded-lg shadow-lg w-80 m-4 border-l-4 border-green-400 transition-transform transform hover:scale-105">
          <h2 className="text-lg font-bold text-foreground text-emerald-700">Procesador Micro</h2>
          <p className="text-muted-foreground">Pico Mas Alto de Procesador Micro</p>
          <div className="relative m-2 bg-slate-200 rounded-full">
            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${dataIndividual && dataIndividual.microProcessorScores < 80 ? 'bg-green-400' : 'bg-red-500'}`} 
                style={{ width: `${dataIndividual?.microProcessorScores ?? 0}%` }}
              />
            </div>
            <div className="absolute top-0 right-0 text-xs text-foreground font-medium text-right bg-slate-200 rounded-r-full" style={{ width: `${100 - (dataIndividual?.microProcessorScores ?? 0)}%` }}>
            </div>
            <div className="absolute top-0 left-0 text-xs text-muted-foreground font-medium">% CPU</div>
          </div>
          <p className="mt-2 text-muted-foreground">{dataIndividual?.microProcessorScores ? Math.round(dataIndividual.microProcessorScores) : 'N/A'} CPU% </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-lg w-80 m-4 border-l-4 border-green-400 transition-transform transform hover:scale-105">
          <h2 className="text-lg font-bold text-foreground text-emerald-700">Memoria Micro</h2>
          <p className="text-muted-foreground">Pico Mas Alto de Memoria Micro</p>
          <div className="relative m-2 bg-slate-200 rounded-full">
            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${dataIndividual && dataIndividual.microMemoryScores < 80 ? 'bg-purple-400' : 'bg-red-500'}`} 
                style={{ width: `${dataIndividual?.microMemoryScores ?? 0}%` }}
              />
            </div>
            <div className="absolute top-0 right-0 text-xs text-foreground font-medium text-right bg-slate-200 rounded-r-full" style={{ width: `${100 - (dataIndividual?.microMemoryScores ?? 0)}%` }}>
            </div>
            <div className="absolute top-0 left-0 text-xs text-muted-foreground font-medium">% Memoria</div>
          </div>
          <p className="mt-2 text-muted-foreground">{dataIndividual?.microMemoryScores ? Math.round(dataIndividual.microMemoryScores) : 'N/A'} Memoria%</p>
        </div>
        <CircleEllipsis className='flex items-center justify-center bg-blue-500 rounded-full h-16 w-9 mt-[60px] transition-transform transform hover:scale-105 text-sm text-white' onClick={toggleModal} />
        {/* Modal */}
        {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50 ">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <ModalServidor></ModalServidor>
            <button 
              onClick={toggleModal} 
              className="mt-4 h-10 w-20 bg-blue-500 text-white  rounded">
              Cerrar
            </button>
          </div>
        </div>
      )}
      </div>
    );

  }

}

export default Picos;
