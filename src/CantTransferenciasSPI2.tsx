
import { useDateContext } from "../contexts/DateContext";
import TransSPI2 from "./hooks/fetchTransfSPI2";

const CantTransd = () => {
    const { date, loadingContext } = useDateContext();
    const {data, error, loading} = TransSPI2(date); // No need to call fetchScoresForDay manually

    if (loading || loadingContext) return <p>Cargando...</p>;
    if (error)
      return <p>Error: {error}</p>;


    console.log("data 1", data[1]);
    console.log("data 2", data[2]);
    console.log("data 3", data[3]);

    if (loading || loadingContext) return <p>Cargando...</p>;
    if (error)
      return <p>Error: {error}</p>;
  return (
    <div className=" flex h-[247px] text-center items-center rounded-xl bg-emerald-700 justify-center mt-6">
        <div className=" gap-4 justify-center items-center m-2 ">
        <h1 className=" text-lg font-bold text-white text-center">Cantidad de Transferencia SPI2</h1>

        <div className="p-2 bg-white rounded-lg shadow-lg w-96  flex flex-col items-center justify-center ">
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
