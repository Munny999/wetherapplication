async function getdata() {
    const inputVal = document.getElementById("searchTxt").value.trim();

    if (inputVal === "") {
        alert("Please enter a city name");
        return;
    }

    try {
        const response = await fetch(
            "https://weatherapi-com.p.rapidapi.com/current.json?q=" +
                encodeURIComponent(inputVal),
            {
                method: "GET",
                headers: {
                    "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
                    "x-rapidapi-key": "YOUR_NEW_RAPIDAPI_KEY"
                }
            }
        );

        if (!response.ok) {
            throw new Error("Weather data could not be fetched");
        }

        const data = await response.json();

        document.getElementById("location").innerText =
            data.location.name;

        document.getElementById("locationParts").innerText =
            data.location.region + ", " + data.location.country;

        document.getElementById("dateTime").innerText =
            data.location.localtime;

        document.getElementById("txtWord").innerText =
            data.current.condition.text;

        document.getElementById("humidity").innerText =
            "Humidity: " + data.current.humidity + "%";

        document.getElementById("precipitation").innerText =
            "Precipitation: " + data.current.precip_mm + " mm";

        document.getElementById("wind").innerText =
            "Wind Speed: " + data.current.wind_kph + " km/h";

        document.getElementById("temperatureC").innerText =
            data.current.temp_c + "°C";

        document.getElementById("temperatureF").innerText =
            data.current.temp_f + "°F";

        document.getElementById("weatherIcon").src =
            "https:" + data.current.condition.icon;

        getWeekDay();
    } catch (error) {
        console.error(error);
        alert("Unable to fetch weather. Check your API key or city name.");
    }
}

function getWeekDay() {
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    document.getElementById("weekDay").innerText =
        weekday[new Date().getDay()];
}

document.getElementById("searchTxt").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        getdata();
    }
});
