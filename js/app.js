window.addEventListener("load", () => {
  let lon;
  let lat;
  let locationName = document.querySelector(".location-name");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let temperatureDesc = document.querySelector(".temperature-description");
  let pageBackground = document.querySelector("body");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;
      //Fetch data from API
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2436e9791935423bbc9a4f3e0dc0bd93`;
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const name = data.name;
          const temp = data.main.temp;
          const desc = data.weather[0].main;
          let icon = data.weather[0].icon;
          console.log(icon);
          //Set DOM Elements from the API
          locationName.textContent = name;
          temperatureDegree.textContent = `${Math.floor(temp - 273.15)}°C`;
          temperatureDesc.textContent = desc;
          //Change background for night or day
          if (icon.includes("d")) {
            pageBackground.style.background =
              "linear-gradient(rgb(228, 215, 160), rgb(231, 153, 34))";
          } else {
            pageBackground.style.background =
              "linear-gradient(rgb(47, 150, 163), rgb(48, 62, 143))";
          }
          //Set icon for current weather
          if (icon === "01d") {
            icon = "CLEAR_DAY";
          } else if (icon === "01n") {
            icon = "CLEAR_NIGHT";
          } else if (icon === "02d") {
            icon = "PARTLY_CLOUDY_DAY";
          } else if (icon === "02n") {
            icon = "PARTLY_CLOUDY_NIGHT";
          } else if (
            icon === "03d" ||
            icon === "03n" ||
            icon === "04d" ||
            icon === "04n"
          ) {
            icon = "CLOUDY";
          } else if (
            icon === "09d" ||
            icon === "09n" ||
            icon === "10d" ||
            icon === "10n" ||
            icon === "11d" ||
            icon === "11n"
          ) {
            icon = "RAIN";
          } else if (icon === "13d" || icon === "13n") {
            icon = "SNOW";
          } else if (icon === "50d" || icon === "50n") {
            icon = "FOG";
          }
          setIcons(icon, document.querySelector(".icon"));
        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon;
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
