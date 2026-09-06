// Keep your existing API key line here
const apiKey = "c2e537d14d90d80aae8435a09c7dcc71"; //8b5f500fd0150e9ee3b0894a192680eb


// Random aesthetic background on page load

const backgroundImages = [
  "https://images.unsplash.com/photo-1594220862488-117b78382514",
  "https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875",
  "https://images.unsplash.com/photo-1476616853026-24c1f0309646"
];

const randomBackground =
  backgroundImages[Math.floor(Math.random() * backgroundImages.length)];

document.body.style.backgroundImage = `url(${randomBackground})`;
document.body.style.backgroundSize = "cover";
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.backgroundPosition = "center center";


// Get Weather

function getWeather() {

  const cityInput = document.getElementById("cityInput");
  const resultDiv = document.getElementById("weatherResult");

  const city = cityInput.value.trim();


  // Check for empty input

  if (!city) {

    resultDiv.classList.remove("hidden");

    resultDiv.innerHTML = `
      <p>Please enter a city name.</p>
    `;

    return;
  }


  // OpenWeather API URL

  const url =
    `https://api.openweathermap.org/data/2.5/weather` +
    `?q=${encodeURIComponent(city)}` +
    `&appid=${apiKey}` +
    `&units=metric`;


  // Loading message

  resultDiv.classList.remove("hidden");

  resultDiv.innerHTML = `
    <p>Loading weather...</p>
  `;


  fetch(url)

    .then(response => {

      if (!response.ok) {
        throw new Error("Weather data could not be fetched.");
      }

      return response.json();

    })

    .then(data => {

      const condition = data.weather[0].main.toLowerCase();

      let bgUrl = "";


      // Change background according to weather

      if (condition.includes("cloud")) {

        bgUrl =
          "https://plus.unsplash.com/premium_photo-1667143327769-1c36fd30a7c6";

      }

      else if (condition.includes("rain")) {

        bgUrl =
          "https://images.unsplash.com/photo-1640600997533-1b44078d394b";

      }

      else if (
        condition.includes("clear") ||
        condition.includes("sun")
      ) {

        bgUrl =
          "https://images.unsplash.com/photo-1419833173245-f59e1b93f9ee";

      }

      else if (
        condition.includes("snow") ||
        condition.includes("cold")
      ) {

        bgUrl =
          "https://images.unsplash.com/photo-1484528215557-1395a4b4b8a6";

      }

      else if (condition.includes("thunderstorm")) {

        bgUrl =
          "https://images.unsplash.com/photo-1624951562946-c08be690e2d3";

      }

      else if (
        condition.includes("mist") ||
        condition.includes("fog")
      ) {

        bgUrl =
          "https://images.unsplash.com/photo-1479476437642-f85d89e5ad7b";

      }

      else if (condition.includes("wind")) {

        bgUrl =
          "https://images.unsplash.com/photo-1470176519524-3c2f481c8c9c";

      }

      else {

        bgUrl =
          "https://images.unsplash.com/photo-1560803694-5c3cbe494087";
      }


      // Update background

      document.body.style.backgroundImage = `url(${bgUrl})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundPosition = "center center";


      // Display weather information

      resultDiv.innerHTML = `

        <h2>Weather in ${data.name}</h2>

        <p>
          <img
            src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
            alt="${data.weather[0].description}"
          >
        </p>

        <p>
          <strong>Temperature:</strong>
          ${data.main.temp}°C
        </p>

        <p>
          <strong>Feels like:</strong>
          ${data.main.feels_like}°C
        </p>

        <p>
          <strong>Weather:</strong>
          ${data.weather[0].main}
        </p>

        <p>
          <strong>Humidity:</strong>
          ${data.main.humidity}%
        </p>

        <p>
          <strong>Wind Speed:</strong>
          ${data.wind.speed} m/s
        </p>

      `;

    })

    .catch(error => {

      console.error("Error fetching weather data:", error);

      resultDiv.classList.remove("hidden");

      resultDiv.innerHTML = `
        <p>City not found. Please check the city name and try again.</p>
      `;

    });

}


// Search when pressing Enter

document
  .getElementById("cityInput")
  .addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
      getWeather();
    }

  });