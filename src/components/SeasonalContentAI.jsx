import { useState, useEffect } from 'react';
import { AlertTriangle, Leaf, Sun, Wind } from 'lucide-react';
import { Badge } from '@/components/ui/badge.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';

const SeasonalContentAI = () => {
  const [currentSeason, setCurrentSeason] = useState(null);
  const [seasonalContent, setSeasonalContent] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  // KI-gesteuerte saisonale Content-Anpassung
  const getSeasonalStrategy = () => {
    const now = new Date();
    const month = now.getMonth();
    const day = now.getDate();

    // Erweiterte saisonale Logik mit KI-Optimierung
    const seasons = {
      winter: {
        months: [11, 0, 1], // Nov, Dez, Jan
        icon: Wind,
        priority: 'HOCH',
        urgency: 'emergency',
        mainService: 'Sturmschäden-Notdienst',
        keywords: ['sturmschäden', 'notdienst', 'winterfällung', 'sicherheit', 'eilig'],
        content: {
          hero: 'Sturmschäden? Sofortige Hilfe in Berlin & Brandenburg',
          description: '24h Notdienst für Sturmschäden. Professionelle Beseitigung gefährlicher Bäume nach Winterstürmen.',
          cta: 'NOTFALL HOTLINE',
          phone: '030 65 94 00 49',
          benefits: [
            '24/7 Notdienst verfügbar',
            'Schnelle Anfahrt innerhalb 2h',
            'Versicherungsabwicklung',
            'Gefahrenbeseitigung sofort'
          ]
        },
        seoBoost: {
          title: 'Sturmschäden Notdienst Berlin Brandenburg - 24h Hilfe | Baumfäller24',
          description: '🚨 Sturmschäden? Sofortige Hilfe in Berlin & Brandenburg! ✓ 24h Notdienst ✓ 2h Anfahrt ✓ Versicherung. Jetzt anrufen: 030 65 94 00 49',
          schema: 'EmergencyService'
        }
      },
      spring: {
        months: [2, 3, 4], // Feb, Mär, Apr
        icon: Leaf,
        priority: 'MITTEL',
        urgency: 'planned',
        mainService: 'Frühjahrs-Baumpflege',
        keywords: ['baumpflege', 'baumschnitt', 'frühjahr', 'gesundheit', 'wachstum'],
        content: {
          hero: 'Frühjahrs-Baumpflege für gesunde Bäume',
          description: 'Professionelle Baumpflege im Frühjahr. Optimaler Zeitpunkt für Schnittmaßnahmen und Gesundheitschecks.',
          cta: 'Termin vereinbaren',
          phone: '030 65 94 00 49',
          benefits: [
            'Optimaler Schnittzeitpunkt',
            'Förderung gesunden Wachstums',
            'Krankheitsprävention',
            'Langfristige Baumgesundheit'
          ]
        },
        seoBoost: {
          title: 'Frühjahrs Baumpflege Berlin Brandenburg - Professioneller Baumschnitt | Baumfäller24',
          description: '🌱 Frühjahrs-Baumpflege in Berlin & Brandenburg. ✓ Optimaler Schnittzeitpunkt ✓ Gesunde Bäume ✓ 12 Jahre Erfahrung. Jetzt Termin sichern!',
          schema: 'Service'
        }
      },
      summer: {
        months: [5, 6, 7], // Mai, Jun, Jul
        icon: Sun,
        priority: 'MITTEL',
        urgency: 'maintenance',
        mainService: 'Verkehrssicherung',
        keywords: ['verkehrssicherung', 'kronenauslichtung', 'sicherheit', 'präventiv'],
        content: {
          hero: 'Verkehrssicherung & Kronenauslichtung',
          description: 'Präventive Baumpflege für Verkehrssicherheit. Kronenauslichtung und Totholzentfernung.',
          cta: 'Sicherheitscheck buchen',
          phone: '030 65 94 00 49',
          benefits: [
            'Verkehrssicherheit gewährleisten',
            'Präventive Maßnahmen',
            'Kronenauslichtung fachgerecht',
            'Haftungsschutz für Eigentümer'
          ]
        },
        seoBoost: {
          title: 'Verkehrssicherung Bäume Berlin Brandenburg - Kronenauslichtung | Baumfäller24',
          description: '🛡️ Verkehrssicherung für Bäume in Berlin & Brandenburg. ✓ Kronenauslichtung ✓ Totholzentfernung ✓ Haftungsschutz. Sicherheitscheck jetzt!',
          schema: 'Service'
        }
      },
      autumn: {
        months: [8, 9, 10], // Aug, Sep, Okt
        icon: AlertTriangle,
        priority: 'HOCH',
        urgency: 'preventive',
        mainService: 'Sturmvorbereitung',
        keywords: ['baumkontrolle', 'sturmvorbereitung', 'sicherheitsprüfung', 'herbst'],
        content: {
          hero: 'Sturmvorbereitung - Baumkontrolle jetzt!',
          description: 'Professionelle Baumkontrolle zur Vorbereitung auf die Sturmsaison. Schwachstellen rechtzeitig erkennen.',
          cta: 'Kontrolle vereinbaren',
          phone: '030 65 94 00 49',
          benefits: [
            'Rechtzeitige Schwachstellenerkennung',
            'Sturmschäden vermeiden',
            'Professionelle Baumkontrolle',
            'Sicherheit vor Sturmsaison'
          ]
        },
        seoBoost: {
          title: 'Baumkontrolle Sturmvorbereitung Berlin Brandenburg | Baumfäller24',
          description: '🍂 Baumkontrolle vor Sturmsaison in Berlin & Brandenburg. ✓ Schwachstellen erkennen ✓ Sturmschäden vermeiden ✓ Profi-Check. Jetzt buchen!',
          schema: 'Service'
        }
      }
    };

    // Bestimme aktuelle Saison
    for (const [seasonName, seasonData] of Object.entries(seasons)) {
      if (seasonData.months.includes(month)) {
        return { name: seasonName, ...seasonData };
      }
    }

    return seasons.spring; // Fallback
  };

  // Wetter-basierte Content-Anpassung (KI-Enhancement)
  const getWeatherEnhancedContent = async (baseContent) => {
    try {
      // Simuliere Wetter-API Call (in Produktion: OpenWeatherMap API)
      const mockWeatherData = {
        condition: Math.random() > 0.7 ? 'storm' : 'normal',
        windSpeed: Math.floor(Math.random() * 50) + 10,
        temperature: Math.floor(Math.random() * 30) - 5
      };

      setWeatherData(mockWeatherData);

      // KI-basierte Content-Anpassung basierend auf Wetter
      if (mockWeatherData.condition === 'storm' || mockWeatherData.windSpeed > 40) {
        return {
          ...baseContent,
          urgencyBoost: true,
          content: {
            ...baseContent.content,
            hero: '🚨 STURMWARNUNG: Sofortige Baumkontrolle erforderlich!',
            description: 'Aktuelle Sturmwarnung für Berlin & Brandenburg. Lassen Sie gefährliche Bäume JETZT kontrollieren!',
            cta: 'NOTFALL HOTLINE',
            urgencyMessage: `Windgeschwindigkeit: ${mockWeatherData.windSpeed} km/h - Erhöhte Baumgefahr!`
          }
        };
      }

      return baseContent;
    } catch (error) {
      console.error('Weather enhancement failed:', error);
      return baseContent;
    }
  };

  // KI-gesteuerte Keyword-Optimierung basierend auf Saison
  const optimizeSeasonalKeywords = (season) => {
    const keywordBoosts = {
      winter: [
        'sturmschäden berlin notdienst',
        'baumfällung winter berlin',
        'notfall baumfällung brandenburg',
        'sturmschäden beseitigung sofort'
      ],
      spring: [
        'baumpflege frühjahr berlin',
        'baumschnitt berlin brandenburg',
        'frühjahrs baumschnitt termin',
        'baum gesundheitscheck berlin'
      ],
      summer: [
        'verkehrssicherung bäume berlin',
        'kronenauslichtung berlin',
        'baumpflege sommer brandenburg',
        'totholzentfernung berlin'
      ],
      autumn: [
        'baumkontrolle berlin herbst',
        'sturmvorbereitung bäume',
        'baumprüfung vor winter',
        'baumgutachten berlin'
      ]
    };

    return keywordBoosts[season.name] || [];
  };

  // Automatische SEO-Updates basierend auf Saison
  const updateSeasonalSEO = (season) => {
    // Update Meta Tags
    document.title = season.seoBoost.title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', season.seoBoost.description);
    }

    // Update Keywords
    const seasonalKeywords = optimizeSeasonalKeywords(season);
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', seasonalKeywords.join(', '));

    // Update Structured Data
    updateSeasonalStructuredData(season);
  };

  // Saisonale strukturierte Daten
  const updateSeasonalStructuredData = (season) => {
    const seasonalSchema = {
      "@context": "https://schema.org",
      "@type": season.seoBoost.schema === 'EmergencyService' ? "EmergencyService" : "Service",
      "name": season.mainService,
      "description": season.content.description,
      "provider": {
        "@type": "LocalBusiness",
        "name": "Baumfäller24",
        "telephone": "+49 30 65 94 00 49",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Tongruberweg 13",
          "addressLocality": "Berlin",
          "postalCode": "12559",
          "addressCountry": "DE"
        }
      },
      "areaServed": {
        "@type": "State",
        "name": "Berlin Brandenburg"
      },
      "availableChannel": {
        "@type": "ServiceChannel",
        "availableLanguage": "German",
        "servicePhone": "+49 30 65 94 00 49"
      }
    };

    // Notdienst-spezifische Erweiterungen
    if (season.urgency === 'emergency') {
      seasonalSchema.hoursAvailable = "24/7";
      seasonalSchema.category = "Emergency Tree Service";
    }

    // Entferne alte strukturierte Daten
    const existingScript = document.querySelector('script[data-seasonal="true"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Füge neue strukturierte Daten hinzu
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seasonal', 'true');
    script.textContent = JSON.stringify(seasonalSchema);
    document.head.appendChild(script);
  };

  // Initialisierung und Updates
  useEffect(() => {
    const initializeSeasonal = async () => {
      const season = getSeasonalStrategy();
      const enhancedSeason = await getWeatherEnhancedContent(season);
      
      setCurrentSeason(enhancedSeason);
      setSeasonalContent(enhancedSeason.content);
      
      // SEO Updates anwenden
      updateSeasonalSEO(enhancedSeason);
    };

    initializeSeasonal();

    // Aktualisiere alle 6 Stunden
    const interval = setInterval(initializeSeasonal, 6 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (!currentSeason || !seasonalContent) return null;

  const SeasonIcon = currentSeason.icon;

  return (
    <div className="seasonal-content-ai">
      {/* Saisonaler Hero-Banner */}
      <div className={`seasonal-banner ${currentSeason.urgencyBoost ? 'urgent' : ''} 
                      ${currentSeason.urgency === 'emergency' ? 'bg-red-600' : 'bg-green-600'} 
                      text-white py-3 px-4 text-center`}>
        <div className="flex items-center justify-center space-x-2">
          <SeasonIcon className="h-5 w-5" />
          <span className="font-semibold">{seasonalContent.hero}</span>
          {currentSeason.urgencyBoost && (
            <Badge variant="destructive" className="ml-2 animate-pulse">
              DRINGEND
            </Badge>
          )}
        </div>
        {weatherData && currentSeason.urgencyBoost && (
          <div className="text-sm mt-1 opacity-90">
            {seasonalContent.urgencyMessage}
          </div>
        )}
      </div>

      {/* Saisonaler Service-Fokus */}
      <Card className="mt-4 border-l-4 border-l-green-600">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <SeasonIcon className="h-6 w-6 text-green-600" />
              <span>{currentSeason.mainService}</span>
            </CardTitle>
            <Badge variant={currentSeason.urgency === 'emergency' ? 'destructive' : 'default'}>
              Priorität: {currentSeason.priority}
            </Badge>
          </div>
          <CardDescription>{seasonalContent.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Ihre Vorteile:</h4>
              <ul className="space-y-1">
                {seasonalContent.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center">
              <button className={`w-full py-3 px-6 rounded-lg font-semibold text-white
                                ${currentSeason.urgency === 'emergency' 
                                  ? 'bg-red-600 hover:bg-red-700 animate-pulse' 
                                  : 'bg-green-600 hover:bg-green-700'}`}>
                {seasonalContent.cta}
              </button>
              <p className="text-sm text-gray-600 mt-2">
                📞 {seasonalContent.phone}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Debug Info (nur in Development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 p-3 bg-gray-100 rounded text-xs">
          <strong>KI-Debug:</strong> Saison: {currentSeason.name}, 
          Wetter: {weatherData?.condition}, 
          Wind: {weatherData?.windSpeed}km/h,
          Keywords: {optimizeSeasonalKeywords(currentSeason).length}
        </div>
      )}
    </div>
  );
};

export default SeasonalContentAI;
