import usePredictAll from "../../hooks/fetchPicosRendimientoHooh";
import { useDateContext } from "../../contexts/DateContext";
import usePredictSingleServers from "../../hooks/fetchIndividualServers";
import AllDayServers from "./AllDayServers";
import SingleDayServers from "./SingleDayServers";

const PicosServidores: React.FC = () => {
  const { date, hour, loadingContext } = useDateContext();
  const { data, loading, error } = usePredictAll(date, hour);
  const {
    data: dataIndividual,
    loading: loadingIndividual,
    error: errorIndividual,
  } = usePredictSingleServers(date, hour);

  if (loading || loadingContext || loadingIndividual) {
    return <p>Cargando...</p>;
  }

  if (error || errorIndividual) {
    return <p>Error: {error}</p>;
  }

  if (hour === "Todo el día") {
    return <AllDayServers data={data} />;
  } else {
    return <SingleDayServers dataIndividual={dataIndividual} />;
  }
};

export default PicosServidores;
