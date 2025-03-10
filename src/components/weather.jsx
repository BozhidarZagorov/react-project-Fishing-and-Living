import React, { useState } from "react";

export default function Weather() {
    // fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/dospat?unitGroup=metric&elements=datetime%2CdatetimeEpoch%2Cname%2Ctempmax%2Ctempmin%2Ctemp%2Chumidity%2Csnow%2Cwindspeed%2Cwindspeedmax%2Cwindspeedmin%2Cwinddir%2Cpressure%2Cuvindex%2Csunrise%2Csunset%2Cconditions%2Cdescription%2Cicon&include=days%2Chours%2Calerts%2Ccurrent&key=LQCFA6SWM9Q5TPK4T79HSX2U7&contentType=json", {
    //     "method": "GET",
    //     "headers": {
    //     }
    //     })
    //   .then(res => res.json())
    //   .then(res => console.log(res))
    //   .catch(err => {
    //     console.error(err);
    //   });


  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&elements=datetime%2CdatetimeEpoch%2Cname%2Ctempmax%2Ctempmin%2Ctemp%2Chumidity%2Csnow%2Cwindspeed%2Cwindspeedmax%2Cwindspeedmin%2Cwinddir%2Cpressure%2Cuvindex%2Csunrise%2Csunset%2Cconditions%2Cdescription%2Cicon&include=days%2Chours%2Calerts%2Ccurrent&key=LQCFA6SWM9Q5TPK4T79HSX2U7&contentType=json`);
      if (!response.ok) throw new Error("City not found");

      const data = await response.json();
      setWeather(data);
      console.log(data);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6"
    style={{
      background: `linear-gradient(135deg,rgb(120, 158, 233) 25%,rgb(209, 121, 26) 75%)`,
    }}>
      <h1 className="text-3xl font-bold mb-4 rounded-md shadow-md border-2 bg-gray-800"
      style={{
        background: `linear-gradient(135deg,rgb(93, 138, 227) 25%,rgb(227, 155, 79) 75%)`,
      }}
      >🌙 City Weather 🌤</h1>

      <div className="flex space-x-2">
        <input
          type="text"
          className="p-2 text-white rounded-md outline-none border-2 border-gray-800"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="btn-orange"
          onClick={fetchWeather}
        >
          Get Weather
        </button>
      </div>

      {loading && <p className="mt-4 text-yellow-300">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {weather && (
        <div
          className="mt-6 p-4 rounded-lg shadow-md text-center border-2 border-bg-gray-800"
          style={{
          background: "linear-gradient(135deg,rgb(244, 171, 62) 40%,rgb(94, 141, 244) 100%)",
        }}>

            
          <h2 className="text-2xl font-semibold text-gray-900">{weather.resolvedAddress}</h2>
          <p className="text-lg">{weather.currentConditions.conditions}</p>
          <img src={weather.currentConditions.icon} alt="Weather Icon" className="mx-auto" />
          <p className="text-3xl font-bold">{weather.currentConditions.temp}°C</p>
        </div>
      )}
    </div>
  );

}





//! todo check both sites weatherapi.com / visualcrossing.com
//! same email and pass for both bojom and 123