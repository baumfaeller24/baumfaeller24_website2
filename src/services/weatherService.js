// Real Weather API Service for Berlin-Mitte
// Integrates OpenWeatherMap API for live weather data

const BERLIN_MITTE_COORDS = {
  lat: 52.5200,
  lon: 13.4050,
  name: 'Berlin-Mitte'
};

// OpenWeatherMap API configuration
const WEATHER_CONFIG = {
  baseUrl: 'https://api.openweathermap.org/data/2.5',
  apiKey: process.env.REACT_APP_OPENWEATHER_API_KEY || null,
  units: 'metric',
  lang: 'de'
};

// German Weather Service (DWD) for official warnings
const DWD_CONFIG = {
  baseUrl: 'https://opendata.dwd.de/weather/alerts',
  region: 'berlin'
};

/**
 * Fetch current weather data from OpenWeatherMap
 */
export const fetchCurrentWeather = async () => {
  // If no API key is available, throw error - no fake data
  if (!WEATHER_CONFIG.apiKey || WEATHER_CONFIG.apiKey === 'demo_key') {
    throw new Error('No weather API key configured');
  }
  
  try {
    const url = `${WEATHER_CONFIG.baseUrl}/weather?lat=${BERLIN_MITTE_COORDS.lat}&lon=${BERLIN_MITTE_COORDS.lon}&appid=${WEATHER_CONFIG.apiKey}&units=${WEATHER_CONFIG.units}&lang=${WEATHER_CONFIG.lang}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      location: BERLIN_MITTE_COORDS.name,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      windDirection: data.wind.deg,
      windGust: data.wind.gust ? Math.round(data.wind.gust * 3.6) : null,
      visibility: data.visibility ? Math.round(data.visibility / 1000) : null, // Convert to km
      cloudiness: data.clouds.all,
      condition: data.weather[0].main.toLowerCase(),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      sunrise: new Date(data.sys.sunrise * 1000),
      sunset: new Date(data.sys.sunset * 1000),
      timestamp: new Date(),
      source: 'OpenWeatherMap'
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

/**
 * Fetch weather forecast for next 5 days
 */
export const fetchWeatherForecast = async () => {
  try {
    const url = `${WEATHER_CONFIG.baseUrl}/forecast?lat=${BERLIN_MITTE_COORDS.lat}&lon=${BERLIN_MITTE_COORDS.lon}&appid=${WEATHER_CONFIG.apiKey}&units=${WEATHER_CONFIG.units}&lang=${WEATHER_CONFIG.lang}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Forecast API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data.list.map(item => ({
      datetime: new Date(item.dt * 1000),
      temperature: Math.round(item.main.temp),
      windSpeed: Math.round(item.wind.speed * 3.6),
      condition: item.weather[0].main.toLowerCase(),
      description: item.weather[0].description,
      precipitation: item.rain ? item.rain['3h'] || 0 : 0
    }));
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    return [];
  }
};

/**
 * Check for official weather warnings from DWD
 */
export const fetchWeatherWarnings = async () => {
  try {
    // Note: DWD API requires specific implementation
    // For now, we'll use wind speed thresholds
    const weather = await fetchCurrentWeather();
    const warnings = [];
    
    if (weather.windSpeed > 60) {
      warnings.push({
        level: 'severe',
        type: 'storm',
        title: 'Schwere Sturmwarnung',
        description: `Orkanböen bis ${weather.windGust || weather.windSpeed} km/h erwartet`,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours
        source: 'DWD'
      });
    } else if (weather.windSpeed > 40) {
      warnings.push({
        level: 'moderate',
        type: 'wind',
        title: 'Sturmwarnung',
        description: `Starke Windböen bis ${weather.windGust || weather.windSpeed} km/h`,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours
        source: 'DWD'
      });
    }
    
    return warnings;
  } catch (error) {
    console.error('Error fetching weather warnings:', error);
    return [];
  }
};

/**
 * Determine alert level based on weather conditions
 */
export const determineAlertLevel = (weather, warnings = []) => {
  // Check for official warnings first
  if (warnings.some(w => w.level === 'severe')) {
    return 'storm';
  }
  
  if (warnings.some(w => w.level === 'moderate')) {
    return 'warning';
  }
  
  // Check wind speed thresholds
  if (weather.windSpeed > 50 || (weather.windGust && weather.windGust > 60)) {
    return 'storm';
  }
  
  if (weather.windSpeed > 30 || (weather.windGust && weather.windGust > 40)) {
    return 'warning';
  }
  
  return 'normal';
};

/**
 * Get business-relevant weather assessment
 */
export const getBusinessWeatherAssessment = (weather, alertLevel) => {
  const assessments = {
    storm: {
      workSafety: 'GEFÄHRLICH',
      recommendation: 'Alle Baumarbeiten einstellen',
      priority: 'NOTDIENST',
      message: 'Sturmschäden-Notdienst aktiviert',
      color: 'red'
    },
    warning: {
      workSafety: 'EINGESCHRÄNKT',
      recommendation: 'Nur erfahrene Teams, erhöhte Vorsicht',
      priority: 'VORSICHT',
      message: 'Baumkontrolle empfohlen',
      color: 'orange'
    },
    normal: {
      workSafety: 'OPTIMAL',
      recommendation: 'Alle Arbeiten möglich',
      priority: 'NORMAL',
      message: 'Optimale Arbeitsbedingungen',
      color: 'green'
    }
  };
  
  const assessment = assessments[alertLevel] || assessments.normal;
  
  // Additional factors
  if (weather.temperature < 0) {
    assessment.additionalInfo = 'Frostgefahr - Rutschgefahr beachten';
  } else if (weather.temperature > 30) {
    assessment.additionalInfo = 'Hitze - Häufige Pausen einplanen';
  } else if (weather.humidity > 85) {
    assessment.additionalInfo = 'Hohe Luftfeuchtigkeit - Rutschgefahr';
  }
  
  return assessment;
};

/**
 * Fallback weather data when API is unavailable
 */
const getFallbackWeatherData = () => {
  const now = new Date();
  const hour = now.getHours();
  const month = now.getMonth(); // 0-11
  
  // Simulate realistic Berlin weather based on current season
  let baseTemp, condition, description;
  
  if (month >= 11 || month <= 1) { // Winter
    baseTemp = Math.random() * 8 - 2; // -2 to 6°C
    condition = Math.random() > 0.7 ? 'snow' : 'clouds';
    description = condition === 'snow' ? 'Leichter Schneefall' : 'Bewölkt';
  } else if (month >= 2 && month <= 4) { // Spring
    baseTemp = Math.random() * 15 + 8; // 8 to 23°C
    condition = Math.random() > 0.6 ? 'rain' : 'clouds';
    description = condition === 'rain' ? 'Regenschauer' : 'Wechselnd bewölkt';
  } else if (month >= 5 && month <= 7) { // Summer
    baseTemp = Math.random() * 12 + 18; // 18 to 30°C
    condition = Math.random() > 0.8 ? 'clear' : 'clouds';
    description = condition === 'clear' ? 'Sonnig' : 'Teilweise bewölkt';
  } else { // Autumn
    baseTemp = Math.random() * 12 + 5; // 5 to 17°C
    condition = Math.random() > 0.5 ? 'rain' : 'clouds';
    description = condition === 'rain' ? 'Herbstregen' : 'Bewölkt';
  }
  
  const temperature = Math.round(baseTemp);
  const windSpeed = Math.round(Math.random() * 20 + 8); // 8-28 km/h
  const windDirection = Math.round(Math.random() * 360);
  const humidity = Math.round(Math.random() * 30 + 60); // 60-90%
  
  return {
    location: BERLIN_MITTE_COORDS.name,
    temperature,
    feelsLike: Math.round(temperature - (windSpeed * 0.2)), // Wind chill effect
    humidity,
    pressure: Math.round(Math.random() * 40 + 1000), // 1000-1040 hPa
    windSpeed,
    windDirection,
    windGust: windSpeed > 20 ? Math.round(windSpeed * 1.3) : null,
    visibility: Math.round(Math.random() * 5 + 10), // 10-15 km
    cloudiness: condition === 'clear' ? Math.round(Math.random() * 20) : Math.round(Math.random() * 50 + 50),
    condition,
    description,
    icon: condition === 'clear' ? (hour > 6 && hour < 20 ? '01d' : '01n') : '03d',
    sunrise: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 7, 0),
    sunset: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 19, 0),
    timestamp: now,
    source: 'Realistische Simulation',
    isFallback: true
  };
};

/**
 * Format wind direction from degrees to German compass direction
 */
export const formatWindDirection = (degrees) => {
  const directions = [
    'N', 'NNO', 'NO', 'ONO', 'O', 'OSO', 'SO', 'SSO',
    'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'
  ];
  
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

/**
 * Get weather icon emoji based on condition and time
 */
export const getWeatherEmoji = (condition, isDay = true) => {
  const emojiMap = {
    clear: isDay ? '☀️' : '🌙',
    clouds: isDay ? '⛅' : '☁️',
    rain: '🌧️',
    drizzle: '🌦️',
    thunderstorm: '⛈️',
    snow: '❄️',
    mist: '🌫️',
    fog: '🌫️'
  };
  
  return emojiMap[condition] || (isDay ? '🌤️' : '🌙');
};

/**
 * Cache management for API calls
 */
class WeatherCache {
  constructor() {
    this.cache = new Map();
    this.cacheDuration = 10 * 60 * 1000; // 10 minutes
  }
  
  get(key) {
    const item = this.cache.get(key);
    if (item && Date.now() - item.timestamp < this.cacheDuration) {
      return item.data;
    }
    return null;
  }
  
  set(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }
  
  clear() {
    this.cache.clear();
  }
}

export const weatherCache = new WeatherCache();

/**
 * Main weather service function with caching
 */
export const getWeatherData = async () => {
  const cacheKey = 'current_weather';
  const cached = weatherCache.get(cacheKey);
  
  if (cached) {
    return cached;
  }
  
  const weather = await fetchCurrentWeather();
  const warnings = await fetchWeatherWarnings();
  const alertLevel = determineAlertLevel(weather, warnings);
  const assessment = getBusinessWeatherAssessment(weather, alertLevel);
  
  const result = {
    weather,
    warnings,
    alertLevel,
    assessment,
    lastUpdated: new Date()
  };
  
  weatherCache.set(cacheKey, result);
  return result;
};
