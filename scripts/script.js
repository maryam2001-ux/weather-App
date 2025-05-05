// html elements
const weatherForm = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");

const apiKey = "e3638473a0cba67892b0a8074ac32c25";

const cityDisplay = document.querySelector(".city-display");
const tempDisplay = document.querySelector(".temp-display");
const humidityDisplay = document.querySelector(".humidity-display");
const descriptionDisplay = document.querySelector(".description-display");
const errorDisplay = document.querySelector(".error-display");

weatherForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
      getWeatherData(city);
  } else {
      errorDisplay.textContent = "Please enter a city name";
  }
});

function getWeatherData(city) { 
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("City not found");
    }
    return response.json();
  })
  .then((data) => {
    const cityName = data.name;
    const temp = Math.round(data.main.temp - 273.15); 
    const humidity = data.main.humidity;
    const description = data.weather[0].description;

    cityDisplay.textContent = `City: ${cityName}`;
    tempDisplay.textContent = `Temperature: ${temp}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descriptionDisplay.textContent = `Description: ${description}`;
    errorDisplay.textContent = ""; 
  })
  .catch((error) => {
    console.error("Error fetching weather data:", error);
    cityDisplay.textContent = "";
    tempDisplay.textContent = "";
    humidityDisplay.textContent = "";
    descriptionDisplay.textContent = "";
    errorDisplay.textContent = error.message;
  });
}