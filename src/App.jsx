import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import { Weather } from './nerdyStuff/weatherDatafetch.jsx'

function HomeSearch(){
  const inputRef = useRef(null);
  const [input, setInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const apiKey = "c627827a75f149958c8150053240809";
  const navigate = useNavigate();

  useEffect(() => {
    if(input !== ""){
  fetch(`http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${input}`)
    .then(response => response.json())
    .then(data => {
          setSearchResult(data);
        })
    .catch(error => console.error(error))
    }
   return ; 
  },[input]);

  const handleChange = () => {
    setInput(inputRef.current.value);
  }

  const handleClick = (locationName) => {
    navigate(`weather/${locationName}`)
  }

    return (
      <div className="heroPage">
        <div className={`heroContainer`}>
            <input 
              onChange={handleChange} 
              className="heroInput" 
              type="text" 
              spellCheck="false" 
              placeholder="search for a city" 
              maxLength="15"
              ref={inputRef}/>
            {
              searchResult != null ?
              Object.entries(searchResult).map(([item, value]) => (
                <div 
                  key={item} 
                  className="searchResult" 
                  onClick={() => handleClick(value.name)}
                >
                    <p>{value.name}</p>
                    <p>{value.country}</p>
                </div>
              ))
              :
              ""
            }
        </div>
      </div>
    )
}

export default function App(){

  return (
  <Router>
      <Routes>
        <Route path="/" element={<HomeSearch />}/>
        <Route path="/weather/:location"  element={<Weather />} />
      </Routes>
    </Router>
  );
};
