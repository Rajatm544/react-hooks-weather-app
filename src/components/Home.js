import React, { useState } from "react";
import axios from "axios";

function Home() {
    const [city, setCity] = useState("");
    const [error, setError] = useState(false);
    const [weather, setWeather] = useState("");
    const apiBaseUrl = "http://api.weatherstack.com/";
    const apiKey = process.env.REACT_APP_API_KEY;

    const handleChange = (e) => {
        const { value } = e.target;
        setCity(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(city);
        axios
            .get(`${apiBaseUrl}current?access_key=${apiKey}&query=${city}`)
            .then((res) => {
                if (res.data.error) {
                    setError(true);
                } else {
                    setWeather({ ...res.data });
                }
            })
            .catch((err) => console.table(err));
    };

    return (
        <div className="ui center aligned container">
            <h2 className="ui header" onClick={() => window.location.reload()}>
                <div className="content">
                    <i aria-hidden="true" className="sun icon"></i>
                    Weather Of
                </div>
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="ui huge fluid icon input">
                    <input
                        className="icon input"
                        placeholder="Enter Your City..."
                        value={city}
                        onChange={handleChange}
                    />
                    <i
                        onClick={handleSubmit}
                        aria-hidden="true"
                        className="search circular inverted link icon"
                    ></i>
                </div>
            </form>
            {weather ? (
                <div className="ui compact raised segment">
                    <h3>{`Location: ${weather.location.name}, ${weather.location.region}, ${weather.location.country}`}</h3>
                    <h3>{`Weather description: ${weather.current.weather_descriptions.map(
                        (ele) => ele
                    )}.`}</h3>
                    <img
                        className="ui tiny centered rounded image"
                        src={weather.current.weather_icons[0]}
                        alt="weather icon"
                    />
                    <h3>{`Humidity: ${weather.current.humidity}%`}</h3>
                    <h3>{`Temperature: ${weather.current.temperature}°C`}</h3>
                    <h3>{`Actual feel: ${weather.current.feelslike}°C`}</h3>
                    <h3>{`Precipitation: ${weather.current.precip}mm`}</h3>
                    <h3>{`Cloud cover: ${weather.current.cloudcover}%`}</h3>
                    <h3>{`Wind: ${weather.current.wind_speed} kmph, ${weather.current.wind_degree}°${weather.current.wind_dir}`}</h3>
                </div>
            ) : error ? (
                <div className="ui negative big message">
                    <div className="header">
                        {`Sorry, we weren't able to find the weather for '${city}'.`}
                    </div>
                    <p>Please try a different location.</p>
                </div>
            ) : (
                <div className="ui blue big message">
                    <div className="content">
                        <div className="header">{`Check the weather at your location.`}</div>
                        <p>{`Try typing in your city in the searchbox above!`}</p>
                    </div>
                </div>
            )}
            <footer>
                <a href="https://github.com/Rajatm544/react-hooks-weather-app">
                    Created by Rajat
                </a>
            </footer>
        </div>
    );
}

export default Home;
