# Weather Check 🌤️

A modern, responsive weather application that provides real-time weather information for any location worldwide. Built with vanilla HTML, CSS, and JavaScript, featuring a beautiful glassmorphism design and smooth animations.

![Weather Check Preview](https://via.placeholder.com/800x400/667eea/ffffff?text=Weather+Check+App)

## ✨ Features

- **Real-time Weather Data**: Get current weather conditions for any city or location
- **Comprehensive Information**: View temperature, humidity, wind speed, visibility, UV index, and pressure
- **Modern UI Design**: Beautiful glassmorphism interface with smooth animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Elements**: Hover effects, loading states, and smooth transitions
- **Error Handling**: User-friendly error messages for invalid locations
- **Keyboard Support**: Press Enter to search for weather information
- **Input Validation**: Automatic filtering of invalid characters

## 🚀 Live Demo

[View Live Demo](https://your-demo-link.com) *(Replace with your actual demo link)*

## 📱 Screenshots

### Desktop View
![Desktop View](https://via.placeholder.com/600x400/667eea/ffffff?text=Desktop+View)

### Mobile View
![Mobile View](https://via.placeholder.com/300x500/764ba2/ffffff?text=Mobile+View)

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and accessibility features
- **CSS3**: Modern styling with flexbox, grid, and animations
- **JavaScript (ES6+)**: Async/await, fetch API, and DOM manipulation
- **WeatherAPI**: Real-time weather data provider

## 📋 Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for API calls
- WeatherAPI key (free tier available)

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/weather-check.git
   cd weather-check
   ```

2. **Get your API key**
   - Visit [WeatherAPI.com](https://www.weatherapi.com/)
   - Sign up for a free account
   - Copy your API key from the dashboard

3. **Configure the API key**
   - Open `script.js`
   - Replace the existing API key with your own:
   ```javascript
   const apiKey = 'YOUR_API_KEY_HERE';
   ```

4. **Launch the application**
   - Open `index.html` in your web browser
   - Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

5. **Access the application**
   - Open your browser and navigate to `http://localhost:8000`

## 🎯 Usage

1. **Enter Location**: Type any city name or location in the search box
2. **Get Weather**: Click the "Get Weather" button or press Enter
3. **View Results**: See comprehensive weather information including:
   - Current temperature and "feels like" temperature
   - Weather condition with icon
   - Humidity percentage
   - Wind speed and direction
   - Visibility distance
   - UV index
   - Atmospheric pressure
   - Local time

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `style.css`:
```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --accent-color: #667eea;
    --text-color: #2c3e50;
}
```

### Adding New Weather Data
Extend the `displayWeather()` function in `script.js`:
```javascript
// Add new weather information
<div class="weather-item">
    <div class="label">New Data</div>
    <div class="value">${current.new_data}</div>
</div>
```

### Modifying Animations
Adjust animation properties in `style.css`:
```css
.container {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
```

## 🔌 API Reference

This application uses the [WeatherAPI](https://www.weatherapi.com/) service:

- **Endpoint**: `https://api.weatherapi.com/v1/current.json`
- **Parameters**:
  - `key`: Your API key
  - `q`: Location query (city name, coordinates, etc.)
  - `aqi`: Air quality data (yes/no)

### Example Response
```json
{
  "location": {
    "name": "London",
    "country": "United Kingdom",
    "localtime": "2024-01-15 14:30"
  },
  "current": {
    "temp_c": 15.0,
    "condition": {
      "text": "Partly cloudy",
      "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png"
    },
    "humidity": 65,
    "wind_kph": 12.5
  }
}
```

## 🌐 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Opera 47+

## 📱 Mobile Responsiveness

The application is fully responsive and includes:
- Flexible grid layouts
- Touch-friendly button sizes
- Optimized font sizes for mobile
- Smooth scrolling and animations

## 🔒 Security Features

- Input validation and sanitization
- HTTPS API calls
- No sensitive data storage
- XSS protection through proper DOM manipulation

## 🚀 Performance Optimizations

- Minimal HTTP requests
- Efficient CSS animations using transforms
- Debounced input handling
- Optimized images and icons
- Compressed and minified assets

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style and conventions
- Add comments for complex functionality
- Test on multiple browsers and devices
- Update documentation for new features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [WeatherAPI](https://www.weatherapi.com/) for providing reliable weather data
- [Unsplash](https://unsplash.com/) for beautiful background images
- [Google Fonts](https://fonts.google.com/) for typography
- The open-source community for inspiration and resources

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/weather-check/issues) page
2. Create a new issue with detailed information


## 🔮 Future Enhancements

- [ ] 7-day weather forecast
- [ ] Geolocation support
- [ ] Weather alerts and notifications
- [ ] Multiple location favorites
- [ ] Dark/light theme toggle
- [ ] Weather maps integration
- [ ] Historical weather data
- [ ] Social sharing features

---

**Made with ❤️ by Amit**

*Last updated: January 2024*
