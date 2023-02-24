import { Position, Weather, WeatherProps } from "@/types";

export interface WeatherInfoProps {
    props: { position: Position, weather: Weather }
    onChangeCity : (weatherInfo: WeatherProps)=> void
}

export interface CitieJson {
    country: string
    created_at: string
    id: number
    lat: number
    lng: number
    name: string
    updated_at: string
}