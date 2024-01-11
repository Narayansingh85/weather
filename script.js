document.addEventListener('DOMContentLoaded', () => {
  // Get user's location using Geolocation API
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async position => {
      const { latitude, longitude } = position.coords;

      // Get weather data from OpenWeatherMap API
      const apiKey = '2118af449c5f4d2489631c4c7d82cee3';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}` 
      //`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Update HTML elements with weather data
        document.getElementById('location').innerText = `Weather in ${data.name}, ${data.sys.country}`;
        document.getElementById('temperature').innerText = `${data.main.temp}°C`;
        document.getElementById('description').innerText = data.weather[0].description;
      } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('location').innerText = 'Unable to retrieve weather data.';
      }
    }, error => {
      console.error('Error getting location:', error);
      document.getElementById('location').innerText = 'Unable to retrieve location.';
    });
  } else {
    document.getElementById('location').innerText = 'Geolocation is not supported by your browser.';
  }
});



