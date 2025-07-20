function getWeather() {
    const location = document.getElementById('location').value.trim();
    const resultDiv = document.getElementById('result');
    
    if (!location) {
        showError('Please enter a location');
        return;
    }
    
    // Show loading state
    showLoading();
    
    const apiKey = '25b24353fdd34ae194365409252703';
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Location not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error:', error);
            showError('Unable to fetch weather data. Please check the location and try again.');
        });
}

function showLoading() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <div class="loading"></div>
        <p>Fetching weather data...</p>
    `;
    resultDiv.className = 'show';
}

function displayWeather(data) {
    const resultDiv = document.getElementById('result');
    const { location, current } = data;
    
    resultDiv.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="https:${current.condition.icon}" alt="${current.condition.text}" style="width: 80px; height: 80px;">
            <h3 style="margin: 10px 0; color: #2c3e50; font-size: 24px;">${location.name}, ${location.country}</h3>
            <p style="font-size: 36px; font-weight: 300; color: #667eea; margin: 10px 0;">${current.temp_c}°C</p>
            <p style="font-size: 18px; color: #7f8c8d; text-transform: capitalize;">${current.condition.text}</p>
        </div>
        
        <div class="weather-details">
            <div class="weather-item">
                <div class="label">Feels Like</div>
                <div class="value">${current.feelslike_c}°C</div>
            </div>
            <div class="weather-item">
                <div class="label">Humidity</div>
                <div class="value">${current.humidity}%</div>
            </div>
            <div class="weather-item">
                <div class="label">Wind Speed</div>
                <div class="value">${current.wind_kph} km/h</div>
            </div>
            <div class="weather-item">
                <div class="label">Visibility</div>
                <div class="value">${current.vis_km} km</div>
            </div>
            <div class="weather-item">
                <div class="label">UV Index</div>
                <div class="value">${current.uv}</div>
            </div>
            <div class="weather-item">
                <div class="label">Pressure</div>
                <div class="value">${current.pressure_mb} mb</div>
            </div>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background: rgba(255, 255, 255, 0.6); border-radius: 10px;">
            <p style="font-size: 14px; color: #7f8c8d; margin: 0;">
                <strong>Local Time:</strong> ${location.localtime}
            </p>
        </div>
    `;
    
    resultDiv.className = 'show';
}

function showError(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<p style="color: #e74c3c; font-weight: 600;">${message}</p>`;
    resultDiv.className = 'show error';
}

// Add enter key support
document.getElementById('location').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        getWeather();
    }
});

// Add input validation and auto-suggestions (basic)
document.getElementById('location').addEventListener('input', function(event) {
    const value = event.target.value;
    // Remove any non-letter characters except spaces, commas, and hyphens
    event.target.value = value.replace(/[^a-zA-Z\s,-]/g, '');
});