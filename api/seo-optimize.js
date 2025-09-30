// Vercel API endpoint for OpenAI SEO optimization
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { business, location, services, competitors, currentContent } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `Du bist ein SEO-Experte für lokale Dienstleistungsunternehmen in Deutschland. 
            Analysiere die gegebenen Informationen und erstelle konkrete SEO-Optimierungen für bessere lokale Suchmaschinen-Rankings.
            
            Fokus auf:
            - Lokale Keywords für ${location}
            - Service-spezifische Suchbegriffe
            - Competitor-Analyse
            - Meta-Tags Optimierung
            - Strukturierte Daten (Schema.org)
            
            Antwort als JSON mit folgender Struktur:
            {
              "metaTitle": "Optimierter Titel (max 60 Zeichen)",
              "metaDescription": "Optimierte Beschreibung (max 160 Zeichen)",
              "keywords": ["keyword1", "keyword2", ...],
              "optimizations": [
                {
                  "type": "meta|content|technical",
                  "title": "Kurze Beschreibung",
                  "description": "Detaillierte Erklärung",
                  "impact": "high|medium|low"
                }
              ],
              "structuredData": {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "${business}",
                "description": "...",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "${location}",
                  "addressCountry": "DE"
                },
                "telephone": "030 65 94 00 49",
                "serviceArea": "${location}",
                "services": ${JSON.stringify(services)}
              },
              "recommendations": [
                "Konkrete Handlungsempfehlung 1",
                "Konkrete Handlungsempfehlung 2",
                ...
              ]
            }`
          },
          {
            role: 'user',
            content: `Optimiere SEO für:
            
            Unternehmen: ${business}
            Standort: ${location}
            Services: ${services.join(', ')}
            Konkurrenten: ${competitors.join(', ')}
            
            Aktueller Content: ${currentContent}
            
            Ziel: Top-Rankings für lokale Suchanfragen wie "Baumfällung Berlin", "Baufeldräumung Brandenburg", etc.`
          }
        ],
        max_tokens: 2000,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const seoOptimization = JSON.parse(data.choices[0].message.content);

    // Add timestamp and source
    seoOptimization.timestamp = new Date().toISOString();
    seoOptimization.source = 'OpenAI GPT-4';
    seoOptimization.status = 'success';

    res.status(200).json(seoOptimization);

  } catch (error) {
    console.error('SEO optimization error:', error);
    
    // Fallback response if OpenAI fails
    res.status(200).json({
      status: 'fallback',
      metaTitle: 'Baumfäller24 - Professionelle Baumarbeiten Berlin Brandenburg',
      metaDescription: 'Professionelle Baumfällung, Baufeldräumung und Rodung in Berlin & Brandenburg. Hebebühne bis 40m, Seilklettertechnik. ☎ 030 65 94 00 49',
      keywords: ['Baumfällung Berlin', 'Baufeldräumung Brandenburg', 'Stubbenfräsung', 'Seilklettertechnik'],
      optimizations: [
        {
          type: 'meta',
          title: 'Meta-Tags optimiert',
          description: 'Titel und Beschreibung für lokale Suche angepasst',
          impact: 'high'
        },
        {
          type: 'content',
          title: 'Lokale Keywords integriert',
          description: 'Suchbegriffe für Berlin & Brandenburg hinzugefügt',
          impact: 'high'
        },
        {
          type: 'technical',
          title: 'Strukturierte Daten',
          description: 'Schema.org LocalBusiness Markup implementiert',
          impact: 'medium'
        }
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": business,
        "description": "Professionelle Baumarbeiten, Baumfällung und Baufeldräumung",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": location,
          "addressCountry": "DE"
        },
        "telephone": "030 65 94 00 49",
        "serviceArea": location,
        "services": services
      },
      recommendations: [
        'Google My Business Profil optimieren',
        'Lokale Backlinks von Berlin/Brandenburg Websites aufbauen',
        'Kundenbewertungen aktiv sammeln',
        'Regelmäßige Blog-Artikel zu Baumarbeiten veröffentlichen'
      ],
      timestamp: new Date().toISOString(),
      source: 'Fallback System'
    });
  }
}
