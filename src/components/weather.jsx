export default function Weather() {
    fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/dospat?unitGroup=metric&elements=datetime%2CdatetimeEpoch%2Cname%2Ctempmax%2Ctempmin%2Ctemp%2Chumidity%2Csnow%2Cwindspeed%2Cwindspeedmax%2Cwindspeedmin%2Cwinddir%2Cpressure%2Cuvindex%2Csunrise%2Csunset%2Cconditions%2Cdescription%2Cicon&include=days%2Chours%2Calerts%2Ccurrent&key=LQCFA6SWM9Q5TPK4T79HSX2U7&contentType=json", {
        "method": "GET",
        "headers": {
        }
        })
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => {
        console.error(err);
      });
      
}

