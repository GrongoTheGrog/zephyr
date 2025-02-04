import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Chart as ChartJS } from "chart.js";
import { Line } from "react-chartjs-2";

import 'weather-icons/css/weather-icons.css'

import './wheather.css';

export function Weather(){

    const {city} = useParams();
    //const [data, setData] = useState();

    const [celcius, setCelcius] = useState(true);

    function toF(value){
        return (value * (9/5)) + 32;
    }

    /*useEffect(() => {
        let lat;
        let lon;

        const getData = async () => {
            try{
                const responseCoords = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=3&appid=${process.env.REACT_APP_API_KEY}`);

                if (!responseCoords.ok) {
                    throw new Error('Failed to fetch city coordinates');
                }

                let data = await responseCoords.json();

                console.log(data[0].lat)

                lat = data[0].lat;
                lon = data[0].lon;
                const responseData = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&units=metric&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`);

                data = await responseData.json();
                console.log(data)

                setData(() => data)

            }catch(err){
                console.log(err)
            }
        }

        getData();
    }, [])
    }*/


    const data = {
        "coord": {
           "lon": 7.367,
           "lat": 45.133
        },
        "weather": [
           {
              "id": 501,
              "main": "Rain",
              "description": "moderate rain",
              "icon": "10d"
           }
        ],
        "base": "stations",
        "main": {
           "temp": 284.2  - 273,
           "feels_like": 282.93 - 273,
           "temp_min": 283.06  - 273,
           "temp_max": 286.82  - 273,
           "pressure": 1021,
           "humidity": 60,
           "sea_level": 1021,
           "grnd_level": 910
        },
        "visibility": 10000,
        "wind": {
           "speed": 4.09,
           "deg": 121,
           "gust": 3.47
        },
        "rain": {
           "1h": 2.73
        },
        "clouds": {
           "all": 83
        },
        "dt": 1726660758,
        "sys": {
           "type": 1,
           "id": 6736,
           "country": "IT",
           "sunrise": 1726636384,
           "sunset": 1726680975
        },
        "timezone": 7200,
        "id": 3165523,
        "name": "Province of Turin",
        "cod": 200
     }     
     
     

    return (
        <section className="weather-container">
            {!data ? <h1> LOADING... </h1> : 
            <section className="weather-info-container">
                <div className="title-weather">
                    <span>{city}</span>
                    <span>20:20</span>

                </div>

                <div className="info-weather">
                    <div className="temperature">
                        <div className="choose">
                            <span 
                                className={`choose-span ${celcius && 'active-unit'}`}
                                onClick={() => setCelcius(prev => !prev)}
                                >
                                C
                            </span>
                            <span 
                                className={`choose-span ${!celcius && 'active-unit'}`}
                                onClick={() => setCelcius(prev => !prev)}
                                >
                                F
                            </span>
                        </div>

                        <div className="temperature-display">
                            <span className="main-temperature">
                                {celcius ? `${data.main.temp.toFixed(1)}ºC` : `${toF(data.main.temp).toFixed(1)}ºF`}
                            </span>

                            <span className="max-temperature">
                                Feels like: {celcius ? `${data.main.feels_like.toFixed(1)}ºC` : `${toF(data.main.feels_like).toFixed(1)}ºF`}
                            </span>

                            <span className="max-temperature">
                                Max: {celcius ? `${data.main.temp_max.toFixed(1)}ºC` : `${toF(data.main.temp_max).toFixed(1)}ºF`}
                            </span>

                            <span className="max-temperature">
                                Min: {celcius ? `${data.main.temp_min.toFixed(1)}ºC` : `${toF(data.main.temp_min).toFixed(1)}ºF`}
                            </span>
                        </div>
                    </div>

                    <div className="weather-icon">
                        <img></img>
                    </div>
                </div>
            </section>
            }
        </section>
    )
}