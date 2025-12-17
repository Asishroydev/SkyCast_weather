export interface HourlyData {
  time: string;
  temp_c: number;
  condition: string;
  chance_of_rain: number;
}

export interface DailyData {
  date: string; // e.g., "Mon", "Today", or "2023-10-25"
  max_temp_c: number;
  min_temp_c: number;
  condition: string;
  chance_of_rain: number;
}

export interface CurrentWeather {
  temp_c: number;
  condition: string;
  humidity_percent: number;
  wind_kph: number;
  description: string;
  location_name: string;
}

export interface WeatherData {
  current: CurrentWeather;
  hourly: HourlyData[];
  daily: DailyData[];
}

export interface GroundingSource {
  uri: string;
  title: string;
}

export interface WeatherResponse {
  data: WeatherData | null;
  rawText: string;
  sources: GroundingSource[];
}
