export const convertToISO = (dateString:string) => {
    // Dividimos la cadena de entrada en mes, día y año
    const [monthStr, dayStr, yearStr] = dateString.split('/');
   
    // Convertimos las cadenas a números enteros
    const month = parseInt(monthStr, 10) - 1; // Meses de 0 a 11
    const day = parseInt(dayStr, 10);
    const year = parseInt(yearStr, 10);
   
    // Validamos los componentes de la fecha
    if (isNaN(month) || isNaN(day) || isNaN(year)) {
        throw new Error('Fecha inválida. Asegúrate de que esté en formato mm/dd/yyyy.');
    }
   
    // Creamos una fecha en UTC estableciendo las horas en 00:00:00
    const dateUTC = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
   
    // Convertimos la fecha al formato ISO con 'Z' indicando UTC
    const isoString = dateUTC.toISOString();
   
    return isoString;
   }