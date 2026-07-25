# AI Weather Agent

CLI weather bot using Hugging Face Inference Providers with tool calling.

## Prerequisites

- Node.js v18+
- [HF token](https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained)
- [OpenWeatherMap key](https://openweathermap.org/api)

## Files

| File | Role |
|---|---|
| `app.js` | CLI entry point |
| `agent/weatherAgent.js` | Main agent loop |
| `agent/planner.js` | Sends messages + tool defs to HF model |
| `agent/toolExecutor.js` | Runs the tool when model requests it |
| `tools/weatherTool.js` | Tool definition shown to the model |
| `services/hfService.js` | Talks to Hugging Face API |
| `services/weatherService.js` | Talks to OpenWeatherMap |
| `utils/validator.js` | Checks API keys at startup |

## Setup

```
.env
HUGGINGFACE_API_KEY=hf_your_token
HF_MODEL=Qwen/Qwen2.5-7B-Instruct
WEATHER_API_KEY=your_key

npm install
npm start
```

JUST FOR FUN
