export function validateApiKey(key, name) {
  if (!key || key.trim().length === 0 || key.includes('your_')) {
    throw new Error(`Invalid or missing ${name}. Check your .env file.`);
  }
}
