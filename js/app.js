window.addEventListener("load", () => {
  let lon;
  let lat;
  let locationName = document.querySelector(".location-name");
  let locationIcon = document.querySelector(".location-icon");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let temperatureDesc = document.querySelector(".temperature-description");
  let pageBackground = document.querySelector("body");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2436e9791935423bbc9a4f3e0dc0bd93`;

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
          locationName.textContent = name;
          locationIcon.setAttribute(
            "src",
            `http://openweathermap.org/img/wn/${icon}@2x.png`
          );
          temperatureDegree.textContent = `${Math.floor(temp - 273.15)}°C`;
          temperatureDesc.textContent = desc;
          if (icon.includes("d")) {
            pageBackground.style.background =
              "linear-gradient(rgb(228, 215, 160), rgb(231, 153, 34))";
          } else {
            pageBackground.style.background =
              "linear-gradient(rgb(47, 150, 163), rgb(48, 62, 143))";
          }
        });
    });
  }
});
