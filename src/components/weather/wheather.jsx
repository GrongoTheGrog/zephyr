import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
import { Line } from "react-chartjs-2";

import './wheather.css';

import {format} from 'date-fns';

ChartJS.register(
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement
);

export function Weather(){

    const {city} = useParams();
    const [data, setData] = useState();
    const [localTime, setLocalTime] = useState(null);
    const [iconCoded, setIconCoded] = useState(null);
    const [chart, setChart] = useState('Temperature')

    const optionRef = useRef();

    const [celcius, setCelcius] = useState(true);

    function toF(value){
        return (value * (9/5)) + 32;
    }

    useEffect(() => {
        let lat;
        let lon;

        const getData = async () => {
            try{
                const responseCoords = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=3&appid=${process.env.REACT_APP_API_KEY}`);

                if (!responseCoords.ok) {
                    throw new Error('Failed to fetch city coordinates');
                }

                let data = await responseCoords.json();

                lat = data[0].lat;
                lon = data[0].lon;
                const responseData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&cnt=3&units=metric&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`);

                data = await responseData.json();
                console.log(data)
                setData(() => data)

                const timezoneOffset = data.city.timezone; // Timezone in seconds
                setLocalTime(new Date(Date.now() + timezoneOffset * 1000));
            
                setIconCoded(data.list[0].weather[0].icon);


            }catch(err){
                console.log(err)
            }
        }

        getData();
    }, []) 

    const options = [
        {label: 'Temperature'},
        {label: 'Wind'},
        {label: 'Rain'}
    ]

    const iconMap = {
        '01d': `wi-day-sunny`,
        '02d': `wi-day-cloudy`,
        '03d': 'wi-cloud',
        '04d': 'wi-cloudy',
        '09d': `wi-day-rain`,
        '10d': `wi-day-rain`,
        '11d': 'wi-storm-showers',
        '01n': `wi-night-clear`,
        '02n': `wi-night-alt-cloudy`,
        '03n': 'wi-cloud',
        '04n': 'wi-cloudy',
        '09n': `wi-night-alt-hail`,
        '10n': `wi-night-alt-hail`,
        '11n': 'wi-storm-showers'
    }

    function toggleOption(){
        if (optionRef.current.classList.contains('active')) {
            optionRef.current.classList.remove('active');
        }else{
            optionRef.current.classList.add('active');
        }
    }

    function clickOption(event){
        optionRef.current.classList.remove('active');
        setChart(event.target.dataset.label);
    }

    return (
        <section className="weather-container">
            {!data ? <h1> LOADING... </h1> : 
            <section className="weather-info-container">
                <div className="title-weather">
                    <span>{city}</span>
                    <span>{format(localTime, 'HH:mm')}</span>

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
                                {celcius ? `${data.list[0].main.temp.toFixed(1)}ºC` : `${toF(data.list[0].main.temp).toFixed(1)}ºF`}
                            </span>

                            <span className="max-temperature">
                                Feels like: {celcius ? `${data.list[0].main.feels_like.toFixed(1)}ºC` : `${toF(data.list[0].main.feels_like).toFixed(1)}ºF`}
                            </span>

                            <span className="max-temperature">
                                Max: {celcius ? `${data.list[0].main.temp_max.toFixed(1)}ºC` : `${toF(data.list[0].main.temp_max).toFixed(1)}ºF`}
                            </span>

                            <span className="max-temperature">
                                Min: {celcius ? `${data.list[0].main.temp_min.toFixed(1)}ºC` : `${toF(data.list[0].main.temp_min).toFixed(1)}ºF`}
                            </span>
                        </div>
                    </div>

                    <div className="weather-icon-container">
                        <i className={`wi ${iconMap[iconCoded]} weather-icon`}></i>
                        <span className="weather-status">
                            {data.list[0].weather[0].main}
                        </span>
                    </div>

                    <div className="weather-extra-container">
                        <div className="extra-container" >
                            <span className="extra-title">
                                Humidity:
                            </span>
                            <span className="extra-info">
                                {data.list[0].main.humidity}%
                            </span>
                        </div>

                        <div className="extra-container">
                            <span className="extra-title">
                                Wind:
                            </span>
                            <div className="wind-container">
                                <span className="extra-info">
                                    {celcius ? (data.list[0].wind.speed * 4.2).toFixed(1) : (data.list[0].wind.speed * 2.23694).toFixed(1)} {celcius ? 'km/h' : 'mph'}
                                </span>
                                <i className={`wi wi-wind towards-${data.list[0].wind.deg}-deg wind-icon`}></i>
                            </div>
                        </div>
                    </div>


                    <div className="chart-container">
                        <div className="option-container">
                            <div className="current-option option" onClick={toggleOption}>
                                {chart}
                                <span style={{fontSize: '14px'}}>&#9660;</span>
                            </div>

                            <div className="option-dropdown" ref={optionRef}>
                                {options.map((option, index) => {
                                    return (
                                        <div className="pick-option option" key={index} data-label={option.label} onClick={clickOption}>
                                            {option.label}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>


                        <Line data={{
                            label: ['1pm', '4pm', '7pm', '10pm'],
                            datasets: [
                                {
                                    label: chart,
                                    data: [10, 30, 90, 10],
                                    backgroundColor: 'var(--font-color)',
                                    borderColor: 'var(--font-color)'
                                }
                            ]
                        }} options={{
                            responsive: false,
                            plugins: {
                                legend: {
                                    position: "bottom",
                                },
                                title: {
                                    display: false
                                }
                            }
                        }}></Line>
                    </div>
                </div>
            </section>
            }
        </section>
    )
}