import React from 'react';
import { 
  Cloud, 
  CloudRain, 
  CloudLightning, 
  Sun, 
  CloudSun, 
  Snowflake, 
  Wind, 
  Droplets,
  Moon,
  CloudFog
} from 'lucide-react';

interface WeatherIconProps {
  condition: string;
  className?: string;
  isNight?: boolean;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, className = "w-6 h-6", isNight = false }) => {
  const lowerCondition = condition.toLowerCase();

  if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) {
    return <CloudRain className={`${className} text-blue-400`} />;
  }
  if (lowerCondition.includes('storm') || lowerCondition.includes('thunder')) {
    return <CloudLightning className={`${className} text-yellow-400`} />;
  }
  if (lowerCondition.includes('snow') || lowerCondition.includes('ice') || lowerCondition.includes('blizzard')) {
    return <Snowflake className={`${className} text-cyan-200`} />;
  }
  if (lowerCondition.includes('fog') || lowerCondition.includes('mist')) {
    return <CloudFog className={`${className} text-gray-400`} />;
  }
  if (lowerCondition.includes('cloud') || lowerCondition.includes('overcast')) {
    return lowerCondition.includes('partly') 
      ? <CloudSun className={`${className} text-gray-200`} /> 
      : <Cloud className={`${className} text-gray-400`} />;
  }
  if (lowerCondition.includes('clear') || lowerCondition.includes('sunny')) {
    return isNight 
      ? <Moon className={`${className} text-indigo-200`} /> 
      : <Sun className={`${className} text-yellow-400`} />;
  }
  if (lowerCondition.includes('wind')) {
    return <Wind className={`${className} text-teal-200`} />;
  }

  // Default
  return <Sun className={`${className} text-yellow-400`} />;
};
