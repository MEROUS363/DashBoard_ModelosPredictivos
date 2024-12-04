import usePredictAll from "../../hooks/fetchPicosRendimientoHooh";
import { useDateContext } from "../../contexts/DateContext";
import usePredictSingleServers from "../../hooks/fetchIndividualServers";
import AllDayServers from "./AllDayServers";
import SingleDayServers from "./SingleDayServers";
import {  UnplugIcon } from "lucide-react";

const PicosServidores: React.FC = () => {
  const { date, hour, loadingContext } = useDateContext();
  const { data, loading, error } = usePredictAll(date, hour);
  const {
    data: dataIndividual,
    loading: loadingIndividual,
    error: errorIndividual,
  } = usePredictSingleServers(date, hour);

  if (loading || loadingContext || loadingIndividual) {
    return <>
      <div className="w-full h-[150px] bg-white col-span-10 rounded-lg shadow-md animate-pulse">
        <div className="w-full h-full flex justify-center items-center rounded-lg bg-gray-200 py-1">
          <div className="w-10 h-10 border-4 border-t-green-500 border-gray-400 rounded-full animate-spin"></div>
          <p className="ml-2">Cargando...</p>
        </div>
      </div>
    </>;
  }

  if (error || errorIndividual) {
    return <>
      <div className="w-full h-[150px] bg-white col-span-10 rounded-lg shadow-md">
        <div className="w-full h-full flex justify-center items-center rounded-lg bg-gray-200 py-1">
          <UnplugIcon className='h-28 mr-2' />
          <p><strong>Error: </strong> {error || errorIndividual}</p>
        </div>
      </div>
    </>;
  }

  if (hour === "Todo el día") {
    return <AllDayServers data={data} />;
  } else {
    return <SingleDayServers dataIndividual={dataIndividual} />;
  }
};

export default PicosServidores;
