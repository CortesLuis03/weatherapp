export interface Position {
    center: {
        lat: number,
        lng: number
    },
    zoom?: number
}

export interface Weather {
    current: {
        dt: number
        temp: number
        feels_like: number
        humidity: number
        visibility: number
        wind_speed: number
        weather: [{
            id: number
            main: string
            description: string
            icon: string
        }]
    }
}

export interface WeatherProps {
    position : Position
    weather : Weather
}