import './search.css';
import blackSearch from '../../assets/search-black.svg';
import whiteSearch from '../../assets/search-white.svg';
import { useDefinitions } from '../../siteDefinitions';
import { use, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Weather } from '../weather/wheather';

const searchIcon = [blackSearch, whiteSearch];

export function Search() {

    const [data, setData] = useState(null);
    const [inputData, setInputData] = useState('');

    async function click(event){
        event.preventDefault();
        const form = new FormData(event.target);
        const city = form.get('inputSearch').trim();

        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=10&appid=${process.env.REACT_APP_API_KEY}`);

        const json = await response.json();
        const cityObject = {};
        
        json.forEach((city, index) => {
            if (!cityObject[city.name]){
                cityObject[city.name] =  (
                    <CityCard city={city.name} country={city.country} key={index}/>
                );
            }
        })

        const values = Object.values(cityObject);
        setData(values);
    }

    const {theme} = useDefinitions();

    return (
        <section className='search-container'>
            <form className='form-search' onSubmit={click}>
                <input 
                    name='inputSearch'
                    value={inputData}
                    className='input-search' 
                    placeholder='E.g.: São Paulo'
                    onChange={(event) => setInputData(event.target.value)}
                >
                    
                    </input>
                <button className='button-search'> 
                    <img src={searchIcon[theme.data ? 1 : 0]}></img>
                </button>
            </form>


            {
            data &&
            <div className='result-container'>
                {data}
            </div>}
        </section>
    )
}

function CityCard(props) {

    const navigator = useNavigate()

    function clickCard(){
        navigator(`/places/${props.city}`)
    }
    
    const {theme} = useDefinitions();
    
    return (
        <div className='city-card' onClick={clickCard}>
            <span className='span-city'>{props.city}</span>
            <span className='span-country'>{props.country}</span>
            <img src={searchIcon[theme.data ? 1 : 0]} className='image-card'></img>
        </div>
    )
}