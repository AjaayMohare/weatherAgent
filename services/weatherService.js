import axios from 'axios';

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

export class WeatherService {
  constructor() {
    this.apiKey = process.env.WEATHER_API_KEY;
  }

  async getWeather(city) {
    const response = await axios.get(WEATHER_API_URL, {
      params: {
        q: city,
        appid: this.apiKey,
        units: 'metric',
      },
      timeout: 10000,
    });

    const { main, weather, name } = response.data;
    return {
      city: name,
      temperature: Math.round(main.temp),
      condition: weather[0].main,
    };
  }
}
