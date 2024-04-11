import {useEffect, useState} from 'react'
import './App.css'
import WheatherDetails from './WheatherDetails'

import searchIcon from './assets/search.png'
import cloudyIcon from './assets/Cloudy.png'
import drizzleIcon from './assets/drizzle.png'
import snowIcon from './assets/snow.png'
import sunnyIcon from './assets/sunny.png'
import RainyIcon from './assets/Rainy.png'
import clearIcon from './assets/Clearsky.png'

function App() {
 
   const [text,setText]=useState("Coimbatore");
    
   const[icon,setIcon]=useState(sunnyIcon)
   const[temp,setTemp]=useState(0)
   const[place,setplace]=useState("Coimbatore")
   const[country,setCountry]=useState("IN")
   const[lat,setLat]=useState(0)
   const[lon,setLon]=useState(0)
   const[humidity,setHumidity]=useState(0)
   const[wind,setWind]=useState(0)
   const[error,seterror]=useState(null)

  const[loading,setLoading]=useState(false)
  const [citynotfound,setcitynotfound]=useState(false)

  const weatherIconMap={
   "01d":clearIcon,
   "01n":clearIcon,
   "02d":cloudyIcon,
   "02n":cloudyIcon,
   "03d":drizzleIcon,
   "03n":drizzleIcon,
   "04d":drizzleIcon,
   "04n":drizzleIcon,
   "09d":RainyIcon,
   "09n":RainyIcon,
   "10d":RainyIcon,
   "10n":RainyIcon,
   "13d":snowIcon,
   "13n":snowIcon,
  }

   const search=async()=>{
    let api_Key="Paste Your Api Key";
    setLoading(true);
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_Key}&units=Metric`;

    try{
       
      let res=await fetch(url)//Not in Readable form;
      let data=await res.json();

      if(data.cod=="404")
      {
        console.error("City not found");
        setcitynotfound(true)
        setLoading(false)
        return;
      }
     setHumidity(data.main.humidity)
     setWind(data.wind.speed);
     setTemp(Math.floor(data.main.temp));//converts into integer number;
      setplace(data.name);
      setCountry(data.sys.country);
     setLat(data.coord.lat);
     setLon(data.coord.lon);
     const weatherIconcode=data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconcode]||clearIcon)
      setcitynotfound(false);
      // setText(" ");
    }catch(err)
    {
      seterror(err.message)
    console.log("An error Occured",err.message)
    }
    finally{
     setLoading(false)
    }
  }
  const handlekeydown=(e)=>{
    if(e.key=="Enter")
    {
      search();
    }
  }
   
  useEffect(()=>{
    search();
  },[])

  return (
    <>
      <div className='container'>
        <div className="input-container">
          <input text="text" className='cityinput' placeholder='Search City' value={text}onChange={(e)=>{setText(e.target.value)}}
          onKeyDown={handlekeydown}/>
          <div className="search-icon"onClick={()=>search()}>
            <img src={searchIcon} alt='Search'/>
          </div>
        </div>
        
        {loading&&<div className="loading-message">
          Loading...
        </div>}
        {error&&<div className="error-message">
         {error}
        </div>}
      
        {citynotfound&&<div className="city-not-found">
         City not found
        </div>}
        {!loading&&!citynotfound &&<WheatherDetails icon={icon} temp={temp}place={place} country={country} lat={lat} lon={lon} humidity={humidity} wind={wind}/>}

        <p className="owner">Designed by <span>Surendar KS</span></p>
      </div>
     
    </>
  )
}

export default App
