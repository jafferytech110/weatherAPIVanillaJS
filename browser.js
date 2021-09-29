window.addEventListener("load", () => {
  let longitude;
  let latitude;
  let appid = "7a46d86e664e237e06c690001e0374a6";
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;

      const weatherApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${appid}`;
      fetch(weatherApi)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          //getting current temperature
          const { temp } = data.current;
          //getting summary of weather such as cloudy
          const summary = data.current.weather[0].description;
          //setting DOM elements from API
          temperatureDegree.textContent = Math.round(temp - 273.15);
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          // icon = data.current.weather[0].icon;
          document.querySelector(
            "#weatherIcon"
          ).src = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
        });
    });
  }
});

webView
  .getSettings()
  .setGeolocationDatabasePath(context.getFilesDir().getPath());
