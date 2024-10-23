const AI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const MAX_TOKEN = import.meta.env.VITE_TOKEN_MAX;
const TEMPERATURE_AI_COUNSELING = import.meta.env.VITE_TEMPERATURE_AI_COUNSELING;
const TEMPERATURE_AI_RECORD = import.meta.env.VITE_TEMPERATURE_AI_RECORD;

const fetchGPT = async (prompt: string, question: string, type: 'counseling' | 'record' = 'counseling') => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AI_API_KEY}`,
      },

      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: prompt },
          { role: 'user', content: question },
        ],
        temperature: type === 'counseling' ? Number(TEMPERATURE_AI_COUNSELING) : Number(TEMPERATURE_AI_RECORD),
        max_tokens: Number(MAX_TOKEN),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default fetchGPT;
