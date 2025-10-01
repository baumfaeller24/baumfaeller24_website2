import React, { useState } from 'react';
import { TreePine, MapPin, Ruler, FileCheck, AlertTriangle, CheckCircle, Loader, Phone } from 'lucide-react';

const TreePermitChecker = () => {
  const [formData, setFormData] = useState({
    location: '',
    treeType: '',
    diameter: '',
    height: '',
    reason: '',
    property: ''
  });
  const [result, setResult] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  const locations = [
    { value: 'berlin-mitte', label: 'Berlin-Mitte' },
    { value: 'berlin-charlottenburg', label: 'Berlin-Charlottenburg' },
    { value: 'berlin-kreuzberg', label: 'Berlin-Kreuzberg' },
    { value: 'berlin-prenzlauer-berg', label: 'Berlin-Prenzlauer Berg' },
    { value: 'berlin-wedding', label: 'Berlin-Wedding' },
    { value: 'potsdam', label: 'Potsdam' },
    { value: 'brandenburg-havel', label: 'Brandenburg an der Havel' },
    { value: 'cottbus', label: 'Cottbus' },
    { value: 'frankfurt-oder', label: 'Frankfurt (Oder)' },
    { value: 'oranienburg', label: 'Oranienburg' },
    { value: 'falkensee', label: 'Falkensee' },
    { value: 'bernau', label: 'Bernau bei Berlin' },
    { value: 'other-berlin', label: 'Anderer Berliner Bezirk' },
    { value: 'other-brandenburg', label: 'Anderer Landkreis Brandenburg' }
  ];

  const treeTypes = [
    'Laubbaum (Eiche, Buche, Ahorn, etc.)',
    'Nadelbaum (Kiefer, Fichte, Tanne, etc.)',
    'Obstbaum (Apfel, Birne, Kirsche, etc.)',
    'Straßenbaum',
    'Parkbaum',
    'Hecke/Strauch',
    'Nicht sicher/Mehrere Bäume'
  ];

  const reasons = [
    'Baufeldräumung/Neubau',
    'Baum ist krank/abgestorben',
    'Sturmschäden/Sicherheit',
    'Lichtmangel/Verschattung',
    'Wurzelschäden am Gebäude',
    'Allergie/Gesundheit',
    'Gartenumgestaltung',
    'Sonstiger Grund'
  ];

  const properties = [
    'Privatgrundstück',
    'Öffentlicher Raum/Straße',
    'Gemeinschaftseigentum',
    'Nicht sicher'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const checkPermitRequirement = async () => {
    setIsChecking(true);
    setResult(null);

    try {
      const response = await fetch('/api/check-tree-permit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Permit check failed');
      }

      const data = await response.json();
      setResult(data);

    } catch (error) {
      console.error('Permit check error:', error);
      // Fallback result
      setResult({
        requiresPermit: 'unknown',
        confidence: 'low',
        summary: 'Genehmigungsprüfung temporär nicht verfügbar. Bitte kontaktieren Sie uns für eine persönliche Beratung.',
        details: 'Aufgrund technischer Probleme können wir die Genehmigungspflicht nicht automatisch prüfen.',
        nextSteps: [
          'Kontaktieren Sie Baumfäller24 für kostenlose Beratung',
          'Wir prüfen die Genehmigungspflicht für Sie',
          'Bei Bedarf übernehmen wir den Genehmigungsantrag'
        ],
        authority: 'Lokale Behörde',
        estimatedTime: 'Unbekannt',
        source: 'Fallback System'
      });
    } finally {
      setIsChecking(false);
    }
  };

  const isFormComplete = formData.location && formData.treeType && formData.diameter && formData.reason && formData.property;

  const getResultIcon = () => {
    if (!result) return null;
    
    switch (result.requiresPermit) {
      case 'yes':
        return <AlertTriangle className="w-8 h-8 text-red-600" />;
      case 'no':
        return <CheckCircle className="w-8 h-8 text-green-600" />;
      case 'maybe':
        return <FileCheck className="w-8 h-8 text-yellow-600" />;
      default:
        return <FileCheck className="w-8 h-8 text-gray-600" />;
    }
  };

  const getResultColor = () => {
    if (!result) return 'border-gray-200';
    
    switch (result.requiresPermit) {
      case 'yes':
        return 'border-red-200 bg-red-50';
      case 'no':
        return 'border-green-200 bg-green-50';
      case 'maybe':
        return 'border-yellow-200 bg-yellow-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <FileCheck className="w-8 h-8 text-green-600" />
            <h2 className="text-3xl font-bold text-gray-800">Brauche ich eine Baumfällgenehmigung?</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Unsere KI prüft anhand Ihrer Angaben, ob für Ihr Baumfällvorhaben eine Genehmigung erforderlich ist. 
            Kostenlos und in wenigen Sekunden.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Form Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Ihre Angaben</h3>
              
              {/* Location */}
              <div className="mb-6">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>Standort des Baumes</span>
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Bitte wählen...</option>
                  {locations.map(loc => (
                    <option key={loc.value} value={loc.value}>{loc.label}</option>
                  ))}
                </select>
              </div>

              {/* Tree Type */}
              <div className="mb-6">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <TreePine className="w-4 h-4" />
                  <span>Baumart</span>
                </label>
                <select
                  value={formData.treeType}
                  onChange={(e) => handleInputChange('treeType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Bitte wählen...</option>
                  {treeTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Diameter */}
              <div className="mb-6">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <Ruler className="w-4 h-4" />
                  <span>Stammdurchmesser (ca.)</span>
                </label>
                <select
                  value={formData.diameter}
                  onChange={(e) => handleInputChange('diameter', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Bitte wählen...</option>
                  <option value="unter-10cm">Unter 10 cm</option>
                  <option value="10-20cm">10-20 cm</option>
                  <option value="20-40cm">20-40 cm</option>
                  <option value="40-60cm">40-60 cm</option>
                  <option value="60-80cm">60-80 cm</option>
                  <option value="ueber-80cm">Über 80 cm</option>
                  <option value="unbekannt">Nicht messbar/Unbekannt</option>
                </select>
              </div>

              {/* Height */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Baumhöhe (geschätzt)
                </label>
                <select
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Bitte wählen...</option>
                  <option value="unter-3m">Unter 3 Meter</option>
                  <option value="3-6m">3-6 Meter</option>
                  <option value="6-10m">6-10 Meter</option>
                  <option value="10-15m">10-15 Meter</option>
                  <option value="ueber-15m">Über 15 Meter</option>
                  <option value="unbekannt">Unbekannt</option>
                </select>
              </div>

              {/* Reason */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Grund für die Fällung
                </label>
                <select
                  value={formData.reason}
                  onChange={(e) => handleInputChange('reason', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Bitte wählen...</option>
                  {reasons.map(reason => (
                    <option key={reason} value={reason}>{reason}</option>
                  ))}
                </select>
              </div>

              {/* Property */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Eigentumsart
                </label>
                <select
                  value={formData.property}
                  onChange={(e) => handleInputChange('property', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Bitte wählen...</option>
                  {properties.map(prop => (
                    <option key={prop} value={prop}>{prop}</option>
                  ))}
                </select>
              </div>

              {/* Check Button */}
              <button
                onClick={checkPermitRequirement}
                disabled={!isFormComplete || isChecking}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                {isChecking ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>KI prüft Genehmigungspflicht...</span>
                  </>
                ) : (
                  <>
                    <FileCheck className="w-5 h-5" />
                    <span>Genehmigung prüfen</span>
                  </>
                )}
              </button>
            </div>

            {/* Result Section */}
            <div className={`bg-white rounded-xl shadow-sm border-2 p-6 ${getResultColor()}`}>
              {!result ? (
                <div className="text-center py-12">
                  <FileCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Genehmigungsprüfung</h3>
                  <p className="text-gray-500">
                    Füllen Sie das Formular aus und klicken Sie auf "Genehmigung prüfen", 
                    um eine KI-gestützte Einschätzung zu erhalten.
                  </p>
                </div>
              ) : (
                <div>
                  {/* Result Header */}
                  <div className="flex items-center space-x-3 mb-4">
                    {getResultIcon()}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {result.requiresPermit === 'yes' && 'Genehmigung erforderlich'}
                        {result.requiresPermit === 'no' && 'Keine Genehmigung nötig'}
                        {result.requiresPermit === 'maybe' && 'Genehmigung möglich'}
                        {result.requiresPermit === 'unknown' && 'Prüfung erforderlich'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Vertrauen: {result.confidence === 'high' ? 'Hoch' : result.confidence === 'medium' ? 'Mittel' : 'Niedrig'}
                        {result.source && ` • ${result.source}`}
                      </p>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="mb-6">
                    <p className="text-gray-700 leading-relaxed">{result.summary}</p>
                  </div>

                  {/* Details */}
                  {result.details && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-2">Details:</h4>
                      <p className="text-sm text-gray-600">{result.details}</p>
                    </div>
                  )}

                  {/* Next Steps */}
                  {result.nextSteps && result.nextSteps.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-2">Nächste Schritte:</h4>
                      <ul className="space-y-1">
                        {result.nextSteps.map((step, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                            <span className="text-green-600 font-bold">•</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Authority Info */}
                  {result.authority && (
                    <div className="mb-6 p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-1">Zuständige Behörde:</h4>
                      <p className="text-sm text-blue-700">{result.authority}</p>
                      {result.estimatedTime && (
                        <p className="text-xs text-blue-600 mt-1">
                          Bearbeitungszeit: {result.estimatedTime}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Contact CTA */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="bg-green-600 text-white p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Professionelle Unterstützung</h4>
                      <p className="text-sm mb-3">
                        Wir übernehmen gerne die Genehmigungsbeantragung und die fachgerechte Baumfällung für Sie.
                      </p>
                      <button 
                        onClick={() => window.location.href = 'tel:03065940049'}
                        className="flex items-center space-x-2 bg-white text-green-600 px-4 py-2 rounded font-semibold hover:bg-gray-100 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        <span>030 65 94 00 49</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            <strong>Hinweis:</strong> Diese KI-gestützte Einschätzung dient nur zur ersten Orientierung und ersetzt keine 
            rechtliche Beratung. Für verbindliche Auskünfte wenden Sie sich an die zuständige Behörde oder kontaktieren Sie uns 
            für eine professionelle Beratung.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TreePermitChecker;
