const weatherApp = {
    init: () => {
      document
        .getElementById('btnGet')
        .addEventListener('click', weatherApp.fetchWeather);
      document
        .getElementById('btnCurrent')
        .addEventListener('click', weatherApp.getLocation);
    },
    fetchWeather: () => {
  
      let lat = document.getElementById('latitude').value;
      let lon = document.getElementById('longitude').value;
      let key = 'e3734cbb56b89b904559b3338d8b8282';
      let lang = 'en';
      let units = 'imperial';
      let url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + key + "&units=" + units + "&lang=" + lang + "";
  
      fetch(url)
        .then((resp) => {
          if (!resp.ok) throw new Error(resp.statusText);
          return resp.json();
        })
        .then((data) => {
          weatherApp.showWeather(data);
        })
        .catch(console.err);
    },
    getLocation: () => {
      let opts = {
        enableHighAccuracy: true,
        timeout: 1000 * 10,
        maximumAge: 1000 * 60 * 5,
      };
      navigator.geolocation.getCurrentPosition(weatherApp.ftw, weatherApp.wtf, opts);
    },
    ftw: (position) => {
  
      document.getElementById('latitude').value =
        position.coords.latitude.toFixed(2);
      document.getElementById('longitude').value =
        position.coords.longitude.toFixed(2);
    },
    wtf: (err) => {
  
      console.error(err);
    },
    showWeather: (resp) => {
      console.log(resp);
      let row = document.querySelector('.weather-data');
  
      row.innerHTML = resp.daily
        .map((day, index) => {
          if (index <= 4) {
            let dt = new Date(day.dt * 1000);
            let sr = new Date(day.sunrise * 1000).toTimeString();
            let ss = new Date(day.sunset * 1000).toTimeString();
            return `<div class="col">
                  <div class="card">
                  <h5 class="card-title">${dt.toDateString()}</h5>
                    <img
                      src="http://openweathermap.org/img/wn/${day.weather[0].icon
              }@4x.png"
                      class="card-img-top"
                      alt="${day.weather[0].description}"
                    />
                    <div class="card-content">
                      <h3 class="card-title">${day.weather[0].main}</h3>
                      <p>High ${day.temp.max}&deg;F Low ${day.temp.min
              }&deg;F</p>
                      <p>High Feels like ${day.feels_like.day
              }&deg;F</p>
                      <p>Pressure ${day.pressure}Pa</p>
                      <p>Humidity ${day.humidity}%</p>
                      <p>UV Index ${day.uvi}</p>
                      <p>Precipitation ${day.pop * 100}%</p>
                      <p>Dewpoint ${day.dew_point}</p>
                      <p>Wind ${day.wind_speed}mph, ${day.wind_deg
              }&deg;</p>
                      <p>Sunrise ${sr}</p>
                      <p>Sunset ${ss}</p>
                    </div>
                  </div>
                </div>
              </div>`;
          }
        })
        .join(' ');
    },
  };
  weatherApp.init()