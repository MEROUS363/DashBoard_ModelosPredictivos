
import { useDateContext } from "../contexts/DateContext";
import TransSPI2 from "./hooks/fetchTransfSPI2";

const CantTransd = () => {
    const { date, loadingContext } = useDateContext();
    const {data, error, loading} = TransSPI2(date); // No need to call fetchScoresForDay manually

    if (loading || loadingContext) return <p>Cargando...</p>;
    if (error)
      return <p>Error: {error}</p>;


  return (
    <div className="pl-2">
        <h1 className="text-lg font-bold text-emerald-700 text-center p-2">Cantidad de Transferencia SPI2</h1>
        <div className="flex gap-4 justify-center m-2 ">
        <div className="p-4 bg-white rounded-lg shadow-lg w-96  flex flex-col items-center justify-center transition-transform transform hover:scale-105">
            <h2 className="text-lg font-bold text-emerald-700 text-center"></h2>
            <div className=" flex">
            <div className="flex items-center justify-center w-28 h-28 m-3 p-1">
                <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-1xl font-bold text-primary">
                        {data[1] && <p>{Math.round(data[1].Results[0])}</p>}
                           
                        </div>
                    </div>
                    <div className="absolute inset-0 rounded-full border-[10px]  border-gray-400" />
                </div>
               
            </div>
            <div className="flex items-center justify-center w-28 h-28 m-3 p-1">
                <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-1xl font-bold text-primary"> {data[2] && <p>{Math.round(data[2].Results[0])}</p>}</div>
                    </div>
                    <div className="absolute inset-0 rounded-full border-[10px]  border-gray-400" />
                </div>
                
            </div>
            
            <div className="flex items-center justify-center w-28 h-28 m-3 p-1">
                <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-1xl font-bold text-primary"> {data[3] && <p>{Math.round(data[3].Results[0])}</p>}</div>
                    </div>
                    <div className="absolute inset-0 rounded-full border-[10px]  border-gray-400" />
                </div>
                
            </div>
            </div>
        </div>
        </div>

    </div>
  );
};

export default CantTransd;
