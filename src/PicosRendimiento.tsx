import './App.css'
import { useState, useEffect } from 'react';
function Picos() {
  const porcentajeM: number = 71;
  const porcentajep: number = 55 ;
  const Memoria: number = 45 ;
  const CantM: number = 100 ;
  const CantMM: number = 100 ;
  const CantP: number = 100;
  const Cantbff: number =100 ;

  const now: Date = new Date();

  const day: string = String(now.getDate()).padStart(2, '0');
  const month: string = String(now.getMonth() + 1).padStart(2, '0'); // Los meses son indexados desde 0
  const year: number = now.getFullYear();
  const FormatoFecha: string = `${day}/${month}/${year}`;

  const hours: string = String(now.getHours()+1).padStart(2, '0');
  const FormatoHora: string = `${hours}:00:00`;

  const [score, setscore] = useState<number>(0);
  const [dataList, setDataList] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  ;
  
  

  const enviarFechaHora = async () => {
    setLoading(true);

    try {
      const response = await fetch('https://localhost:61616/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fecha: FormatoFecha,
          hora: FormatoHora
        }),
      });

      if (!response.ok) {
        throw new Error('Error al realizar la petición');
      }

      const data = await response.json();
      setscore(data.score);

    } catch (error) {
      console.error('Error al consumir la API:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setDataList((prevList) => [...prevList, score]);
  }, [score]);
  useEffect(() => {
    enviarFechaHora();
  }, []);
  
  return (
    <div className='flex gap-2 justify-center p-4 m-2 '> 
    <div className="p-4 bg-white rounded-lg shadow-lg w-80 m-4 border-l-4 border-green-400 transition-transform transform hover:scale-105">
      <h2 className="text-lg font-bold text-foreground text-emerald-700">Procesador Micro</h2>
      <p className="text-muted-foreground">Uso de Procesador Micro</p>
        <div className="relative m-2 bg-slate-200 rounded-full">
          <div className=" h-4 bg-muted rounded-full overflow-hidden ">
          <div 
            className={`h-full rounded-full ${
               porcentajeM < 80 ? 'bg-pink-500' : 'bg-red-500'
            }`} 
            style={{ width: `${porcentajeM}%` }}
          >

          </div>

          </div>
          <div className="absolute top-0 right-0 text-xs text-foreground font-medium text-right bg-slate-200 rounded-r-full"   style={{ width: `${100-porcentajeM}%` }}>{CantM}%</div>
          <div className="absolute top-0 left-0 text-xs text-muted-foreground font-medium">% CPU</div>
        </div>
      <p className="mt-2 text-muted-foreground">__</p>
    </div>

    <div className="p-4 bg-white rounded-lg shadow-lg w-80 m-4 border-l-4 border-green-400 transition-transform transform hover:scale-105">
      <h2 className="text-lg font-bold text-foreground text-emerald-700">Memoria Micro</h2>
      <p className="text-muted-foreground">Uso de Memoria Micro</p>
        <div className="relative m-2 bg-slate-200 rounded-full">
          <div className=" h-4 bg-muted rounded-full overflow-hidden ">
          <div 
            className={`h-full rounded-full ${
              porcentajep < 80 ? 'bg-yellow-400'  : 'bg-red-500'
            }`} 
            style={{ width: `${porcentajep}%` }}
          >

          </div>

          </div>
          <div className="absolute top-0 right-0 text-xs text-foreground font-medium text-right bg-slate-200 rounded-r-full"   style={{ width: `${100-porcentajep}%` }}>{CantP}%</div>
          <div className="absolute top-0 left-0 text-xs text-muted-foreground font-medium"> % CPU</div>
          
        </div>
      <p className="mt-2 text-muted-foreground">__</p>
    </div>

    <div className="p-4 bg-white rounded-lg shadow-lg w-80 m-4 border-l-4 border-green-400 transition-transform transform hover:scale-105">
      <h2 className="text-lg font-bold text-foreground text-emerald-700 ">Procesador BFF </h2>
      <p className="text-muted-foreground">Uso de Procesador BFF </p>
        <div className="relative m-2 bg-slate-200 rounded-full">
          <div className=" h-4 bg-muted rounded-full overflow-hidden ">
          <div 
            className={`h-full rounded-full ${
              score < 80 ? 'bg-blue-400'  : 'bg-red-500'
            }`} 
            style={{ width: `${score}%` }}
          >

          </div>

          </div>
          <div className="absolute top-0 right-0 text-xs text-foreground font-medium text-right bg-slate-200 rounded-r-full"   style={{ width: `${100-score}%` }}>{Cantbff }%</div>
          <div className="absolute top-0 left-0 text-xs text-muted-foreground font-medium">% CPU</div>
        </div>
        <p className="mt-2 text-muted-foreground">{score.toFixed(2)} CPU%</p>
    </div>

    <div className="p-4 bg-white rounded-lg shadow-lg w-80 m-4 border-l-4 border-green-400 transition-transform transform hover:scale-105">
      <h2 className="text-lg font-bold text-foreground text-emerald-700">Memoria BFF</h2>
      <p className="text-muted-foreground">Uso de Memoria BFF</p>
        <div className="relative m-2 bg-slate-200 rounded-full">
          <div className=" h-4 bg-muted rounded-full overflow-hidden ">
          <div 
            className={`h-full rounded-full ${
              Memoria < 80 ? 'bg-purple-400': 'bg-red-400'
            }`} 
            style={{ width: `${Memoria}%` }}
          >

          </div>

          </div>
          <div className="absolute top-0 right-0 text-xs text-foreground font-medium text-right bg-slate-200 rounded-r-full"   style={{ width: `${100-Memoria}%` }}>{CantMM }%</div>
          <div className="absolute top-0 left-0 text-xs text-muted-foreground font-medium">% CPU</div>
        </div>
      <p className="mt-2 text-muted-foreground">__</p>
    </div>
    
    </div>
    
  )
}

export default Picos
