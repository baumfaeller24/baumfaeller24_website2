import { useState, useEffect } from 'react';
import { Star, MessageCircle, TrendingUp, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';

const ReviewManagementAI = () => {
  const [reviews, setReviews] = useState([]);
  const [aiResponses, setAiResponses] = useState({});
  const [sentimentAnalysis, setSentimentAnalysis] = useState(null);
  const [reviewInsights, setReviewInsights] = useState(null);

  // Simulierte Review-Daten (in Produktion: Google My Business API)
  const mockReviews = [
    {
      id: 1,
      author: "Michael K.",
      rating: 5,
      text: "Sehr professionelle Baumfällung in Berlin-Mitte. Trotz enger Platzverhältnisse wurde alles perfekt erledigt. Kann ich nur empfehlen!",
      date: "2024-09-25",
      platform: "Google",
      location: "Berlin-Mitte",
      service: "Baumfällung",
      sentiment: "positive",
      keywords: ["professionell", "enge Platzverhältnisse", "perfekt"],
      responded: false
    },
    {
      id: 2,
      author: "Sarah M.",
      rating: 4,
      text: "Gute Arbeit bei der Baumpflege in unserem Garten. Einziger Kritikpunkt: Die Anfahrt hat etwas länger gedauert als angegeben.",
      date: "2024-09-22",
      platform: "Google",
      location: "Berlin-Charlottenburg",
      service: "Baumpflege",
      sentiment: "mostly_positive",
      keywords: ["gute Arbeit", "Anfahrt", "länger gedauert"],
      responded: false
    },
    {
      id: 3,
      author: "Thomas R.",
      rating: 5,
      text: "Notdienst nach Sturm war fantastisch! Innerhalb von 2 Stunden vor Ort und haben den gefährlichen Baum sicher entfernt. Top Service!",
      date: "2024-09-20",
      platform: "Google",
      location: "Berlin-Spandau",
      service: "Notdienst",
      sentiment: "positive",
      keywords: ["Notdienst", "2 Stunden", "sicher entfernt", "Top Service"],
      responded: true
    },
    {
      id: 4,
      author: "Anna L.",
      rating: 3,
      text: "Arbeit war okay, aber der Preis war höher als erwartet. Hätte mir mehr Transparenz bei der Kostenaufstellung gewünscht.",
      date: "2024-09-18",
      platform: "Google",
      location: "Potsdam",
      service: "Baumfällung",
      sentiment: "neutral",
      keywords: ["Preis höher", "Transparenz", "Kostenaufstellung"],
      responded: false
    },
    {
      id: 5,
      author: "Frank B.",
      rating: 5,
      text: "Hervorragende Spezialfällung mit Seilklettertechnik. Sehr erfahrenes Team, saubere Arbeit. Gerne wieder!",
      date: "2024-09-15",
      platform: "Google",
      location: "Berlin-Kreuzberg",
      service: "Spezialfällung",
      sentiment: "positive",
      keywords: ["Seilklettertechnik", "erfahrenes Team", "saubere Arbeit"],
      responded: true
    }
  ];

  // KI-gestützte Antwort-Generierung
  const generateAIResponse = (review) => {
    const responseTemplates = {
      positive: {
        5: [
          `Vielen herzlichen Dank für Ihre fantastische 5-Sterne-Bewertung, {author}! Es freut uns sehr, dass Sie mit unserer {service} in {location} so zufrieden waren. {specific_praise} Ihr Vertrauen bedeutet uns viel und wir stehen Ihnen gerne auch in Zukunft zur Verfügung. Ihr Baumfäller24 Team`,
          `Herzlichen Dank für das großartige Feedback, {author}! Dass Sie unsere {service} in {location} als {keyword} empfunden haben, ist das schönste Kompliment für unser Team. Wir freuen uns auf weitere Projekte mit Ihnen! Beste Grüße, Baumfäller24`,
          `Vielen Dank für Ihre 5-Sterne-Bewertung, {author}! {specific_praise} Es ist schön zu hören, dass wir Ihre Erwartungen bei der {service} in {location} übertreffen konnten. Ihr Baumfäller24 Team steht Ihnen jederzeit gerne zur Verfügung.`
        ],
        4: [
          `Vielen Dank für Ihre positive Bewertung, {author}! Es freut uns, dass Sie mit unserer {service} in {location} zufrieden waren. {specific_praise} Wir schätzen Ihr Feedback sehr und arbeiten kontinuierlich daran, unseren Service zu verbessern. Ihr Baumfäller24 Team`,
          `Herzlichen Dank für das positive Feedback, {author}! Dass Sie unsere Arbeit bei der {service} in {location} schätzen, motiviert unser Team sehr. Wir freuen uns auf weitere Zusammenarbeit! Beste Grüße, Baumfäller24`
        ]
      },
      mostly_positive: {
        4: [
          `Vielen Dank für Ihr ehrliches Feedback, {author}! Es freut uns, dass Sie mit unserer {service} in {location} grundsätzlich zufrieden waren. {improvement_acknowledgment} Wir nehmen Ihre Anmerkungen ernst und werden diese zur Verbesserung unseres Services nutzen. Gerne können Sie uns direkt kontaktieren, damit wir eventuelle Punkte besprechen können. Ihr Baumfäller24 Team`,
          `Herzlichen Dank für Ihre Bewertung, {author}! Schön, dass die {service} in {location} Ihren Erwartungen entsprochen hat. {improvement_acknowledgment} Ihr konstruktives Feedback hilft uns, noch besser zu werden. Bei Fragen stehen wir Ihnen gerne zur Verfügung. Beste Grüße, Baumfäller24`
        ]
      },
      neutral: {
        3: [
          `Vielen Dank für Ihr Feedback, {author}! Wir nehmen Ihre Anmerkungen zur {service} in {location} sehr ernst. {improvement_acknowledgment} Gerne möchten wir mit Ihnen persönlich sprechen, um zu verstehen, wie wir unseren Service verbessern können. Bitte kontaktieren Sie uns unter 030 65 94 00 49. Ihr Baumfäller24 Team`,
          `Herzlichen Dank für Ihre ehrliche Bewertung, {author}! {improvement_acknowledgment} Wir schätzen konstruktives Feedback und möchten gerne mit Ihnen besprechen, wie wir Ihre Erfahrung bei zukünftigen Projekten verbessern können. Ihr Baumfäller24 Team`
        ]
      },
      negative: {
        2: [
          `Vielen Dank für Ihr Feedback, {author}. Es tut uns leid, dass Ihre Erfahrung mit unserer {service} in {location} nicht Ihren Erwartungen entsprochen hat. {improvement_acknowledgment} Wir nehmen Ihre Kritik sehr ernst und möchten die Situation gerne mit Ihnen besprechen. Bitte kontaktieren Sie uns direkt unter 030 65 94 00 49, damit wir eine zufriedenstellende Lösung finden können. Ihr Baumfäller24 Team`,
          `Herzlichen Dank für Ihr ehrliches Feedback, {author}. Wir bedauern sehr, dass Sie mit unserer {service} in {location} nicht vollständig zufrieden waren. {improvement_acknowledgment} Ihr Feedback ist wertvoll für uns und wir möchten gerne persönlich mit Ihnen sprechen, um die Angelegenheit zu klären. Bitte rufen Sie uns an: 030 65 94 00 49. Ihr Baumfäller24 Team`
        ],
        1: [
          `Vielen Dank für Ihr Feedback, {author}. Es tut uns außerordentlich leid, dass Ihre Erfahrung mit unserer {service} in {location} so enttäuschend war. Das entspricht nicht unseren Standards und wir möchten die Situation umgehend mit Ihnen klären. Bitte kontaktieren Sie uns sofort unter 030 65 94 00 49, damit wir eine angemessene Lösung finden können. Ihr Baumfäller24 Team`
        ]
      }
    };

    const sentiment = review.sentiment;
    const rating = review.rating;
    const templates = responseTemplates[sentiment]?.[rating] || responseTemplates.neutral[3];
    
    // Wähle zufällig ein Template
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    // Personalisiere die Antwort
    let response = template
      .replace('{author}', review.author.split(' ')[0]) // Nur Vorname
      .replace('{service}', review.service)
      .replace('{location}', review.location);

    // Füge spezifische Elemente hinzu
    if (sentiment === 'positive') {
      const specificPraise = generateSpecificPraise(review);
      response = response.replace('{specific_praise}', specificPraise);
      
      if (review.keywords.length > 0) {
        response = response.replace('{keyword}', review.keywords[0]);
      }
    }

    if (sentiment === 'mostly_positive' || sentiment === 'neutral') {
      const improvementAck = generateImprovementAcknowledgment(review);
      response = response.replace('{improvement_acknowledgment}', improvementAck);
    }

    // Füge SEO-Keywords natürlich ein
    response = enhanceResponseWithSEO(response, review);

    return response;
  };

  // Generiere spezifisches Lob basierend auf Keywords
  const generateSpecificPraise = (review) => {
    const praiseMap = {
      'professionell': 'Dass Sie unsere Arbeit als professionell empfunden haben, bestätigt unseren Qualitätsanspruch.',
      'schnell': 'Unsere schnelle Reaktionszeit ist uns besonders wichtig.',
      'sauber': 'Saubere Arbeitsweise gehört zu unseren Grundprinzipien.',
      'erfahren': 'Unsere 12-jährige Erfahrung kommt jedem Projekt zugute.',
      'zuverlässig': 'Zuverlässigkeit ist das Fundament unserer Arbeit.',
      'freundlich': 'Freundlicher Service ist für uns selbstverständlich.',
      'kompetent': 'Kompetenz in allen Bereichen der Baumpflege ist unser Anspruch.'
    };

    for (const keyword of review.keywords) {
      for (const [key, praise] of Object.entries(praiseMap)) {
        if (keyword.toLowerCase().includes(key)) {
          return praise;
        }
      }
    }

    return 'Ihre positive Rückmeldung motiviert unser gesamtes Team.';
  };

  // Generiere Verbesserungs-Anerkennung
  const generateImprovementAcknowledgment = (review) => {
    const improvementMap = {
      'anfahrt': 'Bezüglich der Anfahrtszeit werden wir unsere Planung optimieren.',
      'preis': 'Ihre Anmerkungen zur Preistransparenz nehmen wir sehr ernst.',
      'kommunikation': 'Wir werden unsere Kommunikation weiter verbessern.',
      'zeit': 'Zeitmanagement ist ein wichtiger Punkt für uns.',
      'information': 'Bessere Information unserer Kunden ist uns wichtig.'
    };

    for (const keyword of review.keywords) {
      for (const [key, acknowledgment] of Object.entries(improvementMap)) {
        if (keyword.toLowerCase().includes(key)) {
          return acknowledgment;
        }
      }
    }

    return 'Wir nehmen Ihr Feedback ernst und arbeiten kontinuierlich an Verbesserungen.';
  };

  // Verbessere Antwort mit SEO-Keywords
  const enhanceResponseWithSEO = (response, review) => {
    const seoEnhancements = {
      'Berlin-Mitte': 'in Berlin-Mitte',
      'Berlin-Charlottenburg': 'in Charlottenburg',
      'Berlin-Kreuzberg': 'in Kreuzberg',
      'Berlin-Spandau': 'in Spandau',
      'Potsdam': 'in Potsdam',
      'Baumfällung': 'bei der professionellen Baumfällung',
      'Baumpflege': 'bei der fachgerechten Baumpflege',
      'Notdienst': 'bei unserem 24h-Notdienst',
      'Spezialfällung': 'bei der Spezialfällung'
    };

    // Füge lokale SEO-Keywords natürlich ein
    Object.entries(seoEnhancements).forEach(([key, enhancement]) => {
      if (review.location.includes(key) || review.service.includes(key)) {
        response = response.replace(key, enhancement);
      }
    });

    return response;
  };

  // Sentiment-Analyse der Reviews
  const analyzeSentiment = (reviewList) => {
    const sentimentCounts = {
      positive: reviewList.filter(r => r.sentiment === 'positive').length,
      mostly_positive: reviewList.filter(r => r.sentiment === 'mostly_positive').length,
      neutral: reviewList.filter(r => r.sentiment === 'neutral').length,
      negative: reviewList.filter(r => r.sentiment === 'negative').length
    };

    const totalReviews = reviewList.length;
    const averageRating = reviewList.reduce((sum, r) => sum + r.rating, 0) / totalReviews;

    const trends = {
      positivePercentage: ((sentimentCounts.positive + sentimentCounts.mostly_positive) / totalReviews * 100).toFixed(1),
      averageRating: averageRating.toFixed(1),
      totalReviews,
      responseRate: (reviewList.filter(r => r.responded).length / totalReviews * 100).toFixed(1)
    };

    return { sentimentCounts, trends };
  };

  // Extrahiere Review-Insights
  const extractInsights = (reviewList) => {
    const insights = {
      topKeywords: extractTopKeywords(reviewList),
      servicePerformance: analyzeServicePerformance(reviewList),
      locationInsights: analyzeLocationPerformance(reviewList),
      improvementAreas: identifyImprovementAreas(reviewList),
      strengths: identifyStrengths(reviewList)
    };

    return insights;
  };

  // Extrahiere häufigste Keywords
  const extractTopKeywords = (reviewList) => {
    const keywordCounts = {};
    
    reviewList.forEach(review => {
      review.keywords.forEach(keyword => {
        keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
      });
    });

    return Object.entries(keywordCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([keyword, count]) => ({ keyword, count }));
  };

  // Analysiere Service-Performance
  const analyzeServicePerformance = (reviewList) => {
    const serviceStats = {};
    
    reviewList.forEach(review => {
      if (!serviceStats[review.service]) {
        serviceStats[review.service] = { ratings: [], count: 0 };
      }
      serviceStats[review.service].ratings.push(review.rating);
      serviceStats[review.service].count++;
    });

    return Object.entries(serviceStats).map(([service, stats]) => ({
      service,
      averageRating: (stats.ratings.reduce((sum, r) => sum + r, 0) / stats.ratings.length).toFixed(1),
      reviewCount: stats.count,
      performance: stats.ratings.reduce((sum, r) => sum + r, 0) / stats.ratings.length >= 4.5 ? 'Excellent' : 
                  stats.ratings.reduce((sum, r) => sum + r, 0) / stats.ratings.length >= 4.0 ? 'Good' : 'Needs Improvement'
    }));
  };

  // Analysiere Standort-Performance
  const analyzeLocationPerformance = (reviewList) => {
    const locationStats = {};
    
    reviewList.forEach(review => {
      if (!locationStats[review.location]) {
        locationStats[review.location] = { ratings: [], count: 0 };
      }
      locationStats[review.location].ratings.push(review.rating);
      locationStats[review.location].count++;
    });

    return Object.entries(locationStats).map(([location, stats]) => ({
      location,
      averageRating: (stats.ratings.reduce((sum, r) => sum + r, 0) / stats.ratings.length).toFixed(1),
      reviewCount: stats.count
    }));
  };

  // Identifiziere Verbesserungsbereiche
  const identifyImprovementAreas = (reviewList) => {
    const negativeKeywords = reviewList
      .filter(r => r.rating <= 3)
      .flatMap(r => r.keywords);

    const improvementCounts = {};
    negativeKeywords.forEach(keyword => {
      improvementCounts[keyword] = (improvementCounts[keyword] || 0) + 1;
    });

    return Object.entries(improvementCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([area, count]) => ({ area, mentions: count }));
  };

  // Identifiziere Stärken
  const identifyStrengths = (reviewList) => {
    const positiveKeywords = reviewList
      .filter(r => r.rating >= 4)
      .flatMap(r => r.keywords);

    const strengthCounts = {};
    positiveKeywords.forEach(keyword => {
      strengthCounts[keyword] = (strengthCounts[keyword] || 0) + 1;
    });

    return Object.entries(strengthCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([strength, count]) => ({ strength, mentions: count }));
  };

  // Automatische Antwort-Generierung für alle unbeantworteten Reviews
  const generateAllResponses = () => {
    const responses = {};
    
    reviews.filter(r => !r.responded).forEach(review => {
      responses[review.id] = generateAIResponse(review);
    });

    setAiResponses(responses);
  };

  // Initialisierung
  useEffect(() => {
    setReviews(mockReviews);
    const sentiment = analyzeSentiment(mockReviews);
    setSentimentAnalysis(sentiment);
    const insights = extractInsights(mockReviews);
    setReviewInsights(insights);
  }, []);

  // Generiere Antworten wenn Reviews geladen sind
  useEffect(() => {
    if (reviews.length > 0) {
      generateAllResponses();
    }
  }, [reviews]);

  if (!sentimentAnalysis || !reviewInsights) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <MessageCircle className="h-8 w-8 animate-spin mx-auto mb-2 text-green-600" />
          <p>Analysiere Kundenbewertungen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="review-management space-y-6">
      {/* Sentiment-Übersicht */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-green-600" />
            <span>Review-Performance</span>
          </CardTitle>
          <CardDescription>
            KI-basierte Analyse Ihrer Kundenbewertungen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {sentimentAnalysis.trends.averageRating}
              </div>
              <div className="text-sm text-gray-600">Durchschnitt</div>
              <div className="flex justify-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < Math.round(sentimentAnalysis.trends.averageRating) 
                      ? 'fill-yellow-400 text-yellow-400' 
                      : 'text-gray-300'}`} 
                  />
                ))}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {sentimentAnalysis.trends.positivePercentage}%
              </div>
              <div className="text-sm text-gray-600">Positiv</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {sentimentAnalysis.trends.totalReviews}
              </div>
              <div className="text-sm text-gray-600">Gesamt</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {sentimentAnalysis.trends.responseRate}%
              </div>
              <div className="text-sm text-gray-600">Beantwortet</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service-Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Service-Performance</CardTitle>
          <CardDescription>
            Bewertungen nach Dienstleistung
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reviewInsights.servicePerformance.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h5 className="font-medium">{service.service}</h5>
                  <p className="text-sm text-gray-600">
                    {service.reviewCount} Bewertungen
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">{service.averageRating}</span>
                    <Badge variant={
                      service.performance === 'Excellent' ? 'default' :
                      service.performance === 'Good' ? 'secondary' : 'destructive'
                    }>
                      {service.performance}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stärken und Verbesserungsbereiche */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">Ihre Stärken</CardTitle>
            <CardDescription>
              Häufig gelobte Aspekte
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {reviewInsights.strengths.map((strength, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm">{strength.strength}</span>
                  <Badge variant="outline">{strength.mentions}x</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-orange-600">Verbesserungsbereiche</CardTitle>
            <CardDescription>
              Bereiche mit Optimierungspotential
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {reviewInsights.improvementAreas.length > 0 ? (
                reviewInsights.improvementAreas.map((area, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{area.area}</span>
                    <Badge variant="secondary">{area.mentions}x</Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-600">Keine kritischen Bereiche identifiziert</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KI-generierte Antworten */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="h-6 w-6 text-blue-600" />
            <span>KI-generierte Antworten</span>
          </CardTitle>
          <CardDescription>
            Personalisierte, SEO-optimierte Antworten für unbeantwortete Reviews
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {reviews.filter(r => !r.responded).map((review) => (
              <div key={review.id} className="border rounded-lg p-4">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{review.author}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < review.rating 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <Badge variant="outline">{review.location}</Badge>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-sm bg-gray-50 p-3 rounded italic">
                    "{review.text}"
                  </p>
                </div>
                
                <div className="border-t pt-4">
                  <h5 className="font-medium mb-2 text-green-600">
                    KI-generierte Antwort:
                  </h5>
                  <p className="text-sm bg-green-50 p-3 rounded">
                    {aiResponses[review.id]}
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex space-x-2">
                      <Badge variant="outline">SEO-optimiert</Badge>
                      <Badge variant="outline">Personalisiert</Badge>
                      <Badge variant="outline">{review.sentiment}</Badge>
                    </div>
                    <button className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                      Antwort verwenden
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Standort-Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Standort-Performance</CardTitle>
          <CardDescription>
            Bewertungen nach Einsatzgebiet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviewInsights.locationInsights.map((location, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex justify-between items-center">
                  <h5 className="font-medium">{location.location}</h5>
                  <div className="text-right">
                    <div className="font-semibold">{location.averageRating} ⭐</div>
                    <div className="text-sm text-gray-600">
                      {location.reviewCount} Reviews
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Debug Info */}
      {process.env.NODE_ENV === 'development' && (
        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle className="text-sm">Review-KI Debug</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs space-y-1">
              <p>Reviews analysiert: {reviews.length}</p>
              <p>KI-Antworten generiert: {Object.keys(aiResponses).length}</p>
              <p>Top Keywords: {reviewInsights.topKeywords.slice(0, 3).map(k => k.keyword).join(', ')}</p>
              <p>Sentiment-Verteilung: {sentimentAnalysis.trends.positivePercentage}% positiv</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReviewManagementAI;
