import { Planner } from './planner.js';
import { ToolExecutor } from './toolExecutor.js';
import { validateApiKey } from '../utils/validator.js';

const SYSTEM_PROMPT = `You are a helpful AI weather assistant.

You have access to the getWeather tool. Use it when the user asks about weather, temperature, or conditions in a city.

If the tool returns {"error":"Wrong city name"}, tell the user the city was not found.
If the tool returns weather data, present it naturally in a friendly sentence.

If the user greets you or asks something unrelated to weather, respond conversationally without calling any tool.`;

export class WeatherAgent {
  constructor() {
    validateApiKey(process.env.HUGGINGFACE_API_KEY, 'HUGGINGFACE_API_KEY');
    validateApiKey(process.env.WEATHER_API_KEY, 'WEATHER_API_KEY');

    this.planner = new Planner();
    this.executor = new ToolExecutor();
    this.messages = [{ role: 'system', content: SYSTEM_PROMPT }];
  }

  async process(input) {
    this.messages.push({ role: 'user', content: input });

    try {
      let response = await this.planner.plan(this.messages);
      let choice = response.choices[0];

      if (!choice || !choice.message) {
        throw new Error('Received an empty response from Grok.');
      }

      while (choice.finish_reason === 'tool_calls') {
        this.messages.push(choice.message);

        for (const toolCall of (choice.message.tool_calls || [])) {
          const { name, arguments: args } = toolCall.function;
          const result = await this.executor.execute(name, JSON.parse(args));

          this.messages.push({
            role: 'tool',
            tool_call_id: toolCall.id,
            content: result,
          });
        }

        response = await this.planner.plan(this.messages);
        choice = response.choices[0];

        if (!choice || !choice.message) {
          throw new Error('Received an empty response from Grok.');
        }
      }

      const content = choice.message.content || '';
      this.messages.push({ role: 'assistant', content });
      return content;
    } catch (err) {
      this.messages.pop();
      throw err;
    }
  }
}
