import { useEffect, useState } from 'react';
import './App.css';
import {Header} from './components/header/header';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Weather } from './components/weather/wheather';
import { Navigate } from 'react-router-dom';

import { ToggleSearch } from './components/toggleSearch/toggleSearch';
import { Search } from './components/search/search';

function App() {

  const navigate = useNavigate();

  const [city, setCity] = useState();

  useEffect(() => {
    if (window.location.pathname !== '/'){
      sessionStorage.setItem('lastPage', window.location.pathname);
    }
  }, [])


  useEffect(() => {
    const city = sessionStorage.getItem('city');
    if (city) {
      const lastPage = sessionStorage.getItem('lastPage') || `zephyr/places/${city}`;
      navigate(lastPage);
      return
    }

    if ('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition((postion) => {

        fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${postion.coords.latitude}&lon=${postion.coords.longitude}&appid=${process.env.REACT_APP_API_KEY}`)
        .then(response => response.json())
        .then(data => {
          sessionStorage.setItem('city', data[0].name)

          if (data[0].name) {
            setCity(() => data[0].name);
            const lastPage = sessionStorage.getItem('lastPage') || `zephyr/places/${data[0].name}`;
            navigate(lastPage);
          }
        }).catch(error => {
          console.error(error)
        })

        
      },

      (error) => {
        console.log('Error, getting the location: ', error.message)
      }
    )
    }
  }, [])
  


  return (
    <main>
      <Header />

      <ToggleSearch city={city}/>

      <Routes>
        <Route path='/zephyr'  element={<Navigate to={'/'} />}/>
        <Route path='/zephyr/places/:city'  element={<Weather />}/>
        <Route path='/zephyr/search'    element={<Search />}/>
      </Routes>

    </main>
  )
}

export default App;
