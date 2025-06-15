import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const HF_API_TOKEN = process.env.HUGGINGFACE_API_KEY;
const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1";

interface Supplement {
  name: string;
  description: string;
  benefit: string;
}

export async function generateText(age: string, goal: string): Promise<Supplement[]> {
  const prompt = `
[INST] <<SYS>>
You are a health advisor. Respond STRICTLY with ONLY the JSON array, nothing else.
<</SYS>>

Suggest 3 supplements for a ${age}-year-old wanting ${goal} in this EXACT format:
[
  { "name": "", "description": "", "benefit": "" }
] [/INST]
  `;

  try {
    const response = await axios.post(
      API_URL,
      {
        inputs: prompt,
        parameters: {
          max_new_tokens: 300,
          temperature: 0.7,
          return_full_text: false
        }
      },
      {
        headers: {
          Authorization: `Bearer ${HF_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const generatedText = response.data[0]?.generated_text || '';
    
    const jsonMatch = generatedText.match(/\[.*\]/s);
    if (!jsonMatch) {
      throw new Error('No valid JSON array found in response');
    }

    const parsedData = JSON.parse(jsonMatch[0]);

    if (!Array.isArray(parsedData)) {
      throw new Error('Response is not an array');
    }

    
    return parsedData;

  } catch (error) {
    console.error('API Error:', error instanceof Error ? error.message : error);
    return getMockSuggestions(goal);
  }
}

function getMockSuggestions(goal: string): Supplement[] {
  const mockData: Record<string, Supplement[]> = {
    energy: [
      {
        name: "CoQ10",
        description: "Antioxidant that supports cellular energy production",
        benefit: "Helps combat age-related energy decline"
      }
    ],
    sleep: [
      {
        name: "Magnesium",
        description: "Mineral essential for muscle and nerve function",
        benefit: "Promotes relaxation and better sleep"
      }
    ],
    focus: [
      {
        name: "Omega-3",
        description: "Essential fatty acids for brain health",
        benefit: "Supports cognitive function and focus"
      }
    ]
  };
  return mockData[goal] || [];
}