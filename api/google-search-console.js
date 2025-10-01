// Google Search Console API Integration
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { google } = require('googleapis');
    
    // OAuth2 client setup
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    });

    const searchconsole = google.searchconsole({
      version: 'v1',
      auth: oauth2Client
    });

    const siteUrl = 'https://baumfaeller24.vercel.app'; // Your actual domain

    // Get search analytics data
    const searchAnalytics = await searchconsole.searchanalytics.query({
      siteUrl: siteUrl,
      requestBody: {
        startDate: getDateDaysAgo(30),
        endDate: getDateDaysAgo(1),
        dimensions: ['query', 'page'],
        rowLimit: 100,
        startRow: 0
      }
    });

    // Get site performance data
    const siteInfo = await searchconsole.sites.get({
      siteUrl: siteUrl
    });

    // Process and analyze data
    const keywordData = searchAnalytics.data.rows || [];
    const topKeywords = keywordData
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 20)
      .map(row => ({
        keyword: row.keys[0],
        page: row.keys[1],
        clicks: row.clicks,
        impressions: row.impressions,
        ctr: (row.ctr * 100).toFixed(2),
        position: row.position.toFixed(1)
      }));

    // Calculate improvements needed
    const improvements = analyzeKeywordPerformance(topKeywords);

    // Generate Grok AI recommendations
    const grokRecommendations = await getGrokSEORecommendations(topKeywords);

    res.status(200).json({
      status: 'success',
      data: {
        siteInfo: {
          url: siteUrl,
          permissionLevel: siteInfo.data.permissionLevel,
          verified: true
        },
        topKeywords,
        improvements,
        grokRecommendations,
        summary: {
          totalClicks: keywordData.reduce((sum, row) => sum + row.clicks, 0),
          totalImpressions: keywordData.reduce((sum, row) => sum + row.impressions, 0),
          averageCTR: (keywordData.reduce((sum, row) => sum + row.ctr, 0) / keywordData.length * 100).toFixed(2),
          averagePosition: (keywordData.reduce((sum, row) => sum + row.position, 0) / keywordData.length).toFixed(1)
        },
        lastUpdated: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Google Search Console API error:', error);
    
    // Fallback with setup instructions
    res.status(200).json({
      status: 'setup_required',
      message: 'Google Search Console Integration benötigt Setup',
      setupSteps: [
        '1. Google Cloud Console: Neues Projekt erstellen',
        '2. Search Console API aktivieren',
        '3. OAuth2 Credentials erstellen',
        '4. Website in Search Console verifizieren',
        '5. Environment Variables in Vercel setzen'
      ],
      requiredEnvVars: [
        'GOOGLE_CLIENT_ID',
        'GOOGLE_CLIENT_SECRET', 
        'GOOGLE_REDIRECT_URI',
        'GOOGLE_REFRESH_TOKEN'
      ],
      error: error.message
    });
  }
}

// Helper functions
function getDateDaysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
}

function analyzeKeywordPerformance(keywords) {
  const improvements = [];
  
  keywords.forEach(kw => {
    if (kw.position > 10) {
      improvements.push({
        type: 'ranking',
        keyword: kw.keyword,
        currentPosition: kw.position,
        recommendation: `Keyword "${kw.keyword}" auf Position ${kw.position} - Content optimieren für Top 10`,
        priority: 'high'
      });
    }
    
    if (kw.ctr < 2) {
      improvements.push({
        type: 'ctr',
        keyword: kw.keyword,
        currentCTR: kw.ctr,
        recommendation: `CTR von ${kw.ctr}% zu niedrig - Meta-Title und Description überarbeiten`,
        priority: 'medium'
      });
    }
  });
  
  return improvements;
}

async function getGrokSEORecommendations(keywords) {
  try {
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
            content: 'Du bist ein SEO-Experte. Analysiere die Google Search Console Daten und gib konkrete Verbesserungsvorschläge.'
          },
          {
            role: 'user',
            content: `Analysiere diese Keyword-Performance für Baumfäller24:
            ${JSON.stringify(keywords, null, 2)}
            
            Gib konkrete, umsetzbare SEO-Empfehlungen.`
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      })
    });

    if (response.ok) {
      const data = await response.json();
      return data.choices[0].message.content;
    }
  } catch (error) {
    console.error('Grok API error:', error);
  }
  
  return 'Grok AI Empfehlungen nicht verfügbar - API-Setup erforderlich';
}
