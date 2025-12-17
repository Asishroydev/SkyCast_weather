export const SUGGESTED_CITIES = []; // Deprecated in favor of dynamic search

export const WEATHER_PROMPT_TEMPLATE = (location: string) => `
Get the current weather, next 12 hours hourly forecast, and next 5 days daily forecast for ${location}.

Return ONLY strict JSON in a markdown block. No conversational text.

Structure:
{
  "current": {
    "location_name": "City, Country",
    "temp_c": number,
    "condition": "Short text",
    "humidity_percent": number,
    "wind_kph": number,
    "description": "Brief summary."
  },
  "hourly": [
    // 12 items (next 12 hours)
    { "time": "HH:00", "temp_c": number, "condition": "Short text", "chance_of_rain": number }
  ],
  "daily": [
    // 5 items (starting today/tomorrow)
    { 
      "date": "Day Name (e.g. Mon)", 
      "max_temp_c": number, 
      "min_temp_c": number, 
      "condition": "Short text", 
      "chance_of_rain": number 
    }
  ]
}
`;
