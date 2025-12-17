import React, { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { CurrentConditions } from './components/CurrentConditions';
import { HourlyForecast } from './components/HourlyForecast';
import { DailyForecast } from './components/DailyForecast';
import { WeatherData, GroundingSource } from './types';
import { fetchWeather } from './services/geminiService';
import { ExternalLink, CloudSun } from 'lucide-react';

const App: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sources, setSources] = useState<GroundingSource[]>([]);
  const [initialLoad, setInitialLoad] = useState(true);

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError(null);
    setInitialLoad(false);
    
    try {
      const response = await fetchWeather(city);
      if (response.data) {
        setWeather(response.data);
        setSources(response.sources);
      } else {
        // Fallback or error if structure parsing failed
        console.warn("Could not parse structured data, showing error state for now.");
        setError("Could not retrieve structured weather data. Please try again.");
      }
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Optional: Load a default city
  useEffect(() => {
    // Intentionally left blank to show "Search" state first
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col items-center py-10 px-4">
      
      {/* Header */}
      <header className="mb-10 text-center space-y-2">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="p-3 bg-blue-500 rounded-2xl shadow-lg shadow-blue-500/50">
            <CloudSun className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">
            SkyCast
          </h1>
        </div>
        <p className="text-blue-200/60 text-sm">AI-Powered Weather Intelligence</p>
      </header>

      {/* Search */}
      <div className="w-full max-w-2xl mb-8">
        <SearchBar onSearch={handleSearch} isLoading={loading} />
      </div>

      {/* Content Area */}
      <main className="w-full max-w-3xl space-y-6">
        
        {error && (
          <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-2xl text-red-200 text-center animate-fade-in">
            {error}
          </div>
        )}

        {initialLoad && !loading && (
          <div className="text-center py-20 text-blue-200/40">
            <p className="text-lg">Enter a city to explore current conditions, hourly, and daily forecasts.</p>
          </div>
        )}

        {weather && !loading && (
          <>
            <CurrentConditions data={weather.current} />
            <HourlyForecast data={weather.hourly} />
            
            {/* Daily Forecast */}
            {weather.daily && weather.daily.length > 0 && (
               <DailyForecast data={weather.daily} />
            )}
            
            {/* Grounding Sources */}
            {sources.length > 0 && (
              <div className="mt-8 pt-6 border-t border-white/10 w-full">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Verified Sources</h4>
                <div className="flex flex-wrap gap-2">
                  {sources.map((source, idx) => (
                    <a 
                      key={idx} 
                      href={source.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-blue-300 transition-colors border border-white/5"
                    >
                      <span className="truncate max-w-[150px]">{source.title}</span>
                      <ExternalLink className="w-3 h-3 opacity-50" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>
      
      {/* Footer */}
      <footer className="mt-auto pt-10 text-slate-500 text-xs text-center">
        <p>Powered by Gemini 2.5 Flash & Google Search Grounding</p>
      </footer>
    </div>
  );
};

export default App;
