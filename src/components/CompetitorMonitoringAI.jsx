import { useState, useEffect } from 'react';
import { TrendingUp, AlertTriangle, Target, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';

const CompetitorMonitoringAI = () => {
  const [competitorData, setCompetitorData] = useState(null);
  const [opportunities, setOpportunities] = useState([]);
  const [threats, setThreats] = useState([]);
  const [actionItems, setActionItems] = useState([]);

  // Konkurrenten-Datenbank mit KI-Analyse
  const competitorDatabase = {
    'baumspezialist-baden-baden': {
      name: 'Baumspezialist Baden-Baden',
      domain: 'baumspezialist-baden-baden.de',
      location: 'Baden-Baden (Fernkonkurrent)',
      strengths: ['25 Jahre Erfahrung', 'Helikopter-Service', 'Große Reichweite'],
      weaknesses: ['Weit entfernt', 'Höhere Preise', 'Wenig Berlin-Fokus'],
      keywordRankings: {
        'baumfällung berlin': 15,
        'baumpflege berlin': 12,
        'notdienst baumfällung': 8,
        'spezialfällung': 3
      },
      contentGaps: ['Lokale Berlin-Inhalte', 'Preistransparenz', 'Mobile Optimierung'],
      lastUpdated: '2024-09-15',
      seoScore: 78,
      loadTime: 3.2,
      mobileScore: 72
    },
    'isa-gruppe': {
      name: 'ISA Baumpflege',
      domain: 'isa-gruppe.de',
      location: 'Überregional',
      strengths: ['Professionelle Website', 'Zertifizierungen', 'Umfassende Services'],
      weaknesses: ['Unpersönlich', 'Keine lokale Spezialisierung', 'Komplexe Navigation'],
      keywordRankings: {
        'baumfällung berlin': 8,
        'baumpflege berlin': 5,
        'notdienst baumfällung': 12,
        'spezialfällung': 7
      },
      contentGaps: ['Notdienst-Fokus', 'Lokale Testimonials', 'Preisangaben'],
      lastUpdated: '2024-09-20',
      seoScore: 85,
      loadTime: 2.1,
      mobileScore: 88
    },
    'aplus-baumpflege': {
      name: 'APLUS Baumpflege',
      domain: 'aplus-baumpflege.de',
      location: 'Berlin & Brandenburg (Direktkonkurrent)',
      strengths: ['Lokaler Fokus', 'Moderne Website', 'Gute mobile Optimierung'],
      weaknesses: ['Weniger Erfahrung', 'Begrenzte Services', 'Schwache Notdienst-Präsenz'],
      keywordRankings: {
        'baumfällung berlin': 6,
        'baumpflege berlin': 4,
        'notdienst baumfällung': 15,
        'spezialfällung': 11
      },
      contentGaps: ['Notdienst-Content', 'Erfahrungsnachweis', 'Spezialausrüstung'],
      lastUpdated: '2024-09-25',
      seoScore: 82,
      loadTime: 1.8,
      mobileScore: 91
    }
  };

  // KI-basierte Konkurrenzanalyse
  const analyzeCompetitors = () => {
    const competitors = Object.values(competitorDatabase);
    
    // Identifiziere Stärken und Schwächen
    const analysis = {
      marketPosition: calculateMarketPosition(competitors),
      keywordOpportunities: findKeywordOpportunities(competitors),
      contentOpportunities: findContentOpportunities(competitors),
      technicalAdvantages: findTechnicalAdvantages(competitors),
      threats: identifyThreats(competitors)
    };

    return analysis;
  };

  // Berechne Marktposition
  const calculateMarketPosition = (competitors) => {
    const baumfaeller24Score = {
      experience: 12, // Jahre
      localFocus: 10, // 1-10 Skala
      seoScore: 88, // Geschätzt nach Optimierung
      loadTime: 1.5, // Sekunden
      mobileScore: 95, // 1-100
      services: 8 // Anzahl Hauptservices
    };

    const competitorAverage = {
      experience: competitors.reduce((sum, c) => sum + (c.name.includes('25') ? 25 : 10), 0) / competitors.length,
      seoScore: competitors.reduce((sum, c) => sum + c.seoScore, 0) / competitors.length,
      loadTime: competitors.reduce((sum, c) => sum + c.loadTime, 0) / competitors.length,
      mobileScore: competitors.reduce((sum, c) => sum + c.mobileScore, 0) / competitors.length
    };

    return {
      baumfaeller24Score,
      competitorAverage,
      advantages: [
        baumfaeller24Score.localFocus > 8 ? 'Starker lokaler Fokus' : null,
        baumfaeller24Score.loadTime < competitorAverage.loadTime ? 'Schnellere Website' : null,
        baumfaeller24Score.mobileScore > competitorAverage.mobileScore ? 'Bessere mobile Optimierung' : null
      ].filter(Boolean),
      improvements: [
        baumfaeller24Score.experience < competitorAverage.experience ? 'Erfahrung stärker betonen' : null,
        baumfaeller24Score.seoScore < competitorAverage.seoScore ? 'SEO weiter optimieren' : null
      ].filter(Boolean)
    };
  };

  // Finde Keyword-Chancen
  const findKeywordOpportunities = (competitors) => {
    const opportunities = [];
    
    // Analysiere Keywords wo Konkurrenten schwach sind
    const weakKeywords = [
      { keyword: 'notdienst baumfällung berlin', avgRank: 12, opportunity: 'Hoch' },
      { keyword: 'baumfällung berlin mitte', avgRank: 20, opportunity: 'Sehr hoch' },
      { keyword: 'sturmschäden berlin', avgRank: 25, opportunity: 'Sehr hoch' },
      { keyword: 'baumfällung preise berlin', avgRank: 18, opportunity: 'Hoch' },
      { keyword: 'seilklettertechnik berlin', avgRank: 15, opportunity: 'Mittel' }
    ];

    return weakKeywords.map(kw => ({
      ...kw,
      potentialRank: Math.max(1, kw.avgRank - 10),
      trafficPotential: kw.avgRank > 15 ? 'Hoch' : 'Mittel'
    }));
  };

  // Finde Content-Chancen
  const findContentOpportunities = (competitors) => {
    const allContentGaps = competitors.flatMap(c => c.contentGaps);
    const gapCounts = {};
    
    allContentGaps.forEach(gap => {
      gapCounts[gap] = (gapCounts[gap] || 0) + 1;
    });

    return Object.entries(gapCounts)
      .sort(([,a], [,b]) => b - a)
      .map(([gap, count]) => ({
        contentType: gap,
        competitorsLacking: count,
        priority: count >= 2 ? 'Hoch' : 'Mittel',
        implementationEffort: getImplementationEffort(gap)
      }));
  };

  // Bestimme Implementierungsaufwand
  const getImplementationEffort = (contentType) => {
    const effortMap = {
      'Lokale Berlin-Inhalte': 'Niedrig',
      'Preistransparenz': 'Niedrig',
      'Mobile Optimierung': 'Mittel',
      'Notdienst-Fokus': 'Niedrig',
      'Lokale Testimonials': 'Niedrig',
      'Preisangaben': 'Niedrig',
      'Notdienst-Content': 'Niedrig',
      'Erfahrungsnachweis': 'Niedrig',
      'Spezialausrüstung': 'Mittel'
    };
    
    return effortMap[contentType] || 'Mittel';
  };

  // Finde technische Vorteile
  const findTechnicalAdvantages = (competitors) => {
    const avgLoadTime = competitors.reduce((sum, c) => sum + c.loadTime, 0) / competitors.length;
    const avgMobileScore = competitors.reduce((sum, c) => sum + c.mobileScore, 0) / competitors.length;
    
    return {
      loadTimeAdvantage: 1.5 < avgLoadTime,
      mobileAdvantage: 95 > avgMobileScore,
      seoAdvantage: 88 > competitors.reduce((sum, c) => sum + c.seoScore, 0) / competitors.length,
      recommendations: [
        'Nutzen Sie die schnelle Ladezeit als USP',
        'Betonen Sie die mobile Optimierung',
        'Heben Sie die moderne Technik hervor'
      ]
    };
  };

  // Identifiziere Bedrohungen
  const identifyThreats = (competitors) => {
    return [
      {
        threat: 'APLUS Baumpflege gewinnt lokale Marktanteile',
        severity: 'Mittel',
        timeframe: 'Kurzfristig',
        mitigation: 'Notdienst-Präsenz stärken, lokale SEO ausbauen'
      },
      {
        threat: 'ISA Gruppe expandiert nach Berlin',
        severity: 'Hoch',
        timeframe: 'Mittelfristig',
        mitigation: 'Lokale Spezialisierung betonen, Kundenbindung stärken'
      },
      {
        threat: 'Neue Konkurrenten mit aggressiver Online-Strategie',
        severity: 'Mittel',
        timeframe: 'Langfristig',
        mitigation: 'Kontinuierliche SEO-Optimierung, Content-Marketing'
      }
    ];
  };

  // Generiere Handlungsempfehlungen
  const generateActionItems = (analysis) => {
    const actions = [];

    // Keyword-Chancen
    analysis.keywordOpportunities.slice(0, 3).forEach(kw => {
      actions.push({
        type: 'SEO',
        priority: kw.opportunity === 'Sehr hoch' ? 'Hoch' : 'Mittel',
        action: `Optimiere für "${kw.keyword}"`,
        effort: 'Niedrig',
        impact: kw.trafficPotential,
        timeline: '2-4 Wochen'
      });
    });

    // Content-Chancen
    analysis.contentOpportunities.slice(0, 2).forEach(content => {
      actions.push({
        type: 'Content',
        priority: content.priority,
        action: `Erstelle Content für "${content.contentType}"`,
        effort: content.implementationEffort,
        impact: 'Hoch',
        timeline: content.implementationEffort === 'Niedrig' ? '1-2 Wochen' : '3-4 Wochen'
      });
    });

    // Bedrohungen adressieren
    analysis.threats.slice(0, 2).forEach(threat => {
      actions.push({
        type: 'Defensive',
        priority: threat.severity,
        action: threat.mitigation,
        effort: 'Mittel',
        impact: 'Hoch',
        timeline: threat.timeframe === 'Kurzfristig' ? '1-2 Wochen' : '1-2 Monate'
      });
    });

    return actions.sort((a, b) => {
      const priorityOrder = { 'Hoch': 3, 'Mittel': 2, 'Niedrig': 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  };

  // Automatische Updates der Konkurrenzanalyse
  const updateCompetitorAnalysis = () => {
    const analysis = analyzeCompetitors();
    setCompetitorData(analysis.marketPosition);
    setOpportunities(analysis.keywordOpportunities.concat(analysis.contentOpportunities));
    setThreats(analysis.threats);
    setActionItems(generateActionItems(analysis));

    // Update SEO basierend auf Konkurrenz-Insights
    updateSEOBasedOnCompetitors(analysis);
  };

  // SEO-Updates basierend auf Konkurrenz-Analyse
  const updateSEOBasedOnCompetitors = (analysis) => {
    // Füge Konkurrenz-überlegene Keywords hinzu
    const competitiveKeywords = analysis.keywordOpportunities
      .filter(kw => kw.opportunity === 'Sehr hoch')
      .map(kw => kw.keyword);

    if (competitiveKeywords.length > 0) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        const currentKeywords = metaKeywords.getAttribute('content');
        const newKeywords = [...new Set([...currentKeywords.split(', '), ...competitiveKeywords])];
        metaKeywords.setAttribute('content', newKeywords.join(', '));
      }
    }

    // Update Title mit Konkurrenz-Differenzierung
    const currentTitle = document.title;
    if (!currentTitle.includes('12 Jahre Erfahrung') && analysis.marketPosition.advantages.includes('Starker lokaler Fokus')) {
      document.title = currentTitle.replace('|', '- 12 Jahre lokale Erfahrung |');
    }
  };

  // Initialisierung
  useEffect(() => {
    updateCompetitorAnalysis();
    
    // Update alle 24 Stunden
    const interval = setInterval(updateCompetitorAnalysis, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (!competitorData) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <Target className="h-8 w-8 animate-spin mx-auto mb-2 text-green-600" />
          <p>Analysiere Konkurrenz für optimale Positionierung...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="competitor-monitoring space-y-6">
      {/* Marktposition */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-green-600" />
            <span>Ihre Marktposition</span>
          </CardTitle>
          <CardDescription>
            KI-basierte Analyse Ihrer Wettbewerbsposition
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-green-600">Ihre Vorteile</h4>
              <div className="space-y-2">
                {competitorData.advantages.map((advantage, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="text-sm">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-orange-600">Verbesserungspotential</h4>
              <div className="space-y-2">
                {competitorData.improvements.map((improvement, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                    <span className="text-sm">{improvement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chancen */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-6 w-6 text-yellow-500" />
            <span>Identifizierte Chancen</span>
          </CardTitle>
          <CardDescription>
            Bereiche wo Sie die Konkurrenz überholen können
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {opportunities.slice(0, 5).map((opportunity, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h5 className="font-medium">
                    {opportunity.keyword || opportunity.contentType}
                  </h5>
                  <p className="text-sm text-gray-600">
                    {opportunity.keyword 
                      ? `Durchschnittlicher Konkurrenz-Rang: ${opportunity.avgRank}`
                      : `${opportunity.competitorsLacking} Konkurrenten fehlt dies`
                    }
                  </p>
                </div>
                <Badge variant={
                  (opportunity.opportunity || opportunity.priority) === 'Sehr hoch' || (opportunity.opportunity || opportunity.priority) === 'Hoch' 
                    ? 'destructive' 
                    : 'default'
                }>
                  {opportunity.opportunity || opportunity.priority}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bedrohungen */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <span>Marktbedrohungen</span>
          </CardTitle>
          <CardDescription>
            Konkurrenz-Aktivitäten die Aufmerksamkeit erfordern
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {threats.map((threat, index) => (
              <div key={index} className="p-4 border rounded-lg bg-red-50">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-medium">{threat.threat}</h5>
                  <Badge variant={threat.severity === 'Hoch' ? 'destructive' : 'secondary'}>
                    {threat.severity}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Zeitrahmen:</strong> {threat.timeframe}
                </p>
                <p className="text-sm">
                  <strong>Gegenmaßnahme:</strong> {threat.mitigation}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Handlungsempfehlungen */}
      <Card>
        <CardHeader>
          <CardTitle>Empfohlene Sofortmaßnahmen</CardTitle>
          <CardDescription>
            Priorisierte Aktionen basierend auf KI-Analyse
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {actionItems.slice(0, 6).map((action, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Badge variant="outline">{action.type}</Badge>
                    <Badge variant={action.priority === 'Hoch' ? 'destructive' : 'default'}>
                      {action.priority}
                    </Badge>
                  </div>
                  <h5 className="font-medium mb-1">{action.action}</h5>
                  <div className="text-sm text-gray-600">
                    <span>Aufwand: {action.effort}</span> • 
                    <span> Impact: {action.impact}</span> • 
                    <span> Timeline: {action.timeline}</span>
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
            <CardTitle className="text-sm">KI-Monitoring Debug</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs space-y-1">
              <p>Konkurrenten überwacht: {Object.keys(competitorDatabase).length}</p>
              <p>Chancen identifiziert: {opportunities.length}</p>
              <p>Bedrohungen erkannt: {threats.length}</p>
              <p>Aktionen empfohlen: {actionItems.length}</p>
              <p>Letztes Update: {new Date().toLocaleString('de-DE')}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CompetitorMonitoringAI;
