//images
import React from 'react'

import windIcon from './assets/Wind.png'


import humidityIcon from './assets/Humidity.png'



function WheatherDetails({icon,temp,place,country,lat,lon,humidity,wind}) {
  return (
    <>
    <div className='image'>
        <img src={icon} alt='image'/>
    </div>
    <div className="temp">{temp}°C</div>
      <div className="location">{place}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className='lat'>Lattitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className='lan'>Longittude</span>
          <span>{lon}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidityIcon} alt="" className='icon'/>
          <div className="data">
            <div className="humidity-percent">{humidity}%</div>
              <div className="text">Humidity</div>
           
          </div>
        </div>
        <div className="element">
          <img src={windIcon} alt="" className='icon' />
          <div className="data">
            <div className="wind-percent">{wind} km/h</div>
              <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  )

}

export default WheatherDetails;