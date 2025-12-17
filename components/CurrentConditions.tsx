import React from 'react';
import { CurrentWeather } from '../types';
import { WeatherIcon } from './WeatherIcon';
import { Droplets, Wind, Thermometer } from 'lucide-react';

interface CurrentConditionsProps {
  data: CurrentWeather;
}

export const CurrentConditions: React.FC<CurrentConditionsProps> = ({ data }) => {
  return (
    <div className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-white shadow-xl animate-fade-in">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Main Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-3xl font-bold tracking-tight mb-1">{data.location_name}</h2>
          <p className="text-blue-200 text-lg mb-4">{data.condition}</p>
          <div className="flex items-center gap-4">
            <span className="text-8xl font-thin tracking-tighter">
              {Math.round(data.temp_c)}°
            </span>
            <div className="p-4 bg-white/10 rounded-full">
              <WeatherIcon condition={data.condition} className="w-12 h-12" />
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-300 max-w-sm italic">
            "{data.description}"
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
          
          <div className="bg-white/5 p-4 rounded-2xl flex flex-col items-center justify-center border border-white/10 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-2 mb-2 text-blue-300">
              <Droplets className="w-5 h-5" />
              <span className="text-sm font-semibold">Humidity</span>
            </div>
            <span className="text-2xl font-bold">{data.humidity_percent}%</span>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl flex flex-col items-center justify-center border border-white/10 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-2 mb-2 text-teal-300">
              <Wind className="w-5 h-5" />
              <span className="text-sm font-semibold">Wind</span>
            </div>
            <span className="text-2xl font-bold">{data.wind_kph} <span className="text-sm font-normal text-gray-400">km/h</span></span>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl flex flex-col items-center justify-center border border-white/10 hover:bg-white/10 transition-colors col-span-2">
             <div className="flex items-center gap-2 mb-2 text-yellow-300">
              <Thermometer className="w-5 h-5" />
              <span className="text-sm font-semibold">Feels Like</span>
            </div>
            {/* Simple estimation for feels like if not provided, or just reuse temp for demo visual */}
            <span className="text-2xl font-bold">{Math.round(data.temp_c)}°</span>
          </div>

        </div>
      </div>
    </div>
  );
};
