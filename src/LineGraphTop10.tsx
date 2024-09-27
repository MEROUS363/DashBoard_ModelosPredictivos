import { Line } from "react-chartjs-2";
import useTop10Graph, { Top10Output } from "./hooks/fetchTop10GraphHook";
import { max } from "date-fns";


interface LineGraphTop10Props {
    date: string;
}

const getHours = (data: Top10Output[]) => {
  return data.map((d) => d.hour);
}

const getScores = (data:Top10Output[]) => {
  return data.map((d) => Math.round(d.sumPrediction));
}

const getMaxScore = (data:Top10Output[]) => {
  const maxNumber = Math.max(...data.map((d) => Math.round(d.sumPrediction)));
  const hourOfmax = data.find((d) => Math.round(d.sumPrediction) === maxNumber);
  return hourOfmax;

  
}


export const LineGraphTop10:React.FC<LineGraphTop10Props>  = ({date}) => {

    
  const{data,error,loading} = useTop10Graph(date);

  if(loading){
      return <div>Cargando...</div>
  }
  if(error){
      return <div>Error al cargar los datos</div>
  }
  if(!data){
      return <div>No hay datos</div>
  }

  const hours = getHours(data);
  const scores = getScores(data);
  const hourOfmax  = getMaxScore(data);
    const chartData = {
        labels: hours,
        datasets: [
          {
            label: "Consumo Predicho",
            data: scores,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 2,
            tension: 0.1,
            fill: true,
          }
        ],
      };
    
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top" as const,
          },
          title: {
            display: true,
            text: "Cantidad de Transacciones",
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Horas",
            },
          },
          y: {
            title: {
              display: true,
              text: "Consumo",
            },
            beginAtZero: true,
          },
        },
      };

    return (
      <div className="flex bg-white max-w-[790px] h-[247px] m-6 shadow-xl rounded-lg">
      <div className="justify-center p-2 ml-10 h-[247px] w-full rounded-lg  bg-white">
        <Line data={chartData} options={options} />
      </div>
      <div>
      <h2 className="text-xl font-bold text-foreground text-emerald-700 pt-6">Pico máximo</h2>
        <p className="text-lg  ">
          {
            hourOfmax && <span className="font-bold">{Math.round(hourOfmax.sumPrediction)}</span>
          }
        </p>
      <h2 className="text-xl font-bold text-foreground text-emerald-700 pt-6">Hora</h2>
      <p className="text-lg  ">
      {
            hourOfmax && <span className="font-bold">{hourOfmax.hour}</span>
          }
        </p>
      </div>
    </div>
    );
}