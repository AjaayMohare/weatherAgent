export const weatherToolDefinition = {
  type: 'function',
  function: {
    name: 'getWeather',
    description: 'Get the current weather condition and temperature for a given city',
    parameters: {
      type: 'object',
      properties: {
        city: {
          type: 'string',
          description: 'The name of the city to get weather for, e.g. Delhi, Mumbai, London',
        },
      },
      required: ['city'],
    },
  },
};
