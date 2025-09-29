import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Wind, AlertTriangle, Phone, Thermometer, Eye, Droplets } from 'lucide-react';
import { getWeatherData, getWeatherEmoji, formatWindDirection } from '../services/weatherService';

const RealWeatherBanner = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const updateWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await getWeatherData();
      setWeatherData(data);
      setLastUpdate(new Date());
      
    } catch (err) {
      console.error('Weather update failed:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateWeather();
    
    // Update every 15 minutes for real API
    // For demo without API key: every 2 minutes
    const interval = setInterval(updateWeather, 15 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const getAlertContent = (data) => {
    if (!data) return null;
    
    const { weather, alertLevel, assessment, warnings } = data;
    const emoji = getWeatherEmoji(weather.condition, isDay());
    const windDir = weather.windDirection ? formatWindDirection(weather.windDirection) : '';
    
    const baseMessage = `${emoji} ${weather.location}: ${weather.temperature}°C, ${weather.description}`;
    const windInfo = `Wind: ${windDir} ${weather.windSpeed} km/h${weather.windGust ? ` (Böen ${weather.windGust} km/h)` : ''}`;
    
    switch (alertLevel) {
      case 'storm':
        return {
          icon: <AlertTriangle className="w-5 h-5 animate-pulse" />,
          message: `🚨 STURMWARNUNG ${weather.location}`,
          details: `${weather.temperature}°C • ${windInfo}`,
          businessInfo: assessment.message,
          cta: 'NOTFALL HOTLINE',
          ctaIcon: <Phone className="w-4 h-4" />,
          phone: '030 65 94 00 49',
          bgClass: 'bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white',
          pulseClass: 'animate-pulse',
          priority: 'KRITISCH',
          warnings: warnings.filter(w => w.level === 'severe')
        };
      
      case 'warning':
        return {
          icon: <Wind className="w-5 h-5" />,
          message: `⚠️ WINDWARNUNG ${weather.location}`,
          details: `${weather.temperature}°C • ${windInfo}`,
          businessInfo: assessment.message,
          cta: 'Sicherheitscheck',
          ctaIcon: <AlertTriangle className="w-4 h-4" />,
          phone: '030 65 94 00 49',
          bgClass: 'bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white',
          pulseClass: '',
          priority: 'ERHÖHT',
          warnings: warnings.filter(w => w.level === 'moderate')
        };
      
      default:
        return {
          icon: getWeatherIcon(weather.condition),
          message: baseMessage,
          details: windInfo,
          businessInfo: assessment.message,
          cta: 'Termin buchen',
          ctaIcon: <Sun className="w-4 h-4" />,
          phone: '030 65 94 00 49',
          bgClass: 'bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white',
          pulseClass: '',
          priority: 'OPTIMAL',
          warnings: []
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
            <span className="text-sm">Aktuelle Wetterdaten für Berlin-Mitte werden geladen...</span>
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
            <span className="text-sm">Wetterdaten temporär nicht verfügbar - Fallback-Modus aktiv</span>
          </div>
        </div>
      </div>
    );
  }

  const alertContent = getAlertContent(weatherData);
  if (!alertContent) return null;

  return (
    <div className={`w-full py-3 transition-all duration-500 ${alertContent.bgClass} ${alertContent.pulseClass}`}>
      <div className="container mx-auto px-4">
        {/* Main Weather Information */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="flex-shrink-0">
              {alertContent.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <p className="text-sm font-bold truncate">
                  {alertContent.message}
                </p>
                {alertContent.priority && (
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    alertContent.priority === 'KRITISCH' ? 'bg-red-900 text-red-100' :
                    alertContent.priority === 'ERHÖHT' ? 'bg-orange-900 text-orange-100' :
                    'bg-green-900 text-green-100'
                  }`}>
                    {alertContent.priority}
                  </span>
                )}
              </div>
              <p className="text-xs opacity-90 truncate">
                {alertContent.details} • {alertContent.businessInfo}
              </p>
            </div>
          </div>

          {/* Call-to-Action */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <button 
              onClick={() => window.location.href = `tel:${alertContent.phone}`}
              className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 
                         px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium
                         backdrop-blur-sm border border-white border-opacity-20"
            >
              {alertContent.ctaIcon}
              <span className="hidden sm:inline">{alertContent.cta}</span>
              <span className="sm:hidden">{alertContent.phone}</span>
            </button>
          </div>
        </div>

        {/* Additional Weather Details */}
        {weatherData && weatherData.weather && (
          <div className="mt-2 pt-2 border-t border-white border-opacity-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="flex items-center space-x-1 opacity-90">
                <Thermometer className="w-3 h-3" />
                <span>Gefühlt {weatherData.weather.feelsLike}°C</span>
              </div>
              <div className="flex items-center space-x-1 opacity-90">
                <Droplets className="w-3 h-3" />
                <span>Luftfeuchtigkeit {weatherData.weather.humidity}%</span>
              </div>
              {weatherData.weather.visibility && (
                <div className="flex items-center space-x-1 opacity-90">
                  <Eye className="w-3 h-3" />
                  <span>Sicht {weatherData.weather.visibility} km</span>
                </div>
              )}
              <div className="flex items-center space-x-1 opacity-90">
                <span>Update: {formatTime(weatherData.lastUpdated)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Storm Warnings */}
        {alertContent.warnings && alertContent.warnings.length > 0 && (
          <div className="mt-2 pt-2 border-t border-white border-opacity-20">
            {alertContent.warnings.map((warning, index) => (
              <div key={index} className="text-xs opacity-95 mb-1">
                <span className="font-semibold">{warning.title}:</span> {warning.description}
                {warning.validUntil && (
                  <span className="ml-2">bis {formatTime(warning.validUntil)}</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Business Assessment */}
        {weatherData && weatherData.assessment && (
          <div className="mt-2 pt-2 border-t border-white border-opacity-20">
            <div className="flex items-center justify-between text-xs">
              <span className="opacity-90">
                🏗️ Arbeitssicherheit: {weatherData.assessment.workSafety}
              </span>
              <span className="opacity-90">
                💡 {weatherData.assessment.recommendation}
              </span>
            </div>
            {weatherData.assessment.additionalInfo && (
              <div className="mt-1 text-xs opacity-90">
                ℹ️ {weatherData.assessment.additionalInfo}
              </div>
            )}
          </div>
        )}

        {/* Data Source & API Status */}
        <div className="mt-2 pt-2 border-t border-white border-opacity-20">
          <div className="flex items-center justify-between text-xs opacity-75">
            <span>
              📡 Quelle: {weatherData?.weather?.source || 'OpenWeatherMap'} 
              {weatherData?.weather?.isFallback && ' (Fallback)'}
            </span>
            <span>
              🔄 Nächstes Update: {formatTime(new Date(Date.now() + 15 * 60 * 1000))}
            </span>
          </div>
        </div>

        {/* Development Debug Info */}
        {process.env.NODE_ENV === 'development' && weatherData && (
          <div className="mt-2 pt-2 border-t border-white border-opacity-20">
            <div className="text-xs opacity-75">
              🔧 Debug: Wind {weatherData.weather.windSpeed}km/h
              {weatherData.weather.windGust && ` (Böen ${weatherData.weather.windGust}km/h)`}, 
              Alert: {weatherData.alertLevel}, 
              Condition: {weatherData.weather.condition},
              API: {weatherData.weather.source}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealWeatherBanner;
