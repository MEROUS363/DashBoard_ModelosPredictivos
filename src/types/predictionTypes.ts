export type PredicitionByHour ={
    [key: string]: number;
}

export type CommonInputDateandTime = {
    fecha: string;
    hora: string;
}

export type CommonOutputResultsFromAzure = {
    Results: number[];
}

export type CommonInputDate = {
    fecha: string;
}

export type CommonResponse = {
    data: number;
}