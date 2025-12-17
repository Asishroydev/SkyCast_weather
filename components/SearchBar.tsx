import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setIsSuggesting(true);
      try {
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
        );
        const data = await response.json();
        
        if (data.results && Array.isArray(data.results)) {
          const formattedSuggestions = data.results.map((item: any) => {
             const parts = [item.name];
             if (item.admin1) parts.push(item.admin1);
             if (item.country) parts.push(item.country);
             return parts.join(", ");
          });
          // Remove duplicates
          const unique = Array.from(new Set(formattedSuggestions)) as string[];
          setSuggestions(unique);
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        setIsSuggesting(false);
      }
    };

    // Reduced debounce to 150ms for snappier feel
    const debounceTimer = setTimeout(fetchSuggestions, 150);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  useEffect(() => {
    // Click outside to close
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (city: string) => {
    setQuery(city);
    onSearch(city);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto z-50" ref={wrapperRef}>
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className={`h-5 w-5 ${isLoading ? 'text-blue-400 animate-pulse' : 'text-gray-400 group-focus-within:text-blue-400'} transition-colors`} />
        </div>
        <input
          type="text"
          className="block w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-full leading-5 text-white placeholder-gray-400 focus:outline-none focus:bg-white/20 focus:ring-2 focus:ring-blue-500/50 backdrop-blur-md transition-all shadow-lg"
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isLoading}
        />
        
        {/* Loading Spinner for Suggestions or Main Search */}
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
          {(isLoading || isSuggesting) ? (
            <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
          ) : null}
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute w-full mt-2 bg-slate-800/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
          {suggestions.map((city, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(city)}
              className="w-full text-left px-4 py-3 text-gray-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 border-b border-white/5 last:border-0"
            >
              <MapPin className="w-4 h-4 text-gray-500 shrink-0" />
              <span className="truncate">{city}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
