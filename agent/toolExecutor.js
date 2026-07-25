import { WeatherService } from '../services/weatherService.js';

export class ToolExecutor {
  constructor() {
    this.weatherService = new WeatherService();
  }

  async execute(toolName, args) {
    if (toolName === 'getWeather') {
      try {
        const result = await this.weatherService.getWeather(args.city);
        return JSON.stringify(result);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          return JSON.stringify({ error: 'Wrong city name' });
        }
        return JSON.stringify({ error: 'Weather service unavailable' });
      }
    }
    throw new Error(`Unknown tool: ${toolName}`);
  }
}
