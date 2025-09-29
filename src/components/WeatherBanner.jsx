import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Wind, AlertTriangle, Phone } from 'lucide-react';

const WeatherBanner = () => {
  const [weather, setWeather] = useState(null);
  const [alertLevel, setAlertLevel] = useState('normal');
  const [loading, setLoading] = useState(true);

  // Simulierte Wetterdaten für Demo (später durch echte API ersetzen)
  const simulateWeatherData = () => {
    const currentHour = new Date().getHours();
    const isStormySeason = true; // Herbst/Winter
    
    // Simuliere verschiedene Wetterbedingungen basierend auf Tageszeit
    let windSpeed, temperature, condition;
    
    if (currentHour >= 6 && currentHour <= 18) {
      // Tagsüber - moderate Bedingungen
      windSpeed = Math.random() * 30 + 10; // 10-40 km/h
      temperature = Math.random() * 10 + 12; // 12-22°C
      condition = windSpeed > 25 ? 'windy' : 'partly-cloudy';
    } else {
      // Nachts - potentiell stürmischer
      windSpeed = Math.random() * 40 + 20; // 20-60 km/h
      temperature = Math.random() * 8 + 8; // 8-16°C
      condition = windSpeed > 45 ? 'storm' : windSpeed > 30 ? 'windy' : 'cloudy';
    }

    // Gelegentlich Sturm simulieren (10% Chance)
    if (Math.random() < 0.1 && isStormySeason) {
      windSpeed = Math.random() * 30 + 50; // 50-80 km/h
      condition = 'storm';
    }

    return {
      location: 'Berlin-Mitte',
      temperature: Math.round(temperature),
      windSpeed: Math.round(windSpeed),
      condition,
      description: getWeatherDescription(condition, windSpeed),
      timestamp: new Date().toLocaleTimeString('de-DE', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  };

  const getWeatherDescription = (condition, windSpeed) => {
    if (windSpeed > 50) return 'Sturm';
    if (windSpeed > 30) return 'Starker Wind';
    if (windSpeed > 15) return 'Mäßiger Wind';
    return 'Leichter Wind';
  };

  const determineAlertLevel = (windSpeed) => {
    if (windSpeed > 50) return 'storm';
    if (windSpeed > 30) return 'warning';
    return 'normal';
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'storm':
        return <Wind className="w-5 h-5 animate-bounce" />;
      case 'windy':
        return <Wind className="w-5 h-5" />;
      case 'rainy':
        return <CloudRain className="w-5 h-5" />;
      case 'cloudy':
        return <Cloud className="w-5 h-5" />;
      default:
        return <Sun className="w-5 h-5" />;
    }
  };

  const getAlertContent = (weather, level) => {
    const { location, temperature, windSpeed, description, timestamp } = weather;
    
    switch (level) {
      case 'storm':
        return {
          icon: <AlertTriangle className="w-5 h-5 animate-pulse" />,
          message: `🚨 STURMWARNUNG ${location}: ${temperature}°C, ${description} (${windSpeed} km/h) - NOTDIENST AKTIVIERT!`,
          cta: 'NOTFALL HOTLINE',
          ctaIcon: <Phone className="w-4 h-4" />,
          phone: '030 65 94 00 49',
          bgClass: 'bg-gradient-to-r from-red-600 to-red-700 text-white',
          pulseClass: 'animate-pulse'
        };
      
      case 'warning':
        return {
          icon: <AlertTriangle className="w-5 h-5" />,
          message: `⚠️ ${location}: ${temperature}°C, ${description} (${windSpeed} km/h) - Erhöhte Vorsicht bei Baumarbeiten`,
          cta: 'Sicherheitscheck buchen',
          ctaIcon: <Wind className="w-4 h-4" />,
          phone: '030 65 94 00 49',
          bgClass: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white',
          pulseClass: ''
        };
      
      default:
        return {
          icon: getWeatherIcon(weather.condition),
          message: `🌤️ ${location}: ${temperature}°C, ${description} (${windSpeed} km/h) - Optimale Bedingungen für Baumarbeiten`,
          cta: 'Termin vereinbaren',
          ctaIcon: <Sun className="w-4 h-4" />,
          phone: '030 65 94 00 49',
          bgClass: 'bg-gradient-to-r from-green-600 to-green-700 text-white',
          pulseClass: ''
        };
    }
  };

  const updateWeather = () => {
    setLoading(true);
    
    // Simuliere API-Aufruf Verzögerung
    setTimeout(() => {
      const weatherData = simulateWeatherData();
      const level = determineAlertLevel(weatherData.windSpeed);
      
      setWeather(weatherData);
      setAlertLevel(level);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    updateWeather();
    
    // Update alle 15 Minuten (in Produktion)
    // Für Demo: Update alle 30 Sekunden
    const interval = setInterval(updateWeather, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading || !weather) {
    return (
      <div className="w-full bg-gray-100 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <Wind className="w-4 h-4 animate-spin" />
            <span className="text-sm">Wetterdaten werden geladen...</span>
          </div>
        </div>
      </div>
    );
  }

  const alertContent = getAlertContent(weather, alertLevel);

  return (
    <div className={`w-full py-3 transition-all duration-500 ${alertContent.bgClass} ${alertContent.pulseClass}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          {/* Wetter-Information */}
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="flex-shrink-0">
              {alertContent.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {alertContent.message}
              </p>
              <p className="text-xs opacity-90">
                Letzte Aktualisierung: {weather.timestamp}
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

        {/* Zusätzliche Sturm-Information */}
        {alertLevel === 'storm' && (
          <div className="mt-2 pt-2 border-t border-white border-opacity-20">
            <div className="flex items-center justify-between text-xs">
              <span className="opacity-90">
                🌪️ Automatischer Notdienst-Modus aktiviert
              </span>
              <span className="opacity-90">
                24/7 Verfügbar • Sofortige Hilfe
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Debug-Information (nur in Entwicklung sichtbar) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-2 pt-2 border-t border-white border-opacity-20">
          <div className="container mx-auto px-4">
            <p className="text-xs opacity-75">
              Debug: Wind {weather.windSpeed}km/h, Alert-Level: {alertLevel}, 
              Condition: {weather.condition}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherBanner;
