import { HfService } from '../services/hfService.js';
import { weatherToolDefinition } from '../tools/weatherTool.js';

export class Planner {
  constructor() {
    this.hfService = new HfService();
    this.tools = [weatherToolDefinition];
  }

  async plan(messages) {
    return this.hfService.chat(messages, this.tools);
  }
}
