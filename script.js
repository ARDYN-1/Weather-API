  function getWeather() {
            const location = document.getElementById('location').value;
            const apiKey = '25b24353fdd34ae194365409252703';
            const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    document.getElementById('result').innerHTML = `
                        <p><strong>Location:</strong> ${data.location.name}, ${data.location.country}</p>
                        <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
                        <p><strong>Condition:</strong> ${data.current.condition.text}</p>
                        <img src="${data.current.condition.icon}" alt="Weather icon">
                    `;
                })
                .catch(error => {
                    document.getElementById('result').innerHTML = '<p style="color:red;">Error fetching weather data.</p>';
                });
        }