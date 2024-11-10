
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon")


const apiKey = "45504149dca72d9ed1bea1686c9f1c2e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        console.log(response)
        var data = await response.json();
        console.log(data)

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/cloudy.png"
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/sun.png"
        }

        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png"

        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rainy-day.png"

        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/snow.png"
        }
    } catch (error) {
        console.error("Failed to fetch weather data", error)
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})

searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value);
    }
})

