import axios from 'axios';

const HF_API_URL = 'https://router.huggingface.co/v1/chat/completions';

export class HfService {
  constructor() {
    this.apiKey = process.env.HUGGINGFACE_API_KEY;
    this.model = process.env.HF_MODEL || 'Qwen/Qwen2.5-7B-Instruct';
  }

  async chat(messages, tools = []) {
    try {
      const body = {
        model: this.model,
        messages,
      };

      if (tools.length > 0) {
        body.tools = tools;
        body.tool_choice = 'auto';
      }

      const response = await axios.post(HF_API_URL, body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        timeout: 30000,
      });

      return response.data;
    } catch (err) {
      if (err.response?.data?.error) {
        throw new Error(`Hugging Face API error: ${err.response.data.error.message || JSON.stringify(err.response.data.error)}`);
      }
      if (err.code === 'ECONNREFUSED') {
        throw new Error('Could not connect to Hugging Face API. Check your internet connection.');
      }
      if (err.code === 'ETIMEDOUT') {
        throw new Error('Hugging Face API request timed out. Try again.');
      }
      throw new Error(`Failed to reach Hugging Face API: ${err.message}`);
    }
  }
}
