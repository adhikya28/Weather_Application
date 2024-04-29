const apiKey = "f4608f313ba22fc5dd1fc5ecbadbd679";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    

    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°c';
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + ' km/hr';

    switch (data.weather[0].main) {
      case "Clouds":
        weatherIcon.src = "images/clouds.png";
        break;
      case "Clear":
        weatherIcon.src = "images/clear.png";
        break;
      case "Rain":
        weatherIcon.src = "images/rain.png";
        break;
      case "Drizzle":
        weatherIcon.src = "images/drizzle.png";
        break;
      case "Mist":
        weatherIcon.src = "images/mist.png";
        break;
      default:
        weatherIcon.src = "images/clouds.png"; // Default image if weather condition not recognized
        break;
    }

    document.querySelector('.weather').style.display="block";

  } catch (error) {
    console.error('There was a problem fetching the weather data:', error);
    // Inform the user about the error (e.g., show an alert or update UI)
    document.querySelector('.city').innerHTML = "City not found";
    document.querySelector('.temp').innerHTML = "";
    document.querySelector('.humidity').innerHTML = "";
    document.querySelector('.wind').innerHTML = "";
    weatherIcon.src = ""; // Clear weather icon
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});


// Call the function to fetch and display weather data

