import 'dotenv/config';
import { WeatherAgent } from './agent/weatherAgent.js';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

async function main() {
  const rl = readline.createInterface({ input, output });

  let agent;
  try {
    agent = new WeatherAgent();
  } catch (err) {
    console.error(`Configuration error: ${err.message}`);
    process.exit(1);
  }

  console.log('AI Weather Agent');
  console.log('Type "exit" to quit.\n');

  while (true) {
    const prompt = await rl.question('You: ');
    const trimmed = prompt.trim();

    if (!trimmed) continue;
    if (trimmed.toLowerCase() === 'exit') break;

    try {
      const response = await agent.process(trimmed);
      console.log(`Agent: ${response}\n`);
    } catch (err) {
      console.log(`Agent: ${err.message}\n`);
    }
  }

  rl.close();
  console.log('Goodbye!');
}

main();
