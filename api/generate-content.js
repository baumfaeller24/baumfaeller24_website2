// Automated Content Generation with Grok AI
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { contentType, location, service, keywords } = req.body;

  try {
    let prompt = '';
    
    switch (contentType) {
      case 'blog_post':
        prompt = `Schreibe einen 800-Wort SEO-optimierten Blog-Artikel über "${service}" in "${location}".
        
        Anforderungen:
        - Zielkeywords: ${keywords.join(', ')}
        - Lokaler Bezug zu ${location}
        - Praktische Tipps für Hausbesitzer
        - Call-to-Action zu Baumfäller24
        - H2 und H3 Überschriften verwenden
        - Natürliche Keyword-Integration
        
        Struktur:
        1. Einleitung mit lokalem Bezug
        2. Hauptteil mit praktischen Informationen
        3. Rechtliche Hinweise (Genehmigungen)
        4. Warum professionelle Hilfe wichtig ist
        5. Fazit mit CTA
        
        Schreibstil: Professionell, vertrauenswürdig, hilfreich`;
        break;
        
      case 'faq_entry':
        prompt = `Erstelle eine detaillierte FAQ-Antwort für die Frage: "${service}"
        
        Kontext: Baumarbeiten in ${location}
        Keywords: ${keywords.join(', ')}
        
        Die Antwort soll:
        - 200-300 Wörter lang sein
        - Rechtliche Aspekte berücksichtigen
        - Lokale Besonderheiten erwähnen
        - Praktische Handlungsschritte enthalten
        - Zur Kontaktaufnahme ermutigen`;
        break;
        
      case 'service_description':
        prompt = `Schreibe eine SEO-optimierte Service-Beschreibung für "${service}" in "${location}".
        
        Zielkeywords: ${keywords.join(', ')}
        
        Inhalt (400 Wörter):
        - Was ist ${service}?
        - Wann wird es benötigt?
        - Unser Vorgehen bei Baumfäller24
        - Vorteile unserer Technik
        - Lokale Expertise in ${location}
        - Preis-Transparenz
        - Call-to-Action`;
        break;
        
      case 'local_content':
        prompt = `Erstelle lokalen Content über Baumarbeiten in "${location}".
        
        Thema: ${service}
        Keywords: ${keywords.join(', ')}
        
        Inhalt (500 Wörter):
        - Besonderheiten von ${location}
        - Lokale Baumarten und Herausforderungen
        - Wetter und saisonale Faktoren
        - Lokale Vorschriften und Genehmigungen
        - Warum lokale Expertise wichtig ist
        - Referenzen zu lokalen Projekten`;
        break;
    }

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
            content: `Du bist ein SEO-Content-Experte für Baumarbeiten in Deutschland. 
            Erstelle hochwertigen, suchmaschinenoptimierten Content der echten Mehrwert bietet.
            
            Wichtig:
            - Natürliche Keyword-Integration (nicht stuffing)
            - Lokaler Bezug zu deutschen Städten/Regionen
            - Fachlich korrekte Informationen
            - Vertrauenswürdiger, professioneller Ton
            - Handlungsaufforderungen zu Baumfäller24
            - HTML-Formatierung mit h2, h3, p, ul, li Tags`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`Grok API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;

    // Extract SEO metadata from content
    const seoMetadata = extractSEOMetadata(generatedContent, keywords);

    // Save content to database/file system (implement as needed)
    const contentId = await saveGeneratedContent({
      type: contentType,
      location,
      service,
      keywords,
      content: generatedContent,
      metadata: seoMetadata,
      createdAt: new Date().toISOString()
    });

    res.status(200).json({
      status: 'success',
      contentId,
      content: generatedContent,
      metadata: seoMetadata,
      wordCount: generatedContent.split(' ').length,
      keywordDensity: calculateKeywordDensity(generatedContent, keywords),
      suggestions: generateContentSuggestions(generatedContent, keywords),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Content generation error:', error);
    
    res.status(200).json({
      status: 'fallback',
      content: generateFallbackContent(contentType, location, service),
      message: 'Grok AI nicht verfügbar - Fallback Content verwendet',
      error: error.message
    });
  }
}

// Helper functions
function extractSEOMetadata(content, keywords) {
  const lines = content.split('\n');
  const title = lines.find(line => line.includes('h1>') || line.includes('# '))?.replace(/[#<>h1\/]/g, '').trim();
  
  return {
    title: title || 'Professionelle Baumarbeiten',
    description: content.substring(0, 160).replace(/<[^>]*>/g, '').trim() + '...',
    keywords: keywords,
    headings: extractHeadings(content),
    wordCount: content.split(' ').length
  };
}

function extractHeadings(content) {
  const headingRegex = /<h[2-6]>(.*?)<\/h[2-6]>/g;
  const headings = [];
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    headings.push(match[1]);
  }
  
  return headings;
}

function calculateKeywordDensity(content, keywords) {
  const wordCount = content.split(' ').length;
  const densities = {};
  
  keywords.forEach(keyword => {
    const regex = new RegExp(keyword, 'gi');
    const matches = content.match(regex) || [];
    densities[keyword] = ((matches.length / wordCount) * 100).toFixed(2);
  });
  
  return densities;
}

function generateContentSuggestions(content, keywords) {
  const suggestions = [];
  
  // Check keyword density
  Object.entries(calculateKeywordDensity(content, keywords)).forEach(([keyword, density]) => {
    if (density < 0.5) {
      suggestions.push(`Keyword "${keyword}" könnte häufiger verwendet werden (aktuell ${density}%)`);
    }
    if (density > 3) {
      suggestions.push(`Keyword "${keyword}" wird zu oft verwendet (${density}%) - Keyword Stuffing vermeiden`);
    }
  });
  
  // Check content length
  const wordCount = content.split(' ').length;
  if (wordCount < 300) {
    suggestions.push('Content könnte länger sein für bessere SEO-Performance (mindestens 300 Wörter)');
  }
  
  // Check headings
  if (!content.includes('<h2>')) {
    suggestions.push('H2-Überschriften hinzufügen für bessere Struktur');
  }
  
  return suggestions;
}

function generateFallbackContent(contentType, location, service) {
  const fallbackTemplates = {
    blog_post: `<h1>Professionelle ${service} in ${location}</h1>
    <p>Als erfahrener Anbieter für Baumarbeiten in ${location} bieten wir Ihnen professionelle ${service} mit modernster Technik und höchsten Sicherheitsstandards.</p>
    <h2>Warum professionelle ${service}?</h2>
    <p>Baumarbeiten erfordern Fachwissen und die richtige Ausrüstung. Unser Team verfügt über 12 Jahre Erfahrung in ${location} und Umgebung.</p>
    <h2>Unser Service</h2>
    <ul>
    <li>Kostenlose Beratung vor Ort</li>
    <li>Moderne Technik und Sicherheitsausrüstung</li>
    <li>Vollversicherte Arbeiten</li>
    <li>Faire und transparente Preise</li>
    </ul>
    <p>Kontaktieren Sie uns für ein kostenloses Angebot: 030 65 94 00 49</p>`,
    
    faq_entry: `<p>Bei ${service} in ${location} sind verschiedene Faktoren zu beachten. Als professioneller Anbieter beraten wir Sie gerne zu allen Aspekten.</p>
    <p>Wichtige Punkte: Genehmigungen prüfen, Sicherheit gewährleisten, fachgerechte Durchführung. Kontaktieren Sie uns für eine individuelle Beratung.</p>`,
    
    service_description: `<h2>${service} in ${location}</h2>
    <p>Professionelle ${service} mit 12 Jahren Erfahrung. Moderne Technik, vollversichert, faire Preise.</p>
    <p>Rufen Sie uns an: 030 65 94 00 49</p>`
  };
  
  return fallbackTemplates[contentType] || fallbackTemplates.service_description;
}

async function saveGeneratedContent(contentData) {
  // Implement database/file storage as needed
  // For now, return a mock ID
  return `content_${Date.now()}`;
}
