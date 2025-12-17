import { GoogleGenAI } from "@google/genai";
import { WEATHER_PROMPT_TEMPLATE } from "../constants";
import { WeatherResponse, GroundingSource, WeatherData } from "../types";

const apiKey = process.env.API_KEY;

// Helper to extract JSON from Markdown code blocks
const extractJson = (text: string): WeatherData | null => {
  try {
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/);
    if (jsonMatch && jsonMatch[1]) {
      return JSON.parse(jsonMatch[1]);
    }
    // Attempt to parse raw text if it looks like JSON
    if (text.trim().startsWith('{')) {
      return JSON.parse(text);
    }
    return null;
  } catch (e) {
    console.error("Failed to parse JSON from Gemini response", e);
    return null;
  }
};

export const fetchWeather = async (location: string): Promise<WeatherResponse> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: WEATHER_PROMPT_TEMPLATE(location),
      config: {
        tools: [{ googleSearch: {} }],
        // Note: responseMimeType is NOT supported with tools, so we parse manually
      },
    });

    const rawText = response.text || "";
    
    // Extract Grounding Metadata (Sources)
    const sources: GroundingSource[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (chunks) {
      chunks.forEach((chunk) => {
        if (chunk.web) {
          sources.push({
            uri: chunk.web.uri || "#",
            title: chunk.web.title || "Source",
          });
        }
      });
    }

    const parsedData = extractJson(rawText);

    return {
      data: parsedData,
      rawText: rawText,
      sources: sources,
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
