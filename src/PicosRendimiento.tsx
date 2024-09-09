import { useEffect } from 'react';
import { useDateContext } from '../contexts/DateContext';
import './App.css';
import usePredictAll from './hooks/fetchPicosRendimientoHooh';

const Picos: React.FC = () => {

  const { date, hour, loadingContext, typeOfData } = useDateContext();
 const { data, loading, error } = usePredictAll(date, hour);
  console.log("Valor en Componente ====>",typeOfData)
    
  useEffect(()=>{
    console.log(typeOfData);
  })

  if (loading || loadingContext) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  if(typeOfData==="FiltroXHora"){
    return (
      <div className='flex gap-2 justify-center m-2'>
        
        <div className="p-4 bg-white rounded-lg shadow-lg w-80 m-4 border-l-4 border-green-400 transition-transform transform hover:scale-105">
          <h2 className="text-lg font-bold text-foreground text-emerald-700">Procesador BFF</h2>
          <p className="text-muted-foreground">Uso de Procesador BFF </p>
          <div className="relative m-2 bg-slate-200 rounded-full">
            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${data && data.bffProcessorScore < 80 ? 'bg-blue-400' : 'bg-red-500'}`} 
                style={{ width: `${data?.bffProcessorScore ?? 0}%` }}
              />
            </div>
            <div className="absolute top-0 right-0 text-xs text-foreground font-medium text-right bg-slate-200 rounded-r-full" style={{ width: `${100 - (data?.bffProcessorScore ?? 0)}%` }}>
            </div>
            <div className="absolute top-0 left-0 text-xs text-muted-foreground font-medium">% CPU</div>
          </div>
          <p className="mt-2 text-muted-foreground">{data?.bffProcessorScore ? Math.round(data.bffProcessorScore): 'N/A'} CPU%</p>
        </div>
  
        <div className="p-4 bg-white rounded-lg shadow-lg w-80 m-4 border-l-4 border-green-400 transition-transform transform hover:scale-105">
          <h2 className="text-lg font-bold text-foreground text-emerald-700">Promedio de Memoria BFF</h2>
          <p className="text-muted-foreground">Uso de Memoria BFF</p>
          <div className="relative m-2 bg-slate-200 rounded-full">
            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${data && data.bffMemoryScore < 80 ? 'bg-yellow-400' : 'bg-red-500'}`} 
                style={{ width: `${data?.bffMemoryScore ?? 0}%` }}
              />
            </div>
            <div className="absolute top-0 right-0 text-xs text-foreground font-medium text-right bg-slate-200 rounded-r-full" style={{ width: `${100 - (data?.bffMemoryScore ?? 0)}%` }}>
            </div>
            <div className="absolute top-0 left-0 text-xs text-muted-foreground font-medium">% Memoria</div>
          </div>
          <p className="mt-2 text-muted-foreground">{data?.bffMemoryScore ? Math.round(data.bffMemoryScore) : 'N/A'} Memoria%</p>
        </div>
  
        <div className="p-4 bg-white rounded-lg shadow-lg w-80 m-4 border-l-4 border-green-400 transition-transform transform hover:scale-105">
          <h2 className="text-lg font-bold text-foreground text-emerald-700">Procesador Micro</h2>
          <p className="text-muted-foreground">Uso de Procesador Micro</p>
          <div className="relative m-2 bg-slate-200 rounded-full">
            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${data && data.microProcessorScore < 80 ? 'bg-green-400' : 'bg-red-500'}`} 
                style={{ width: `${data?.microProcessorScore ?? 0}%` }}
              />
            </div>
            <div className="absolute top-0 right-0 text-xs text-foreground font-medium text-right bg-slate-200 rounded-r-full" style={{ width: `${100 - (data?.microProcessorScore ?? 0)}%` }}>
            </div>
            <div className="absolute top-0 left-0 text-xs text-muted-foreground font-medium">% CPU</div>
          </div>
          <p className="mt-2 text-muted-foreground">{data?.microProcessorScore ? Math.round(data.microProcessorScore) : 'N/A'} CPU%</p>
        </div>
  
        <div className="p-4 bg-white rounded-lg shadow-lg w-80 m-4 border-l-4 border-green-400 transition-transform transform hover:scale-105">
          <h2 className="text-lg font-bold text-foreground text-emerald-700">Memoria Micro</h2>
          <p className="text-muted-foreground">Uso de Memoria Micro</p>
          <div className="relative m-2 bg-slate-200 rounded-full">
            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${data && data.microMemoryScore < 80 ? 'bg-purple-400' : 'bg-red-500'}`} 
                style={{ width: `${data?.microMemoryScore ?? 0}%` }}
              />
            </div>
            <div className="absolute top-0 right-0 text-xs text-foreground font-medium text-right bg-slate-200 rounded-r-full" style={{ width: `${100 - (data?.microMemoryScore ?? 0)}%` }}>
            </div>
            <div className="absolute top-0 left-0 text-xs text-muted-foreground font-medium">% Memoria</div>
          </div>
          <p className="mt-2 text-muted-foreground">{data?.microMemoryScore ? Math.round(data.microMemoryScore) : 'N/A'} Memoria%</p>
        </div>
        
      </div>
    );
  }
  if(typeOfData==="FiltroXFecha"){
    return (
      <div className='flex gap-2 justify-center  m-2'>
        
        <div className="p-4 bg-white rounded-lg shadow-lg w-80 m-4 border-l-4 border-green-400 transition-transform transform hover:scale-105">
          <h2 className="text-lg font-bold text-foreground text-emerald-700">Procesador BFF</h2>
          <p className="text-muted-foreground">Pico Mas Alto Procesador BFF </p>
          <div className="relative m-2 bg-slate-200 rounded-full">
            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${data && data.bffProcessorScore < 80 ? 'bg-blue-400' : 'bg-red-500'}`} 
                style={{ width: `${data?.bffProcessorScore ?? 0}%` }}
              />
            </div>
            <div className="absolute top-0 right-0 text-xs text-foreground font-medium text-right bg-slate-200 rounded-r-full" style={{ width: `${100 - (data?.bffProcessorScore ?? 0)}%` }}>
            </div>
            <div className="absolute top-0 left-0 text-xs text-muted-foreground font-medium">% CPU</div>
          </div>
          <p className="mt-2 text-muted-foreground">{data?.bffProcessorScore ? Math.round(data.bffProcessorScore): 'N/A'} CPU% a las 00:00:00</p>
        </div>
  
        <div className="p-4 bg-white rounded-lg shadow-lg w-80 m-4 border-l-4 border-green-400 transition-transform transform hover:scale-105">
          <h2 className="text-lg font-bold text-foreground text-emerald-700">Promedio de Memoria BFF</h2>
          <p className="text-muted-foreground">Pico Mas Alto de Memoria BFF</p>
          <div className="relative m-2 bg-slate-200 rounded-full">
            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${data && data.bffMemoryScore < 80 ? 'bg-yellow-400' : 'bg-red-500'}`} 
                style={{ width: `${data?.bffMemoryScore ?? 0}%` }}
              />
            </div>
            <div className="absolute top-0 right-0 text-xs text-foreground font-medium text-right bg-slate-200 rounded-r-full" style={{ width: `${100 - (data?.bffMemoryScore ?? 0)}%` }}>
            </div>
            <div className="absolute top-0 left-0 text-xs text-muted-foreground font-medium">% Memoria</div>
          </div>
          <p className="mt-2 text-muted-foreground">{data?.bffMemoryScore ? Math.round(data.bffMemoryScore) : 'N/A'} Memoria% a las 00:00:00</p>
        </div>
  
        <div className="p-4 bg-white rounded-lg shadow-lg w-80 m-4 border-l-4 border-green-400 transition-transform transform hover:scale-105">
          <h2 className="text-lg font-bold text-foreground text-emerald-700">Procesador Micro</h2>
          <p className="text-muted-foreground">Pico Mas Alto de Procesador Micro</p>
          <div className="relative m-2 bg-slate-200 rounded-full">
            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${data && data.microProcessorScore < 80 ? 'bg-green-400' : 'bg-red-500'}`} 
                style={{ width: `${data?.microProcessorScore ?? 0}%` }}
              />
            </div>
            <div className="absolute top-0 right-0 text-xs text-foreground font-medium text-right bg-slate-200 rounded-r-full" style={{ width: `${100 - (data?.microProcessorScore ?? 0)}%` }}>
            </div>
            <div className="absolute top-0 left-0 text-xs text-muted-foreground font-medium">% CPU</div>
          </div>
          <p className="mt-2 text-muted-foreground">{data?.microProcessorScore ? Math.round(data.microProcessorScore) : 'N/A'} CPU% a las 00:00:00</p>
        </div>
  
        <div className="p-4 bg-white rounded-lg shadow-lg w-80 m-4 border-l-4 border-green-400 transition-transform transform hover:scale-105">
          <h2 className="text-lg font-bold text-foreground text-emerald-700">Memoria Micro</h2>
          <p className="text-muted-foreground">Pico Mas Alto de Memoria Micro</p>
          <div className="relative m-2 bg-slate-200 rounded-full">
            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${data && data.microMemoryScore < 80 ? 'bg-purple-400' : 'bg-red-500'}`} 
                style={{ width: `${data?.microMemoryScore ?? 0}%` }}
              />
            </div>
            <div className="absolute top-0 right-0 text-xs text-foreground font-medium text-right bg-slate-200 rounded-r-full" style={{ width: `${100 - (data?.microMemoryScore ?? 0)}%` }}>
            </div>
            <div className="absolute top-0 left-0 text-xs text-muted-foreground font-medium">% Memoria</div>
          </div>
          <p className="mt-2 text-muted-foreground">{data?.microMemoryScore ? Math.round(data.microMemoryScore) : 'N/A'} Memoria% a las 00:00:00</p>
        </div>
        
      </div>
    );

  }

}

export default Picos;
