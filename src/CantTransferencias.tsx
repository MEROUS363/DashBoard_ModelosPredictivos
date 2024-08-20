const Cant=20;
const Cant2=10;


const CantTransd = () => {
  return (
    <div className=" ">
        <h1 className="text-lg font-bold text-emerald-700 text-center p-2">Cantidad de Transferencia</h1>
        <div className="flex gap-4 justify-center m-2 ">
        <div className="p-4 bg-white rounded-lg shadow-lg w-80  flex flex-col items-center justify-center transition-transform transform hover:scale-105">
            <h2 className="text-lg font-bold text-emerald-700 text-center">SPI x Corte</h2>
            <div className="flex items-center justify-center w-28 h-28 m-3 p-1">
                <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-4xl font-bold text-primary">{Cant}</div>
                    </div>
                    <div className="absolute inset-0 rounded-full border-[10px]  border-gray-400" />
                </div>
            </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-lg w-80  flex flex-col items-center justify-center transition-transform transform hover:scale-105">
            <h2 className="text-lg font-bold text-emerald-700 text-center">Pago Directo Cash x Día</h2>
            <div className="flex items-center justify-center w-28 h-28 m-3 p-1">
                <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-4xl font-bold text-primary">{Cant2}</div>
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
