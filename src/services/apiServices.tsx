import { WEATHER_KEY } from "@/config/api";
import { Position, Weather } from "@/types";

const getWeather = ({ center: { lat, lng } }: Position) => {
  return new Promise<Weather>((resolve, reject) => {
    fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&units=metric&exclude=hourly,minutely,daily&appid=${WEATHER_KEY}`
    )
      .then((res) => res.json())
      .then((data) => resolve(data));
  });
};

export default getWeather;
