class WeatherApp {
    constructor() {
        this.apiKey = '25b24353fdd34ae194365409252703';
        this.currentUnit = 'celsius';
        this.isDarkTheme = false;
        this.favorites = JSON.parse(localStorage.getItem('weatherFavorites')) || [];
        this.currentLocation = null;
        
        this.initializeApp();
        this.bindEvents();
        this.loadTheme();
        this.renderFavorites();
        this.detectUserLocation();
    }

    initializeApp() {
        // Add icons to the DOM
        this.addIconsToDOM();
    }

    addIconsToDOM() {
        // Add search icon
        const searchIcon = document.createElement('span');
        searchIcon.className = 'search-icon';
        searchIcon.innerHTML = '🔍';
        document.querySelector('.input-wrapper').appendChild(searchIcon);

        // Add theme toggle
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '🌙';
        themeToggle.setAttribute('aria-label', 'Toggle dark theme');
        themeToggle.onclick = () => this.toggleTheme();
        document.querySelector('.main-card').appendChild(themeToggle);

        // Add units toggle
        const unitsToggle = document.createElement('div');
        unitsToggle.className = 'units-toggle';
        unitsToggle.innerHTML = `
            <button class="unit-btn active" data-unit="celsius">°C</button>
            <button class="unit-btn" data-unit="fahrenheit">°F</button>
        `;
        document.querySelector('.search-section').appendChild(unitsToggle);

        // Add favorites section
        const favoritesSection = document.createElement('div');
        favoritesSection.className = 'favorites';
        favoritesSection.innerHTML = `
            <div class="favorites-header">
                <h3 class="favorites-title">📍 Favorite Locations</h3>
            </div>
            <div class="favorites-list" id="favoritesList"></div>
        `;
        document.querySelector('.main-card').appendChild(favoritesSection);
    }

    bindEvents() {
        // Search input events
        const locationInput = document.getElementById('location');
        locationInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.getWeather();
            }
        });

        locationInput.addEventListener('input', (e) => {
            // Basic input validation
            e.target.value = e.target.value.replace(/[^a-zA-Z\s,-]/g, '');
        });

        // Button events
        document.getElementById('getWeatherBtn').onclick = () => this.getWeather();
        document.getElementById('getCurrentLocationBtn').onclick = () => this.getCurrentLocation();
        document.getElementById('addFavoriteBtn').onclick = () => this.addToFavorites();

        // Unit toggle events
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('unit-btn')) {
                this.switchUnits(e.target.dataset.unit);
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'k':
                        e.preventDefault();
                        locationInput.focus();
                        break;
                    case 'l':
                        e.preventDefault();
                        this.getCurrentLocation();
                        break;
                    case 'd':
                        e.preventDefault();
                        this.toggleTheme();
                        break;
                }
            }
        });
    }

    async getWeather() {
        const location = document.getElementById('location').value.trim();
        
        if (!location) {
            this.showError('Please enter a location');
            return;
        }

        this.showLoading();
        
        try {
            const data = await this.fetchWeatherData(location);
            this.currentLocation = {
                name: `${data.location.name}, ${data.location.country}`,
                query: location
            };
            this.displayWeather(data);
        } catch (error) {
            console.error('Error:', error);
            this.showError('Unable to fetch weather data. Please check the location and try again.');
        }
    }

    async getCurrentLocation() {
        if (!navigator.geolocation) {
            this.showError('Geolocation is not supported by this browser.');
            return;
        }

        this.showLoading('Getting your location...');

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const data = await this.fetchWeatherData(`${latitude},${longitude}`);
                    this.currentLocation = {
                        name: `${data.location.name}, ${data.location.country}`,
                        query: `${latitude},${longitude}`
                    };
                    this.displayWeather(data);
                    document.getElementById('location').value = data.location.name;
                } catch (error) {
                    this.showError('Unable to fetch weather for your location.');
                }
            },
            (error) => {
                let errorMessage = 'Unable to retrieve your location.';
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Location access denied by user.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Location information is unavailable.';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'Location request timed out.';
                        break;
                }
                this.showError(errorMessage);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000
            }
        );
    }

    async fetchWeatherData(location) {
        const url = `https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${location}&aqi=yes`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Location not found');
        }
        
        return await response.json();
    }

    detectUserLocation() {
        // Try to get user's location on app load
        if (navigator.geolocation && !document.getElementById('location').value) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const data = await this.fetchWeatherData(`${latitude},${longitude}`);
                        document.getElementById('location').value = data.location.name;
                        this.currentLocation = {
                            name: `${data.location.name}, ${data.location.country}`,
                            query: `${latitude},${longitude}`
                        };
                        this.displayWeather(data);
                    } catch (error) {
                        // Silently fail for auto-detection
                    }
                },
                () => {
                    // Silently fail for auto-detection
                },
                { timeout: 5000 }
            );
        }
    }

    showLoading(message = 'Fetching weather data...') {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <div class="loading-text">${message}</div>
            </div>
        `;
        resultDiv.className = 'show';
    }

    displayWeather(data) {
        const { location, current } = data;
        const temp = this.currentUnit === 'celsius' ? current.temp_c : current.temp_f;
        const feelsLike = this.currentUnit === 'celsius' ? current.feelslike_c : current.feelslike_f;
        const unit = this.currentUnit === 'celsius' ? '°C' : '°F';
        
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
            <div class="weather-card">
                <div class="weather-header">
                    <h2 class="location-name">${location.name}, ${location.country}</h2>
                    <div class="weather-condition">
                        <img src="https:${current.condition.icon}" alt="${current.condition.text}" class="weather-icon">
                        <span class="condition-text">${current.condition.text}</span>
                    </div>
                    <div class="current-temp">${Math.round(temp)}${unit}</div>
                </div>
                
                <div class="weather-details">
                    <div class="weather-item">
                        <span class="weather-item-icon">🌡️</span>
                        <div class="label">Feels Like</div>
                        <div class="value">${Math.round(feelsLike)}${unit}</div>
                    </div>
                    <div class="weather-item">
                        <span class="weather-item-icon">💧</span>
                        <div class="label">Humidity</div>
                        <div class="value">${current.humidity}%</div>
                    </div>
                    <div class="weather-item">
                        <span class="weather-item-icon">💨</span>
                        <div class="label">Wind Speed</div>
                        <div class="value">${current.wind_kph} km/h</div>
                    </div>
                    <div class="weather-item">
                        <span class="weather-item-icon">👁️</span>
                        <div class="label">Visibility</div>
                        <div class="value">${current.vis_km} km</div>
                    </div>
                    <div class="weather-item">
                        <span class="weather-item-icon">☀️</span>
                        <div class="label">UV Index</div>
                        <div class="value">${current.uv}</div>
                    </div>
                    <div class="weather-item">
                        <span class="weather-item-icon">🌪️</span>
                        <div class="label">Pressure</div>
                        <div class="value">${current.pressure_mb} mb</div>
                    </div>
                </div>
                
                <div class="local-time">
                    <div class="time-label">Local Time</div>
                    <div class="time-value">${this.formatDateTime(location.localtime)}</div>
                </div>
            </div>
        `;
        
        resultDiv.className = 'show';
        
        // Enable add to favorites button
        document.getElementById('addFavoriteBtn').disabled = false;
    }

    showError(message) {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `<div class="error">❌ ${message}</div>`;
        resultDiv.className = 'show';
    }

    switchUnits(unit) {
        this.currentUnit = unit;
        
        // Update UI
        document.querySelectorAll('.unit-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.unit === unit);
        });
        
        // Refresh weather display if data exists
        if (this.currentLocation) {
            this.getWeatherForLocation(this.currentLocation.query);
        }
        
        localStorage.setItem('weatherUnit', unit);
    }

    async getWeatherForLocation(query) {
        try {
            const data = await this.fetchWeatherData(query);
            this.displayWeather(data);
        } catch (error) {
            this.showError('Unable to refresh weather data.');
        }
    }

    toggleTheme() {
        this.isDarkTheme = !this.isDarkTheme;
        document.body.classList.toggle('dark-theme', this.isDarkTheme);
        
        const themeToggle = document.querySelector('.theme-toggle');
        themeToggle.innerHTML = this.isDarkTheme ? '☀️' : '🌙';
        
        localStorage.setItem('weatherTheme', this.isDarkTheme ? 'dark' : 'light');
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('weatherTheme');
        const savedUnit = localStorage.getItem('weatherUnit');
        
        if (savedTheme === 'dark') {
            this.toggleTheme();
        }
        
        if (savedUnit && savedUnit !== this.currentUnit) {
            this.switchUnits(savedUnit);
        }
    }

    addToFavorites() {
        if (!this.currentLocation) {
            this.showError('No location to add to favorites.');
            return;
        }

        const exists = this.favorites.some(fav => fav.name === this.currentLocation.name);
        if (exists) {
            this.showError('Location already in favorites.');
            return;
        }

        this.favorites.push(this.currentLocation);
        localStorage.setItem('weatherFavorites', JSON.stringify(this.favorites));
        this.renderFavorites();
        
        // Show success feedback
        const btn = document.getElementById('addFavoriteBtn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '✅ Added!';
        setTimeout(() => {
            btn.innerHTML = originalText;
        }, 2000);
    }

    renderFavorites() {
        const favoritesList = document.getElementById('favoritesList');
        
        if (this.favorites.length === 0) {
            favoritesList.innerHTML = '<div style="text-align: center; color: var(--text-secondary); font-style: italic;">No favorite locations yet</div>';
            return;
        }

        favoritesList.innerHTML = this.favorites.map((favorite, index) => `
            <div class="favorite-item" onclick="weatherApp.loadFavorite('${favorite.query}', '${favorite.name}')">
                <span>${favorite.name}</span>
                <button class="remove-favorite" onclick="event.stopPropagation(); weatherApp.removeFavorite(${index})" aria-label="Remove from favorites">✕</button>
            </div>
        `).join('');
    }

    async loadFavorite(query, name) {
        document.getElementById('location').value = name.split(',')[0];
        try {
            const data = await this.fetchWeatherData(query);
            this.currentLocation = { name, query };
            this.displayWeather(data);
        } catch (error) {
            this.showError('Unable to load weather for this location.');
        }
    }

    removeFavorite(index) {
        this.favorites.splice(index, 1);
        localStorage.setItem('weatherFavorites', JSON.stringify(this.favorites));
        this.renderFavorites();
    }

    formatDateTime(dateTimeString) {
        const date = new Date(dateTimeString);
        return date.toLocaleString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.weatherApp = new WeatherApp();
});

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}