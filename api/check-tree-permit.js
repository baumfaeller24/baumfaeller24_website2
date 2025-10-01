// Vercel API endpoint for tree felling permit checking with Grok AI
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { location, treeType, diameter, height, reason, property } = req.body;

  // Debug: Check if API key is available
  if (!process.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY environment variable not found');
    const fallbackResult = generateFallbackResult(location, treeType, diameter, height, reason, property);
    fallbackResult.error = 'API-Key nicht konfiguriert';
    return res.status(200).json(fallbackResult);
  }

  try {
    console.log('Attempting Grok API call...');
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'grok-4-latest',
        messages: [
          {
            role: 'system',
            content: `Du bist ein Experte für deutsche Baumschutzverordnungen und Genehmigungsverfahren, speziell für Berlin und Brandenburg. 
            
            Analysiere die gegebenen Informationen über ein Baumfällvorhaben und bestimme:
            1. Ob eine Genehmigung erforderlich ist
            2. Welche Behörde zuständig ist
            3. Welche Schritte erforderlich sind
            4. Geschätzte Bearbeitungszeit
            
            Berücksichtige:
            - Berliner Baumschutzverordnung (BaumSchVO Berlin)
            - Brandenburgische Naturschutzgesetze
            - Unterschiede zwischen Privatgrundstück und öffentlichem Raum
            - Stammdurchmesser-Grenzwerte
            - Baumart-spezifische Regelungen
            - Ausnahmeregelungen (Krankheit, Sicherheit, etc.)
            
            Antwort als JSON:
            {
              "requiresPermit": "yes|no|maybe|unknown",
              "confidence": "high|medium|low",
              "summary": "Kurze Zusammenfassung der Einschätzung",
              "details": "Detaillierte Begründung basierend auf den Regelungen",
              "nextSteps": ["Schritt 1", "Schritt 2", ...],
              "authority": "Name der zuständigen Behörde",
              "estimatedTime": "Geschätzte Bearbeitungszeit",
              "costs": "Geschätzte Kosten (falls bekannt)",
              "legalBasis": "Relevante Rechtsgrundlage",
              "exceptions": "Mögliche Ausnahmen oder Sonderregelungen"
            }`
          },
          {
            role: 'user',
            content: `Prüfe die Genehmigungspflicht für folgendes Baumfällvorhaben:
            
            Standort: ${location}
            Baumart: ${treeType}
            Stammdurchmesser: ${diameter}
            Baumhöhe: ${height}
            Grund der Fällung: ${reason}
            Eigentumsart: ${property}
            
            Bitte gib eine präzise Einschätzung basierend auf den aktuellen Berliner und Brandenburger Baumschutzbestimmungen.`
          }
        ],
        max_tokens: 1500,
        temperature: 0.3
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Grok API error: ${response.status} - ${errorText}`);
      throw new Error(`Grok API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Grok API response received:', data);
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid API response structure');
    }
    
    const permitCheck = JSON.parse(data.choices[0].message.content);

    // Add metadata
    permitCheck.timestamp = new Date().toISOString();
    permitCheck.source = 'Grok AI';
    permitCheck.disclaimer = 'Diese Einschätzung dient nur zur Orientierung und ersetzt keine rechtliche Beratung.';

    res.status(200).json(permitCheck);

  } catch (error) {
    console.error('Tree permit check error:', error.message);
    console.error('Error details:', error);
    
    // Fallback response based on basic rules
    const fallbackResult = generateFallbackResult(location, treeType, diameter, height, reason, property);
    fallbackResult.error = `API-Fehler: ${error.message}`;
    fallbackResult.debug = 'Fallback-System aktiviert';
    res.status(200).json(fallbackResult);
  }
}

// Fallback function with basic permit rules
function generateFallbackResult(location, treeType, diameter, height, reason, property) {
  let requiresPermit = 'maybe';
  let confidence = 'low';
  let summary = 'Genehmigungsprüfung nicht verfügbar - Grundeinschätzung basierend auf häufigen Regeln.';
  let details = 'Aufgrund technischer Probleme kann keine detaillierte KI-Analyse durchgeführt werden.';
  
  // Basic Berlin/Brandenburg rules
  const isBerlin = location.includes('berlin');
  const isBrandenburg = !isBerlin;
  
  // Diameter-based assessment
  const diameterValue = diameter.includes('unter-10') ? 5 : 
                       diameter.includes('10-20') ? 15 :
                       diameter.includes('20-40') ? 30 :
                       diameter.includes('40-60') ? 50 :
                       diameter.includes('60-80') ? 70 :
                       diameter.includes('ueber-80') ? 90 : 30;
  
  // Basic rules
  if (property === 'Öffentlicher Raum/Straße') {
    requiresPermit = 'yes';
    confidence = 'high';
    summary = 'Bäume im öffentlichen Raum benötigen grundsätzlich eine Genehmigung.';
  } else if (diameterValue >= 80) {
    requiresPermit = 'yes';
    confidence = 'high';
    summary = 'Große Bäume (über 80cm Durchmesser) sind meist genehmigungspflichtig.';
  } else if (diameterValue < 10) {
    requiresPermit = 'no';
    confidence = 'medium';
    summary = 'Sehr kleine Bäume (unter 10cm) sind meist nicht genehmigungspflichtig.';
  } else if (reason.includes('krank') || reason.includes('Sturmschäden')) {
    requiresPermit = 'maybe';
    confidence = 'medium';
    summary = 'Bei kranken oder sturmgeschädigten Bäumen gibt es oft Ausnahmeregelungen.';
  }
  
  const authority = isBerlin ? 'Bezirksamt (Umwelt- und Naturschutzamt)' : 'Untere Naturschutzbehörde des Landkreises';
  
  return {
    requiresPermit,
    confidence,
    summary,
    details,
    nextSteps: [
      'Kontaktieren Sie die zuständige Behörde für eine verbindliche Auskunft',
      'Lassen Sie sich von Baumfäller24 beraten',
      'Bei Genehmigungspflicht: Antrag stellen vor der Fällung'
    ],
    authority,
    estimatedTime: '2-6 Wochen',
    costs: 'Je nach Behörde 25-200 EUR',
    legalBasis: isBerlin ? 'Berliner Baumschutzverordnung' : 'Brandenburgisches Naturschutzgesetz',
    exceptions: 'Ausnahmen möglich bei Gefahr, Krankheit oder besonderen Umständen',
    timestamp: new Date().toISOString(),
    source: 'Fallback System',
    disclaimer: 'Diese Grundeinschätzung ersetzt keine fachliche Beratung oder behördliche Auskunft.'
  };
}
