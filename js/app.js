window.addEventListener("load", () => {
  let lon;
  let lat;
  let locationTimezone = document.querySelector(".location-timezone");
  let locationIcon = document.querySelector(".location-icon");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let temperatureDesc = document.querySelector(".temperature-description");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2436e9791935423bbc9a4f3e0dc0bd93`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const name = data.name;
          const temp = data.main.temp;
          const icon = data.weather[0].icon;
          const desc = data.weather[0].main;
          //Set DOM Elements from the API
          locationTimezone.textContent = name;
          locationIcon.setAttribute(
            "src",
            `http://openweathermap.org/img/wn/${icon}@2x.png`
          );
          temperatureDegree.textContent = `${Math.floor(temp - 273.15)}°C`;
          temperatureDesc.textContent = desc;
        });
    });
  }
});
