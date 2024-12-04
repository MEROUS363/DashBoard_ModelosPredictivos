import { UnplugIcon } from "lucide-react";
import { useDateContext } from "../../contexts/DateContext";
import TransSPI2 from "../../hooks/fetchTransfSPI2";

const CantTransd = () => {
  const { date, loadingContext } = useDateContext();
  const { data, error, loading } = TransSPI2(date); // No need to call fetchScoresForDay manually

  if (loading || loadingContext) 
    return (<>
      <div className="flex bg-white  h-[200px] rounded-lg shadow-lg">
        <div className="w-full h-full flex justify-center items-center bg-gray-200 animate-pulse rounded-md">
          <div className="w-10 h-10 border-4 border-t-green-500 border-gray-400 rounded-full animate-spin"></div>
          <p className="ml-2">Cargando...</p>
        </div>
      </div>
    </>
    );

  if (error) 
    return (<>
      <div className="flex bg-white  h-[200px] rounded-lg shadow-lg">
        <div className="w-full h-full flex justify-center items-center bg-gray-200 rounded-md">
          <UnplugIcon className='h-28 mr-2' />
          <p className="ml-2"><strong>Error: </strong> {error}</p>
        </div>
      </div>
    </>
    );

  // if (loading || loadingContext) return <p>Cargando...</p>;
  // if (error) return <p>Error: {error}</p>;
  return (
    <div className=" flex h-[200px] w-full rounded-xl bg-white justify-center items-center shadow-lg">
      <h1 className=" text-lg font-bold w-46 mr-6 text-emerald-700 text-center">
        Cantidad de Transferencias SPI 2
      </h1>

      <div className="p-3 bg-white rounded-lg h-44 w-96 items-center justify-center ">
        <div className="flex  ">
          <div className="flex flex-col items-center gap-2  justify-center w-28 h-28 ml-3 p-1">
            <h1 className="text-emerald-700">Corte 1</h1>

            <div className="relative w-full h-full">
              <div className="absolute inset-0 flex items-center justify-center ">
                <div className="text-1xl font-bold">
                  {data[1] && <p>{Math.round(data[1]).toLocaleString()}</p>}
                </div>
              </div>
              <div className="absolute inset-0 rounded-full border-[10px]  border-gray-400" />
            </div>
          </div>

          <div className="flex flex-col gap-2 justify-center text-center w-28 h-28 ml-3 p-1">
            <h1 className="text-emerald-700">Corte 2</h1>

            <div className="relative w-full h-full">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-1xl font-bold text-">
                  {" "}
                  {data[2] && <p>{Math.round(data[2]).toLocaleString()}</p>}
                </div>
              </div>
              <div className="absolute inset-0 rounded-full border-[10px]  border-gray-400" />
            </div>
          </div>

          <div className="flex flex-col gap-2 items-center justify-center w-28 h-28 ml-3 p-1">
            <h1 className="text-emerald-700">Corte 3</h1>

            <div className="relative w-full h-full">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-1xl font-bold">
                  {" "}
                  {data[3] && <p>{Math.round(data[3]).toLocaleString()}</p>}
                </div>
              </div>
              <div className="absolute inset-0 rounded-full border-[10px]  border-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CantTransd;
