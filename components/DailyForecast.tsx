import React from 'react';
import { DailyData } from '../types';
import { WeatherIcon } from './WeatherIcon';
import { Droplets } from 'lucide-react';

interface DailyForecastProps {
  data: DailyData[];
}

export const DailyForecast: React.FC<DailyForecastProps> = ({ data }) => {
  return (
    <div className="w-full mt-6 animate-fade-in-up delay-100">
      <h3 className="text-xl font-semibold text-white mb-4 pl-2">5-Day Forecast</h3>
      
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-lg">
        <div className="space-y-6">
          {data.map((day, index) => (
            <div key={index} className="flex items-center justify-between group">
              
              {/* Day Name */}
              <div className="w-16 font-medium text-gray-200">
                {day.date}
              </div>

              {/* Icon & Condition */}
              <div className="flex items-center gap-3 flex-1 justify-center md:justify-start md:pl-8">
                <WeatherIcon condition={day.condition} className="w-6 h-6" />
                <span className="text-sm text-gray-400 hidden md:block">{day.condition}</span>
              </div>

              {/* Rain Chance */}
              <div className="w-16 flex items-center justify-center text-xs text-blue-300 gap-1">
                {day.chance_of_rain > 0 && (
                    <>
                        <Droplets className="w-3 h-3" />
                        {day.chance_of_rain}%
                    </>
                )}
              </div>

              {/* Temperatures */}
              <div className="flex items-center gap-4 w-32 justify-end">
                <span className="text-gray-400 text-sm font-medium">{Math.round(day.min_temp_c)}°</span>
                
                {/* Visual Bar */}
                <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden relative">
                    <div 
                        className="absolute h-full rounded-full bg-gradient-to-r from-blue-400 to-yellow-400 opacity-80"
                        style={{
                            left: '10%', // Simple visual approximation
                            right: '10%'
                        }}
                    ></div>
                </div>

                <span className="text-white text-lg font-bold">{Math.round(day.max_temp_c)}°</span>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
