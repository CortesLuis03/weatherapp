import { Position, Weather, WeatherProps } from "./types";

const POSITION: Position = {
    center: {
        lat: 0,
        lng: 0,
    },
    zoom: 0,
}

const WEATHER: Weather = {
    current: {
        dt: 0,
        temp: 0,
        feels_like: 0,
        humidity: 0,
        visibility: 0,
        wind_speed: 0,
        weather: [{
            id: 0,
            main: '',
            description: '',
            icon: '',
        }]
    }
}

export const EMPTY_CURRENT_INFO: WeatherProps = {
    position: POSITION,
    weather: WEATHER
}