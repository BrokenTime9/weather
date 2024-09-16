import { useState, useEffect } from "react";
import { FaRegSun, FaSun, FaMoon, FaRegMoon } from "react-icons/fa6";
import './weatherDatafetch.css';  
import { useParams } from "react-router-dom";

export function Weather(){
  const {location} = useParams();
  const [weather, setWeather] = useState(null);
  const apiKey = "c627827a75f149958c8150053240809";
  const [isDay, setIsDay] = useState(1);

  useEffect(() =>{

    if(location !== ""){
      fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`)
        .then(response  => response.json())
        .then((data) => {
          setWeather(data);
          setIsDay(data.current.is_day);
        })
          .catch(error => console.error(error))
    }
    
    return;
    
  },[location]);


  if(weather !== null){
    
    const {name, region, country, lat, lon,localtime} = weather.location;
    const {last_updated, temp_c, is_day, wind_mph, wind_dir, precip_mm, humidity, uv} = weather.current;
    const { text } = weather.current.condition;
    const local = localtime.toString().slice(11,13);
    const style = {
      '--primary' : `${backgroundColor(local,temp_c).primary}`,
      '--secondary' : `${backgroundColor(local,temp_c).secondary}`,
      '--accent' : `${backgroundColor(local,temp_c).accent}`
    };

      return(
      <div className="resultPage" style={style}>
        <div className="innerContainer">
        <div className="resultNav"> 
          <div>Home</div>
          <div><p>{localtime.toString().slice(11)
          }</p></div>
          <div className="circles">
              
          </div>
          <div className="resultDate">
            <p>{getDate(localtime)} {getMonth(localtime)} </p> 
            <div className="resultDateSub">
              <p> {getYear(localtime)}</p>
              <p>Date</p>
            </div> 
          </div>
          <div className="resultForecast">Forecast</div>
        </div>
        <div className="midResult">
          <div className="resultText">
            <h2 className="threeRem">{text}</h2>
            <p>precipitation : {precip_mm} mm</p>
            <p>humidity : {humidity}</p>
            <h4>{name}</h4>
            <h4>{region},  {country}</h4>
            
          </div>
          <div className="resultTemp">
            <div className="resultTempColumnOne">
                <p className="dots">...</p>
                <div className="cords">
                <p className="cordsOne">lat:{lat}</p>
                <p className="cordsTwo">long:{lon}</p>
                </div>
                <span></span>

            </div>

            <div className="resultTempColumnTwo">
            <p className="sixRem">{temp_c}°</p>
            <p>Wind : {wind_dir} {wind_mph} MPH</p>
            <p>UV INDEX : {uv} OUT OF 10</p>
            <p>{region}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="resultHourForecast">Forecast</div>
        </div>
        </div>
      </div>
      );
  }
  return<p>Loading...............</p>;
}

function getMonth(num) {
  const months = {
    "01" :  "Jan",
    "02" :  "Feb",
    "03" :  "Mar",
    "04" :  "Apr",
    "05" :  "May",
    "06" :  "Jun",
    "07" :  "Jul",
    "08" :  "Aug",
    "09" :  "Sep",
    "10" :  "Oct",
    "11" :  "Nov",
    "12" :  "Dec"
  }

  const month = num.toString().slice(5,7);


  return months[month];
}

function getDate(num) {

  const date = num.toString().slice(8,11);

  return date;
}

function getYear(num){

  const year = num.toString().slice(0,4);
  return year;
}

function getTimeOfTheDay(local){
  if(local >= 6 && local < 12) return "morning";
  if(local >= 12 && local < 18) return "afternoon";
  if(local >= 18 && local < 21) return "evening";
  return "night";
}

function getTemp(temp){
  if(temp >= 30) return "hot";
  if(temp >= 20 && temp < 30) return "warm";
  if(temp >= 10 && temp < 20) return "mild";
  if(temp >= 0 && temp < 10) return "cool";
  return "cold";
}

function backgroundColor(local,temp) {

const timeTemperatureColors = {
  hot: {
    morning: {
      primary: "#F28C28",  // Warm Orange
      secondary: "#F4A261", // Light Peach
      accent: "#4A3C2D"    // Dark Earthy Brown
    },
    afternoon: {
      primary: "#E76F51",  // Muted Coral
      secondary: "#FFDDC1", // Soft Peach
      accent: "#4A3C2D"    // Dark Earthy Brown
    },
    evening: {
      primary: "#F28C28",  // Warm Orange
      secondary: "#F4A261", // Light Peach
      accent: "#4A3C2D"    // Dark Earthy Brown
    },
    night: {
      primary: "#8B5E34",  // Deep Bronze
      secondary: "#3A506B", // Slate Blue
      accent: "#EAEAEA"    // Soft Silver
    }
  },
  warm: {
    morning: {
      primary: "#F4D35E",  // Sunflower Yellow
      secondary: "#FAE1DD", // Soft Peach
      accent: "#264653"    // Deep Green Blue
    },
    afternoon: {
      primary: "#F4A261",  // Warm Peach
      secondary: "#F6DFA7", // Soft Gold
      accent: "#264653"    // Deep Green Blue
    },
    evening: {
      primary: "#E9C46A",  // Golden Yellow
      secondary: "#F4A261", // Warm Peach
      accent: "#264653"    // Deep Green Blue
    },
    night: {
      primary: "#5C574F",  // Warm Grey
      secondary: "#264653", // Deep Green Blue
      accent: "#EAEAEA"    // Soft Silver
    }
  },
  mild: {
    morning: {
      primary: "#B5E48C",  // Soft Green
      secondary: "#D9E5D6", // Light Mint
      accent: "#3D405B"    // Slate Blue
    },
    afternoon: {
      primary: "#83C5BE",  // Muted Aqua
      secondary: "#E4F9F5", // Soft Mint
      accent: "#3D405B"    // Slate Blue
    },
    evening: {
      primary: "#6D6875",  // Muted Lavender
      secondary: "#B5838D", // Warm Mauve
      accent: "#3D405B"    // Slate Blue
    },
    night: {
      primary: "#3D405B",  // Slate Blue
      secondary: "#6D6875", // Muted Lavender
      accent: "#EAEAEA"    // Soft Silver
    }
  },
  cool: {
    morning: {
      primary: "#A8DADC",  // Light Sky Blue
      secondary: "#E0FBFC", // Soft Ice Blue
      accent: "#003D34"    // Deep Teal
    },
    afternoon: {
      primary: "#98C1D9",  // Muted Blue
      secondary: "#CDEFFF", // Pale Aqua
      accent: "#003D34"    // Deep Teal
    },
    evening: {
      primary: "#457B9D",  // Slate Blue
      secondary: "#D3DFF8", // Light Denim
      accent: "#003D34"    // Deep Teal
    },
    night: {
      primary: "#1D3557",  // Deep Navy
      secondary: "#4A4E69", // Muted Purple Grey
      accent: "#EAEAEA"    // Soft Silver
    }
  },
  cold: {
    morning: {
      primary: "#BFD7EA",  // Soft Frost Blue
      secondary: "#F1FAEE", // Soft White
      accent: "#003D34"    // Deep Teal
    },
    afternoon: {
      primary: "#8D99AE",  // Cool Grey Blue
      secondary: "#F1F4F9", // Pale Blue
      accent: "#003D34"    // Deep Teal
    },
    evening: {
      primary: "#4A4E69",  // Muted Purple Grey
      secondary: "#B0A8B9", // Soft Lavender
      accent: "#003D34"    // Deep Teal
    },
    night: {
      primary: "#1D2D44",  // Dark Navy
      secondary: "#2C363F", // Charcoal
      accent: "#EAEAEA"    // Soft Silver
    }
  }
};
  const time = getTimeOfTheDay(local);
  const temperature = getTemp(temp);

  return timeTemperatureColors[temperature][time]; 
}
