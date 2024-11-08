import { useDateContext } from "../../contexts/DateContext";
import TransSPI2 from "../../hooks/fetchTransfSPI2";

const CantTransd = () => {
  const { date, loadingContext } = useDateContext();
  const { data, error, loading } = TransSPI2(date); // No need to call fetchScoresForDay manually

  if (loading || loadingContext) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  if (loading || loadingContext) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className=" flex h-[200px] w-full text-center items-center rounded-xl  bg-emerald-700 ">
      <h1 className=" text-lg font-bold w-46 mr-6 text-white text-center">
        Cantidad de Transferencia SPI2
      </h1>

      <div className="p-3 bg-white rounded-lg h-44 w-96 items-center justify-center ">
        <div className="flex  ">
          <div className="items-center justify-center w-28 h-28 ml-3 p-1">
            <h1>Corte 1</h1>

            <div className="relative w-full h-full">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-1xl font-bold text-primary">
                  {data[1] && <p>{Math.round(data[1].Results[0])}</p>}
                </div>
              </div>
              <div className="absolute inset-0 rounded-full border-[10px]  border-gray-400" />
            </div>
          </div>

          <div className=" items-center justify-center w-28 h-28 ml-3 p-1">
            <h1>Corte 2</h1>

            <div className="relative w-full h-full">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-1xl font-bold text-primary">
                  {" "}
                  {data[2] && <p>{Math.round(data[2].Results[0])}</p>}
                </div>
              </div>
              <div className="absolute inset-0 rounded-full border-[10px]  border-gray-400" />
            </div>
          </div>

          <div className=" items-center justify-center w-28 h-28 ml-3 p-1">
            <h1>Corte 3</h1>

            <div className="relative w-full h-full">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-1xl font-bold text-primary">
                  {" "}
                  {data[3] && <p>{Math.round(data[3].Results[0])}</p>}
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
