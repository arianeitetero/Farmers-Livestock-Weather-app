const WEATHER_API_KEY = "1bf4e25bf4aafd3e24327f9a00a7ec8a"; // Replace with your key

document.getElementById("getDecisionBtn").addEventListener("click", () => {
    const city = document.getElementById("cityInput").value;
    if(city === "") {
        alert("Please enter a city");
        return;
    }
    getWeatherAndAdvise(city);
});

function getWeatherAndAdvise(city) {
    const weatherDiv = document.getElementById("weatherOutput");
    const decisionDiv = document.getElementById("decisionOutput");

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`)
    .then(response => response.json())
    .then(data => {
        if(data.cod === 200){
            const temp = data.main.temp;
            const weatherDesc = data.weather[0].description;

            // Display weather
            weatherDiv.innerHTML = `
                <p><strong>City:</strong> ${data.name}</p>
                <p><strong>Temperature:</strong> ${temp} °C</p>
                <p><strong>Weather:</strong> ${weatherDesc}</p>
            `;

            // Determine advice
            decisionDiv.innerHTML = ""; // Clear previous cards
            const adviceCards = getAdviceCards(temp, weatherDesc);
            adviceCards.forEach(cardInfo => {
                const card = document.createElement("div");
                card.className = "card";
                card.innerHTML = `
                    <div class="card-title">${cardInfo.title}</div>
                    <div class="card-text">${cardInfo.text}</div>
                `;
                decisionDiv.appendChild(card);
            });

        } else {
            weatherDiv.innerHTML = `<p>Error: ${data.message}</p>`;
        }
    })
    .catch(error => {
        weatherDiv.innerHTML = `<p>Error fetching weather: ${error}</p>`;
    });
}

// Generate advice based on temperature
function getAdviceCards(temp, weatherDesc){
    const cards = [];

    // Crop advice
    if(temp >= 30){
        cards.push({title: "Crop Advice", text: "Plant drought-resistant crops like millet or sorghum."});
    } else if(temp >= 20){
        cards.push({title: "Crop Advice", text: "Good weather for planting maize, beans, and vegetables."});
    } else {
        cards.push({title: "Crop Advice", text: "Focus on leafy vegetables and greenhouse crops."});
    }

    // Livestock advice
    if(temp >= 30){
        cards.push({title: "Livestock Care", text: "Ensure plenty of water and shade for livestock."});
    } else if(temp >= 20){
        cards.push({title: "Livestock Care", text: "Normal feeding and watering schedule is fine."});
    } else {
        cards.push({title: "Livestock Care", text: "Provide shelter and extra feed for warmth."});
    }

    // Water management advice
    if(weatherDesc.includes("rain")){
        cards.push({title: "Water Management", text: "Monitor for waterlogging and ensure drainage."});
    } else {
        cards.push({title: "Water Management", text: "Irrigate crops regularly to prevent drought stress."});
    }

    // Pest/Disease advisory
    if(temp >= 25 && weatherDesc.includes("rain")){
        cards.push({title: "Pest Alert", text: "High humidity + warmth may increase pest risk; monitor crops."});
    } else {
        cards.push({title: "Pest Alert", text: "Normal conditions, routine monitoring recommended."});
    }

    return cards;
}
