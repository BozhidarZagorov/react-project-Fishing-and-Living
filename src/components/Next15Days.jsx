import React, { useState } from "react";

export default function Next15Days() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [lastCity, setLastCity] = useState(""); //last city

  const fetchWeather = async () => {
    if (!city || city === lastCity) return;
    setLoading(true);
    setError();
    setLastCity(city);

    try {
      const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&elements=datetime%2CdatetimeEpoch%2Cname%2Ctempmax%2Ctempmin%2Ctemp%2Chumidity%2Csnow%2Cwindspeed%2Cwindspeedmax%2Cwindspeedmin%2Cwinddir%2Cpressure%2Cuvindex%2Csunrise%2Csunset%2Cconditions%2Cdescription%2Cicon&include=days%2Chours%2Calerts%2Ccurrent&key=LQCFA6SWM9Q5TPK4T79HSX2U7&contentType=json`);
      if (!response.ok) throw new Error("City not found");

      const data = await response.json();
      setWeather(data.days);
      console.log(data.days);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 rounded-md shadow-md border-2 bg-gray-800 text-center"
      style={{
        background: `linear-gradient(135deg,rgb(93, 138, 227) 25%,rgb(227, 155, 79) 75%)`,
      }}
      >🌙 15-Days Weather Forecast 🌤</h1>

      <div className="flex space-x-4 justify-center">
        <input
          type="text"
          className="p-2 text-white rounded-md outline-none border-2 border-gray-800"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
        />
        <button
          className="btn-orange"
          onClick={fetchWeather}
        >
          Get Weather
        </button>
      </div>

      {loading && <div className="flex justify-center items-center spinner mt-5 h-32"></div>}
      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

      {weather && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
          {weather.map((day, index) => (
            <div
              key={index}
              className="p-3 rounded-lg shadow-md text-center border border-gray-700 bg-gray-900 text-white"
            >
              <h2 className="text-lg font-semibold">{day.datetime}</h2>
              <p className="text-sm">{day.conditions}</p>
              <img
                src={`${day.icon}.png`} // Replace with actual icon URL
                alt="Weather Icon"
                className="mx-auto w-10 h-10"
              />
              <p className="text-sm">🌡 {day.temp}°C</p>
              <p className="text-xs">💦 Humidity: {day.humidity}%</p>
              <p className="text-xs">💨 Wind: {day.windspeed} m/s</p>
              <p className="text-xs">⚖️ Pressure: {day.pressure} hPa</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}