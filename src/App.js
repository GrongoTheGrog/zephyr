import { useEffect, useState } from 'react';
import './App.css';
import {Header} from './components/header/header';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Weather } from './components/weather/wheather';

import { ToggleSearch } from './components/toggleSearch/toggleSearch';
import { Search } from './components/search/search';

function App() {

  const navigate = useNavigate();

  const [city, setCity] = useState();

  useEffect(() => {
    if (window.location.pathname !== '/'){
      localStorage.setItem('lastPage', window.location.pathname);
    }
  }, [])


  useEffect(() => {
    const city = localStorage.getItem('city');
    if (city) {
      const lastPage = localStorage.getItem('lastPage') || `/places/${city}`;
      navigate(lastPage);
      return
    }

    if ('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition((postion) => {

        fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${postion.coords.latitude}&lon=${postion.coords.longitude}&appid=${process.env.REACT_APP_API_KEY}`)
        .then(response => response.json())
        .then(data => {
          localStorage.setItem('city', data[0].name)

          setCity(() => data[0].name);
          const lastPage = localStorage.getItem('lastPage') || `/places/${data[0].name}`;
          navigate(lastPage);
        })

        
      },

      (error) => {
        console.log('Error, getting the location: ', error.message)
      }
    )
    }
  }, [])
  

  console.log(city)


  return (
    <main>
      <Header />

      <ToggleSearch city={city}/>

      <Routes>
        <Route path='/places/:city'  element={<Weather />}/>
        <Route path='/search'    element={<Search />}/>
      </Routes>

    </main>
  )
}

export default App;
