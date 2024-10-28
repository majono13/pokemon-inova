export interface IOpenWeatherMap {
    base: string;
    clouds: { all: number },
    cod: number;
    coord: ICoord;
    dt: number;
    id: number;
    main: IMain;
    name: string;
    sys: ISys;
    timezone: number;
    visibility: number;
    weather: IWeather[];
    wind: IWind;
}

export interface ICoord {
    lat: number;
    lon: number;
}

export interface IMain {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_max: number;
    temp_min: number;
}

export interface ISys {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
}

export interface IWeather {
    description: string;
    icon: string;
    id: number;
    main: string
}

export interface IWind {
    deg: number;
    speed: number
}