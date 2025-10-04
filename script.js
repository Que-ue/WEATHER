const apiKey = "c2e537d14d90d80aae8435a09c7dcc71"; // Your OpenWeatherMap API key

// Random aesthetic background on page load
const backgroundImages = [
  "https://images.unsplash.com/photo-1594220862488-117b78382514",
  "https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875",
  "https://images.unsplash.com/photo-1476616853026-24c1f0309646"
];

document.body.style.backgroundImage = `url(${backgroundImages[Math.floor(Math.random() * backgroundImages.length)]})`;
document.body.style.backgroundSize = "cover";
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.backgroundPosition = "center center";

function getWeather() {
  const city = document.getElementById("cityInput").value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const resultDiv = document.getElementById("weatherResult");
      resultDiv.classList.remove("hidden");

      if (data.cod === "404") {
        resultDiv.innerHTML = `<p>City not found.</p>`;
      } else {
        const condition = data.weather[0].main.toLowerCase();

        let bgUrl = "";

        if (condition.includes("cloud")) {
          bgUrl = "https://plus.unsplash.com/premium_photo-1667143327769-1c36fd30a7c6";
        } else if (condition.includes("rain")) {
          bgUrl = "https://images.unsplash.com/photo-1640600997533-1b44078d394b";
        } else if (condition.includes("clear") || condition.includes("sun")) {
          bgUrl = "https://images.unsplash.com/photo-1419833173245-f59e1b93f9ee";
        } else if (condition.includes("snow") || condition.includes("cold")) {
          bgUrl = "https://images.unsplash.com/photo-1484528215557-1395a4b4b8a6";
        } else if (condition.includes("thunderstorm")) {
          bgUrl = "https://images.unsplash.com/photo-1624951562946-c08be690e2d3";
        } else if (condition.includes("mist") || condition.includes("fog")) {
          bgUrl = "https://images.unsplash.com/photo-1479476437642-f85d89e5ad7b";
        } else if (condition.includes("wind")) {
          bgUrl = "https://images.unsplash.com/photo-1470176519524-3c2f481c8c9c";
        } else {
          bgUrl = "https://images.unsplash.com/photo-1560803694-5c3cbe494087";
        }

        document.body.style.backgroundImage = `url(${bgUrl})`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundPosition = "center center";

        resultDiv.innerHTML = `
          <h2>Weather in ${data.name}</h2>
          <p><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"></p>
          <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
          <p><strong>Weather:</strong> ${data.weather[0].main}</p>
          <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
          <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        `;
      }
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
    });
}
