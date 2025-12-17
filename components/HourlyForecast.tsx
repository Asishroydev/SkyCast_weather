import React from 'react';
import { HourlyData } from '../types';
import { WeatherIcon } from './WeatherIcon';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface HourlyForecastProps {
  data: HourlyData[];
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ data }) => {
  // Check if it's currently night based on generic 6pm-6am logic for icon purposes,
  // though real apps use sunset data.
  const isNightTime = (timeStr: string) => {
    const hour = parseInt(timeStr.split(':')[0], 10);
    return hour < 6 || hour > 18;
  };

  return (
    <div className="w-full mt-8 animate-fade-in-up">
      <h3 className="text-xl font-semibold text-white mb-4 pl-2">Hourly Forecast</h3>
      
      {/* Chart */}
      <div className="h-48 w-full bg-white/5 rounded-3xl p-4 border border-white/10 mb-6 backdrop-blur-sm">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              stroke="#94a3b8" 
              tick={{fill: '#94a3b8', fontSize: 12}}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderRadius: '12px', border: 'none', color: '#fff' }}
              itemStyle={{ color: '#fbbf24' }}
              labelStyle={{ color: '#94a3b8' }}
              formatter={(value: number) => [`${value}°C`, 'Temp']}
            />
            <Area 
              type="monotone" 
              dataKey="temp_c" 
              stroke="#fbbf24" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorTemp)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Cards List */}
      <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory">
        {data.map((hour, index) => (
          <div 
            key={index} 
            className="flex-shrink-0 snap-start w-24 bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center justify-between border border-white/10 hover:bg-white/20 transition-all cursor-default"
          >
            <span className="text-sm text-gray-300 font-medium">{hour.time}</span>
            <div className="my-3">
              <WeatherIcon condition={hour.condition} isNight={isNightTime(hour.time)} />
            </div>
            <span className="text-xl font-bold text-white">{Math.round(hour.temp_c)}°</span>
            <div className="mt-1 flex items-center gap-1">
              <span className="text-[10px] text-blue-300 font-bold">{hour.chance_of_rain}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
