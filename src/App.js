import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';


function App() {

  const [latitude, setLatitude] = useState(0)
  const [longitude, setLogitude] = useState(0)
  const [weather, setWeather] = useState('')
  const [temperature, setTemperature] = useState(0)
  const [cityName, setCityName] = useState('')
  const [country, setCountry] = useState('')
  const [description, setDescription] = useState('')
  const [icon, setIcon] = useState('01d')
  const [isCelsious, setIsCelsious] = useState(false)
  
//Guarda las coordenadas de la posicion
  const savePosition = (position) => {
    setLatitude(position.coords.latitude)
    setLogitude(position.coords.longitude)
  }

  //Función para obtener el clima mediante la geolocalización del navegador y también para consumir la API
  const getWeather = async () => {
    try {
      window.navigator.geolocation.getCurrentPosition(savePosition)
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=9df25bb9cc9da2ba4ca899f44f753b3b&units=metric`
      const res = await axios.get(url)
      setTemperature(res.data.main.temp)
      setCityName(res.data.name)
      setCountry(res.data.sys.country)
      setWeather(res.data.weather[0].main)
      setDescription(res.data.weather[0].description)
      setIcon(res.data.weather[0].icon)
      
      
    } catch (error) {
      console.error(error);
    }
    }
  

    useEffect(() => {
      getWeather(latitude, longitude)
    }, [latitude, longitude])
    

    //Función para generar la fecha actual
    const dateBuilder = (d) => {

      let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
      let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

      let day = days[d.getDay()]
      let date = d.getDate()
      let month = months[d.getMonth()]
      let year = d.getFullYear()

      return `${day} ${date} ${month} ${year}`
    }

    //Función que realiza el cambio de °C a °F y viceversa
    const handlerOnChange = (e) => {
      setTemperature(Number(e.target.value))
    }

  return(

    //Rederizado condicional para cambiar el fondo dependiendo de a que temperatura este. Se establecio para mayor de 20° 
    <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp < 20) ? 'App cold' : 'App') : 'App'}>
       <div className="app__container">

            <img src={`http://openweathermap.org/img/wn/${icon}@4x.png`} alt="Icon" />
        <div className="location-box">
          <div className="location">{cityName}, {country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp" onChange={handlerOnChange}>
          {isCelsious ?  (temperature * 9/5 ) + 32: temperature } {
            isCelsious ? '°F' : '°C'}
          </div>
          <div className="btn">
          <button onClick={() => setIsCelsious(!isCelsious)}>Cambiar a {isCelsious? 'Centigrados' : 'Farenheit'}</button>
          </div>
          <div className="weather">{weather}</div>
          <div className="description">{description}</div>
        </div>
      </div>
    </div>
  );
  }
  

export default App;
