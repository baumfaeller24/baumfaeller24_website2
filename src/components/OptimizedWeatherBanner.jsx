import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Wind, AlertTriangle, Phone, Thermometer, Eye, Droplets } from 'lucide-react';
import { getWeatherData, getWeatherEmoji, formatWindDirection } from '../services/weatherService';

const OptimizedWeatherBanner = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await getWeatherData();
      setWeatherData(data);
      
    } catch (err) {
      console.error('Weather update failed:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateWeather();
    const interval = setInterval(updateWeather, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getAlertContent = (data) => {
    if (!data) return null;
    
    const { weather, alertLevel, assessment } = data;
    const emoji = getWeatherEmoji(weather.condition, isDay());
    
    switch (alertLevel) {
      case 'storm':
        return {
          icon: <AlertTriangle className="w-5 h-5 animate-pulse" />,
          bgClass: 'bg-gradient-to-r from-red-600 to-red-700 text-white',
          priority: 'STURMWARNUNG',
          priorityColor: 'bg-red-900 text-red-100',
          message: assessment.message,
          cta: 'NOTFALL HOTLINE',
          ctaIcon: <Phone className="w-4 h-4" />,
          phone: '030 65 94 00 49'
        };
      
      case 'warning':
        return {
          icon: <Wind className="w-5 h-5" />,
          bgClass: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white',
          priority: 'WINDWARNUNG',
          priorityColor: 'bg-orange-900 text-orange-100',
          message: assessment.message,
          cta: 'Sicherheitscheck',
          ctaIcon: <AlertTriangle className="w-4 h-4" />,
          phone: '030 65 94 00 49'
        };
      
      default:
        return {
          icon: getWeatherIcon(weather.condition),
          bgClass: 'bg-gradient-to-r from-green-600 to-green-700 text-white',
          priority: 'OPTIMAL',
          priorityColor: 'bg-green-900 text-green-100',
          message: assessment.message,
          cta: 'Termin buchen',
          ctaIcon: <Sun className="w-4 h-4" />,
          phone: '030 65 94 00 49'
        };
    }
  };

  const getWeatherIcon = (condition) => {
    const iconMap = {
      clear: <Sun className="w-5 h-5" />,
      clouds: <Cloud className="w-5 h-5" />,
      rain: <CloudRain className="w-5 h-5" />,
      drizzle: <CloudRain className="w-5 h-5" />,
      thunderstorm: <Wind className="w-5 h-5 animate-bounce" />,
      snow: <Cloud className="w-5 h-5" />,
      mist: <Cloud className="w-5 h-5" />,
      fog: <Cloud className="w-5 h-5" />
    };
    
    return iconMap[condition] || <Sun className="w-5 h-5" />;
  };

  const isDay = () => {
    const hour = new Date().getHours();
    return hour >= 6 && hour <= 20;
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('de-DE', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (loading && !weatherData) {
    return (
      <div className="w-full bg-gray-100 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <Wind className="w-4 h-4 animate-spin" />
            <span className="text-sm">Wetterdaten für Berlin-Mitte werden geladen...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error && !weatherData) {
    return (
      <div className="w-full bg-yellow-100 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2 text-yellow-800">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm">Wetterdaten temporär nicht verfügbar</span>
          </div>
        </div>
      </div>
    );
  }

  const alertContent = getAlertContent(weatherData);
  if (!alertContent) return null;

  const { weather } = weatherData;

  return (
    <div className={`w-full py-4 transition-all duration-500 ${alertContent.bgClass}`}>
      <div className="container mx-auto px-4">
        
        {/* Main Weather Row */}
        <div className="flex items-center justify-between mb-3">
          
          {/* Left: Weather Info */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              {alertContent.icon}
            </div>
            
            <div className="flex items-center space-x-6">
              {/* Location & Temperature */}
              <div className="text-left">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-lg font-bold">{getWeatherEmoji(weather.condition, isDay())} {weather.location}</span>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${alertContent.priorityColor}`}>
                    {alertContent.priority}
                  </span>
                </div>
                <div className="text-2xl font-bold">
                  {weather.temperature}°C
                </div>
              </div>

              {/* Wind Info */}
              <div className="text-left hidden sm:block">
                <div className="text-sm opacity-90 mb-1">Wind</div>
                <div className="font-semibold">
                  {weather.windDirection ? formatWindDirection(weather.windDirection) : ''} {weather.windSpeed} km/h
                  {weather.windGust && weather.windGust > weather.windSpeed && (
                    <span className="text-sm opacity-90 ml-1">(Böen {weather.windGust})</span>
                  )}
                </div>
              </div>

              {/* Business Assessment */}
              <div className="text-left hidden md:block">
                <div className="text-sm opacity-90 mb-1">Arbeitsbedingungen</div>
                <div className="font-semibold">{alertContent.message}</div>
              </div>
            </div>
          </div>

          {/* Right: Call-to-Action */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => window.location.href = `tel:${alertContent.phone}`}
              className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 
                         px-6 py-3 rounded-lg transition-all duration-200 font-semibold
                         backdrop-blur-sm border border-white border-opacity-20"
            >
              {alertContent.ctaIcon}
              <span className="hidden sm:inline">{alertContent.cta}</span>
              <span className="sm:hidden text-sm">{alertContent.phone}</span>
            </button>
          </div>
        </div>

        {/* Secondary Info Row */}
        <div className="flex items-center justify-between text-sm opacity-90">
          
          {/* Left: Additional Weather Details */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1">
              <Thermometer className="w-3 h-3" />
              <span>Gefühlt {weather.feelsLike}°C</span>
            </div>
            
            <div className="flex items-center space-x-1 hidden sm:flex">
              <Droplets className="w-3 h-3" />
              <span>{weather.humidity}% Luftfeuchtigkeit</span>
            </div>
            
            {weather.visibility && (
              <div className="flex items-center space-x-1 hidden md:flex">
                <Eye className="w-3 h-3" />
                <span>{weather.visibility} km Sicht</span>
              </div>
            )}

            {/* Mobile Wind Info */}
            <div className="sm:hidden">
              <span>Wind: {weather.windSpeed} km/h</span>
            </div>
          </div>

          {/* Right: Update Time & Source */}
          <div className="flex items-center space-x-4 text-xs">
            <span>Update: {formatTime(weatherData.lastUpdated)}</span>
            <span className="hidden sm:inline">
              Quelle: {weather.source || 'OpenWeatherMap'}
              {weather.isFallback && ' (Fallback)'}
            </span>
          </div>
        </div>

        {/* Mobile Business Assessment */}
        <div className="md:hidden mt-2 pt-2 border-t border-white border-opacity-20">
          <div className="text-sm">
            <span className="opacity-90">🏗️ Arbeitsbedingungen: </span>
            <span className="font-semibold">{alertContent.message}</span>
          </div>
        </div>

        {/* Storm Warnings (only when active) */}
        {weatherData.warnings && weatherData.warnings.length > 0 && (
          <div className="mt-3 pt-3 border-t border-white border-opacity-20">
            {weatherData.warnings.map((warning, index) => (
              <div key={index} className="text-sm font-medium mb-1">
                <span className="font-bold">{warning.title}:</span> {warning.description}
                {warning.validUntil && (
                  <span className="ml-2 opacity-90">bis {formatTime(warning.validUntil)}</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Development Debug (only in dev mode) */}
        {process.env.NODE_ENV === 'development' && weatherData && (
          <div className="mt-2 pt-2 border-t border-white border-opacity-20">
            <div className="text-xs opacity-75">
              🔧 Debug: Alert-Level: {weatherData.alertLevel}, Condition: {weather.condition}, API: {weather.source}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OptimizedWeatherBanner;
