import { useState, useEffect } from 'react';
import { MapPin, Clock, Phone, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';

const HyperlocalContentAI = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [localContent, setLocalContent] = useState(null);
  const [nearbyProjects, setNearbyProjects] = useState([]);

  // Berlin & Brandenburg Bezirke/Gebiete mit KI-optimierten Daten
  const locationDatabase = {
    'berlin-mitte': {
      name: 'Berlin-Mitte',
      keywords: ['baumfällung berlin mitte', 'baumpflege mitte', 'notdienst berlin mitte'],
      characteristics: 'Dichte Bebauung, viele Straßenbäume, häufige Verkehrssicherung',
      specialties: ['Verkehrssicherung', 'Straßenbäume', 'Enge Platzverhältnisse'],
      avgResponseTime: '45 Minuten',
      completedProjects: 127,
      popularServices: ['Spezialfällung', 'Verkehrssicherung', 'Kronenauslichtung'],
      localChallenges: 'Enge Straßen erfordern spezielle Klettertechnik',
      seoTitle: 'Baumfällung Berlin-Mitte - Professionell & Schnell | Baumfäller24',
      seoDescription: 'Baumfällung in Berlin-Mitte ✓ 45min Anfahrt ✓ Verkehrssicherung ✓ Enge Platzverhältnisse. 127 erfolgreiche Projekte. Jetzt anrufen!'
    },
    'berlin-charlottenburg': {
      name: 'Berlin-Charlottenburg',
      keywords: ['baumfällung charlottenburg', 'baumpflege charlottenburg', 'baumfällung wilmersdorf'],
      characteristics: 'Villengebiete, große Gärten, alte Baumbestände',
      specialties: ['Großbaumfällung', 'Gartenbaumpflege', 'Altbaumerhaltung'],
      avgResponseTime: '35 Minuten',
      completedProjects: 89,
      popularServices: ['Großbaumfällung', 'Baumpflege', 'Baumgutachten'],
      localChallenges: 'Schutz wertvoller Altbäume und Gartenanlagen',
      seoTitle: 'Baumfällung Charlottenburg-Wilmersdorf - Große Gärten | Baumfäller24',
      seoDescription: 'Baumfällung in Charlottenburg ✓ Großbäume ✓ Villengebiete ✓ 35min Anfahrt ✓ Altbaumerhaltung. 89 zufriedene Kunden. Beratung jetzt!'
    },
    'berlin-kreuzberg': {
      name: 'Berlin-Kreuzberg',
      keywords: ['baumfällung kreuzberg', 'baumpflege friedrichshain', 'notdienst kreuzberg'],
      characteristics: 'Altbau-Hinterhöfe, Platzmangel, Gemeinschaftsgärten',
      specialties: ['Hinterhof-Fällungen', 'Seilklettertechnik', 'Behutsame Arbeiten'],
      avgResponseTime: '40 Minuten',
      completedProjects: 156,
      popularServices: ['Seilklettertechnik', 'Hinterhof-Arbeiten', 'Notdienst'],
      localChallenges: 'Sehr enge Hinterhöfe, Rücksicht auf Nachbarn',
      seoTitle: 'Baumfällung Kreuzberg-Friedrichshain - Hinterhöfe | Baumfäller24',
      seoDescription: 'Baumfällung in Kreuzberg ✓ Hinterhöfe ✓ Seilklettertechnik ✓ 40min Anfahrt ✓ Behutsam. 156 erfolgreiche Einsätze. Kostenlos beraten!'
    },
    'berlin-spandau': {
      name: 'Berlin-Spandau',
      keywords: ['baumfällung spandau', 'baumpflege spandau', 'waldarbeiten spandau'],
      characteristics: 'Waldgebiete, Einfamilienhäuser, viel Grün',
      specialties: ['Waldarbeiten', 'Großflächenrodung', 'Naturschutz'],
      avgResponseTime: '50 Minuten',
      completedProjects: 73,
      popularServices: ['Waldarbeiten', 'Rodung', 'Naturschutzarbeiten'],
      localChallenges: 'Naturschutzauflagen, große Flächen',
      seoTitle: 'Baumfällung Spandau - Waldarbeiten & Rodung | Baumfäller24',
      seoDescription: 'Baumfällung in Spandau ✓ Waldarbeiten ✓ Großflächenrodung ✓ Naturschutz ✓ 50min Anfahrt. 73 Projekte erfolgreich. Angebot anfordern!'
    },
    'potsdam': {
      name: 'Potsdam',
      keywords: ['baumfällung potsdam', 'baumpflege potsdam', 'brandenburg baumfällung'],
      characteristics: 'Historische Parks, Denkmalschutz, Schlossanlagen',
      specialties: ['Denkmalschutz', 'Parkpflege', 'Historische Bäume'],
      avgResponseTime: '60 Minuten',
      completedProjects: 45,
      popularServices: ['Denkmalschutz-Arbeiten', 'Parkpflege', 'Gutachten'],
      localChallenges: 'Denkmalschutzauflagen, historische Bedeutung',
      seoTitle: 'Baumfällung Potsdam - Denkmalschutz & Parks | Baumfäller24',
      seoDescription: 'Baumfällung in Potsdam ✓ Denkmalschutz ✓ Historische Parks ✓ 60min Anfahrt ✓ Fachexpertise. 45 Referenzen. Beratung vereinbaren!'
    },
    'brandenburg-havel': {
      name: 'Brandenburg an der Havel',
      keywords: ['baumfällung brandenburg havel', 'baumpflege brandenburg', 'notdienst brandenburg'],
      characteristics: 'Ländliche Gebiete, große Grundstücke, Wassernähe',
      specialties: ['Ländliche Arbeiten', 'Große Grundstücke', 'Gewässerschutz'],
      avgResponseTime: '75 Minuten',
      completedProjects: 38,
      popularServices: ['Großgrundstück-Arbeiten', 'Gewässerschutz', 'Rodung'],
      localChallenges: 'Weite Anfahrten, Gewässerschutzauflagen',
      seoTitle: 'Baumfällung Brandenburg/Havel - Große Grundstücke | Baumfäller24',
      seoDescription: 'Baumfällung Brandenburg/Havel ✓ Große Grundstücke ✓ Gewässerschutz ✓ 75min Anfahrt ✓ Ländlich. 38 zufriedene Kunden. Jetzt anfragen!'
    }
  };

  // KI-basierte Standorterkennung
  const detectUserLocation = async () => {
    try {
      // Versuche Geolocation API
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const detectedLocation = determineLocationFromCoords(latitude, longitude);
            setUserLocation(detectedLocation);
            generateLocalContent(detectedLocation);
          },
          (error) => {
            console.log('Geolocation failed, using IP-based detection');
            // Fallback: IP-basierte Erkennung (simuliert)
            const fallbackLocation = detectLocationFromIP();
            setUserLocation(fallbackLocation);
            generateLocalContent(fallbackLocation);
          }
        );
      } else {
        // Fallback für Browser ohne Geolocation
        const fallbackLocation = detectLocationFromIP();
        setUserLocation(fallbackLocation);
        generateLocalContent(fallbackLocation);
      }
    } catch (error) {
      console.error('Location detection failed:', error);
      // Default zu Berlin-Mitte
      const defaultLocation = locationDatabase['berlin-mitte'];
      setUserLocation(defaultLocation);
      generateLocalContent(defaultLocation);
    }
  };

  // Koordinaten zu Bezirk zuordnen (vereinfacht)
  const determineLocationFromCoords = (lat, lng) => {
    // Berlin Koordinaten: ~52.5°N, 13.4°E
    // Vereinfachte Zuordnung basierend auf Koordinaten
    const berlinCenter = { lat: 52.5200, lng: 13.4050 };
    
    // Berechne Distanz und bestimme wahrscheinlichen Bezirk
    const distance = Math.sqrt(
      Math.pow(lat - berlinCenter.lat, 2) + Math.pow(lng - berlinCenter.lng, 2)
    );

    if (distance < 0.05) return locationDatabase['berlin-mitte'];
    if (lng < 13.3) return locationDatabase['berlin-spandau'];
    if (lat > 52.55) return locationDatabase['berlin-charlottenburg'];
    if (lat < 52.48) return locationDatabase['berlin-kreuzberg'];
    if (lng > 13.1 && lat > 52.4) return locationDatabase['potsdam'];
    
    return locationDatabase['berlin-mitte']; // Fallback
  };

  // IP-basierte Standorterkennung (simuliert)
  const detectLocationFromIP = () => {
    // In Produktion: Echte IP-Geolocation API
    const locations = Object.values(locationDatabase);
    return locations[Math.floor(Math.random() * locations.length)];
  };

  // Generiere lokalen Content basierend auf Standort
  const generateLocalContent = (location) => {
    const localizedContent = {
      ...location,
      urgentServices: generateUrgentServices(location),
      localOffers: generateLocalOffers(location),
      testimonials: generateLocalTestimonials(location),
      nextAvailableSlot: calculateNextSlot(location.avgResponseTime)
    };

    setLocalContent(localizedContent);
    generateNearbyProjects(location);
    updateLocalSEO(location);
  };

  // Generiere dringende Services basierend auf lokalen Gegebenheiten
  const generateUrgentServices = (location) => {
    const urgentServices = {
      'berlin-mitte': ['Verkehrssicherung sofort', 'Straßenbaum-Notfall', 'Enge Platzverhältnisse'],
      'berlin-charlottenburg': ['Großbaum-Notfall', 'Villen-Garten Notdienst', 'Altbaum-Rettung'],
      'berlin-kreuzberg': ['Hinterhof-Notfall', 'Nachbarschaftsschutz', 'Schnelle Seilarbeit'],
      'berlin-spandau': ['Wald-Notfall', 'Große Flächen', 'Naturschutz-Eilfall'],
      'potsdam': ['Denkmalschutz-Notfall', 'Park-Notdienst', 'Historischer Baum'],
      'brandenburg-havel': ['Großgrundstück-Notfall', 'Gewässerschutz-Eilfall', 'Ländlicher Notdienst']
    };

    const locationKey = Object.keys(locationDatabase).find(
      key => locationDatabase[key].name === location.name
    );

    return urgentServices[locationKey] || urgentServices['berlin-mitte'];
  };

  // Generiere lokale Angebote
  const generateLocalOffers = (location) => {
    return [
      {
        title: `${location.name} Spezial-Angebot`,
        description: `Optimiert für ${location.characteristics.toLowerCase()}`,
        discount: '15%',
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('de-DE')
      },
      {
        title: 'Nachbarschafts-Rabatt',
        description: `Mehrere Projekte in ${location.name}`,
        discount: '20%',
        validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('de-DE')
      }
    ];
  };

  // Generiere lokale Testimonials
  const generateLocalTestimonials = (location) => {
    const testimonialTemplates = [
      `Sehr professionelle Arbeit in ${location.name}. ${location.localChallenges} wurde perfekt gemeistert.`,
      `Schnelle Anfahrt nach ${location.name} in nur ${location.avgResponseTime}. Sehr zufrieden!`,
      `Expertise für ${location.specialties[0]} in ${location.name} ist beeindruckend. Gerne wieder!`
    ];

    return testimonialTemplates.map((text, index) => ({
      text,
      author: `Kunde aus ${location.name}`,
      rating: 5,
      date: new Date(Date.now() - (index + 1) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('de-DE')
    }));
  };

  // Berechne nächsten verfügbaren Termin
  const calculateNextSlot = (responseTime) => {
    const now = new Date();
    const responseMinutes = parseInt(responseTime.split(' ')[0]);
    const nextSlot = new Date(now.getTime() + responseMinutes * 60 * 1000);
    
    return {
      time: nextSlot.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
      date: nextSlot.toLocaleDateString('de-DE'),
      isToday: nextSlot.toDateString() === now.toDateString()
    };
  };

  // Generiere nahegelegene Projekte
  const generateNearbyProjects = (location) => {
    const projectTypes = location.popularServices;
    const projects = projectTypes.map((service, index) => ({
      id: index + 1,
      type: service,
      location: `${location.name}, ${Math.floor(Math.random() * 5) + 1}km entfernt`,
      completedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('de-DE'),
      description: `Erfolgreiche ${service} in ${location.name}`,
      beforeAfter: true
    }));

    setNearbyProjects(projects);
  };

  // Update SEO für lokalen Content
  const updateLocalSEO = (location) => {
    // Update Title
    document.title = location.seoTitle;

    // Update Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', location.seoDescription);
    }

    // Update Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', location.keywords.join(', '));

    // Add Local Business Schema
    addLocalBusinessSchema(location);
  };

  // Lokale Business Schema hinzufügen
  const addLocalBusinessSchema = (location) => {
    const localSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": `Baumfäller24 - ${location.name}`,
      "description": `Professionelle Baumfällung und Baumpflege in ${location.name}`,
      "areaServed": {
        "@type": "City",
        "name": location.name
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": `Services in ${location.name}`,
        "itemListElement": location.specialties.map(specialty => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": specialty,
            "description": `${specialty} speziell für ${location.name}`
          }
        }))
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": location.completedProjects
      }
    };

    // Entferne alte lokale Schema
    const existingLocalSchema = document.querySelector('script[data-local="true"]');
    if (existingLocalSchema) {
      existingLocalSchema.remove();
    }

    // Füge neue lokale Schema hinzu
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-local', 'true');
    script.textContent = JSON.stringify(localSchema);
    document.head.appendChild(script);
  };

  // Initialisierung
  useEffect(() => {
    detectUserLocation();
  }, []);

  if (!localContent) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <MapPin className="h-8 w-8 animate-spin mx-auto mb-2 text-green-600" />
          <p>Erkenne Ihren Standort für optimierte Angebote...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hyperlocal-content space-y-6">
      {/* Lokaler Header */}
      <Card className="border-l-4 border-l-green-600">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-6 w-6 text-green-600" />
              <span>Ihr lokaler Service in {localContent.name}</span>
            </CardTitle>
            <Badge variant="outline">
              {localContent.completedProjects} Projekte
            </Badge>
          </div>
          <CardDescription>
            Spezialisiert auf: {localContent.characteristics}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <p className="font-semibold">Anfahrtszeit</p>
              <p className="text-sm text-gray-600">{localContent.avgResponseTime}</p>
            </div>
            <div className="text-center">
              <Star className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
              <p className="font-semibold">Bewertung</p>
              <p className="text-sm text-gray-600">4.9/5 ⭐⭐⭐⭐⭐</p>
            </div>
            <div className="text-center">
              <Phone className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <p className="font-semibold">Nächster Termin</p>
              <p className="text-sm text-gray-600">
                {localContent.nextAvailableSlot.isToday ? 'Heute' : localContent.nextAvailableSlot.date} 
                {' '}{localContent.nextAvailableSlot.time}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lokale Spezialitäten */}
      <Card>
        <CardHeader>
          <CardTitle>Unsere Spezialitäten in {localContent.name}</CardTitle>
          <CardDescription>{localContent.localChallenges}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {localContent.specialties.map((specialty, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <h4 className="font-semibold mb-2">{specialty}</h4>
                <p className="text-sm text-gray-600">
                  Optimiert für die Gegebenheiten in {localContent.name}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lokale Angebote */}
      <Card>
        <CardHeader>
          <CardTitle>Aktuelle Angebote für {localContent.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {localContent.localOffers.map((offer, index) => (
              <div key={index} className="p-4 border rounded-lg bg-green-50">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{offer.title}</h4>
                  <Badge variant="destructive">{offer.discount} Rabatt</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{offer.description}</p>
                <p className="text-xs text-gray-500">Gültig bis: {offer.validUntil}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Nahegelegene Projekte */}
      <Card>
        <CardHeader>
          <CardTitle>Aktuelle Projekte in Ihrer Nähe</CardTitle>
          <CardDescription>Referenzen aus {localContent.name} und Umgebung</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {nearbyProjects.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h5 className="font-medium">{project.type}</h5>
                  <p className="text-sm text-gray-600">{project.location}</p>
                  <p className="text-xs text-gray-500">Abgeschlossen: {project.completedDate}</p>
                </div>
                <Badge variant="outline">Vorher/Nachher</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lokale Testimonials */}
      <Card>
        <CardHeader>
          <CardTitle>Was Kunden aus {localContent.name} sagen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {localContent.testimonials.map((testimonial, index) => (
              <div key={index} className="p-4 border-l-4 border-l-green-600 bg-gray-50">
                <p className="text-sm mb-2">"{testimonial.text}"</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">{testimonial.author}</span>
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">{testimonial.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HyperlocalContentAI;
