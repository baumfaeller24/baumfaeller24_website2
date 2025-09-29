import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Phone, Mail, MapPin, Clock, Shield, Award, Wrench, TreePine, Truck, Zap } from 'lucide-react'
import SEOOptimizer from './components/SEOOptimizer.jsx'
import SeasonalContentAI from './components/SeasonalContentAI.jsx'
import HyperlocalContentAI from './components/HyperlocalContentAI.jsx'
import CompetitorMonitoringAI from './components/CompetitorMonitoringAI.jsx'
import ReviewManagementAI from './components/ReviewManagementAI.jsx'
import OptimizedWeatherBanner from './components/OptimizedWeatherBanner.jsx'
import ImprovedHero from './components/ImprovedHero.jsx'
import ImprovedServices from './components/ImprovedServices.jsx'
import './App.css'
import heroBackground from './assets/hero-background.jpg'
import treeEquipment from './assets/tree-equipment.jpg'
import craneWork from './assets/crane-work.jpg'
import treeWorker from './assets/tree-worker.jpg'

function App() {
  const [activeSection, setActiveSection] = useState('home')

  const services = [
    {
      icon: TreePine,
      title: "Baumfällung",
      description: "Professionelle Fällung von Bäumen jeder Größe mit modernster Technik und höchsten Sicherheitsstandards."
    },
    {
      icon: Wrench,
      title: "Spezialfällungen",
      description: "Komplexe Fällarbeiten mit Seilklettertechnik und Kran für schwer zugängliche Bereiche."
    },
    {
      icon: Shield,
      title: "Baumpflege",
      description: "Fachgerechte Baumpflege zur Erhaltung der Gesundheit und Verkehrssicherheit Ihrer Bäume."
    },
    {
      icon: Zap,
      title: "Sturmschäden",
      description: "24h Notdienst für die schnelle Beseitigung von Sturmschäden und Gefahrenbäumen."
    },
    {
      icon: Truck,
      title: "Wurzelstockentfernung",
      description: "Professionelles Stubbenfräsen und komplette Entfernung von Baumstümpfen."
    },
    {
      icon: TreePine,
      title: "Baufeldräumung",
      description: "Komplette Rodung und Räumung von Bauflächen für Ihr Bauprojekt."
    }
  ]

  const features = [
    { icon: Award, text: "12 Jahre Erfahrung" },
    { icon: Shield, text: "Vollversichert" },
    { icon: Clock, text: "24h Notdienst" },
    { icon: Wrench, text: "Moderne Technik" }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* AI Components - Hidden Background Processes */}
      <div style={{ display: 'none' }}>
        <SEOOptimizer 
          pageType="homepage" 
          location="Berlin Brandenburg"
          keywords={["baumfällung", "baumpflege", "sturmschäden"]}
        />
        <SeasonalContentAI />
        <HyperlocalContentAI />
        <CompetitorMonitoringAI />
        <ReviewManagementAI />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TreePine className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-foreground">Baumfäller24</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#home" className="text-foreground hover:text-green-600 transition-colors">Start</a>
              <a href="#services" className="text-foreground hover:text-green-600 transition-colors">Leistungen</a>
              <a href="#about" className="text-foreground hover:text-green-600 transition-colors">Über uns</a>
              <a href="#contact" className="text-foreground hover:text-green-600 transition-colors">Kontakt</a>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-green-600" />
              <span className="font-semibold text-foreground">030 65 94 00 49</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Weather Banner - Dynamic weather integration */}
      <div className="pt-20"> {/* Account for fixed navigation */}
        <OptimizedWeatherBanner />
      </div>

      {/* Improved Hero Section - Inspired by Evergreen Design */}
      <ImprovedHero heroBackground={heroBackground} />

      {/* Improved Services Section - 2-Column Layout inspired by Evergreen */}
      <ImprovedServices />

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-green-100 text-green-800">Über uns</Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                12 Jahre Erfahrung in Berlin & Brandenburg
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Seit über einem Jahrzehnt sind wir Ihr zuverlässiger Partner für alle Arbeiten rund um den Baum. 
                Ob einfache Baumfällung, komplexe Abtragung mittels Hebetechnik für schwer zugängliche Bäume, 
                oder großangelegte Rodungsarbeiten - wir sind Ihr Fachmann.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span>Vollversichert und zertifiziert</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Wrench className="h-5 w-5 text-green-600" />
                  <span>Modernste Technik und Ausrüstung</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-green-600" />
                  <span>24h Notdienst verfügbar</span>
                </div>
              </div>
              <Button className="bg-green-600 hover:bg-green-700">
                Mehr erfahren
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src={treeEquipment} 
                alt="Professionelle Baumfäll-Ausrüstung" 
                className="rounded-lg shadow-lg"
              />
              <img 
                src={craneWork} 
                alt="Kranarbeiten bei Baumfällung" 
                className="rounded-lg shadow-lg mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800">Kontakt</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Jetzt kostenloses Angebot anfordern
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Kontaktieren Sie uns für eine unverbindliche Beratung und ein kostenloses Angebot.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="p-8">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-2xl">Kontaktinformationen</CardTitle>
                <CardDescription>
                  Wir sind gerne für Sie da und beraten Sie umfassend.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-0 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Telefon</p>
                    <p className="text-muted-foreground">030 65 94 00 49</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Mobil/WhatsApp</p>
                    <p className="text-muted-foreground">0163 96 59 847</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold">E-Mail</p>
                    <p className="text-muted-foreground">info@baumfaeller24.de</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Adresse</p>
                    <p className="text-muted-foreground">
                      Alexander Seidler<br />
                      Tongruberweg 13<br />
                      12559 Berlin
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-8">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-2xl">Angebot anfordern</CardTitle>
                <CardDescription>
                  Beschreiben Sie uns Ihr Projekt und wir erstellen Ihnen ein kostenloses Angebot.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="Vorname" 
                      className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                    <input 
                      type="text" 
                      placeholder="Nachname" 
                      className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>
                  <input 
                    type="email" 
                    placeholder="E-Mail Adresse" 
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                  <input 
                    type="tel" 
                    placeholder="Telefonnummer" 
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                  <textarea 
                    placeholder="Beschreiben Sie Ihr Projekt..." 
                    rows="4"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  ></textarea>
                  <Button className="w-full bg-green-600 hover:bg-green-700 py-3">
                    Kostenloses Angebot anfordern
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <TreePine className="h-8 w-8 text-green-400" />
                <span className="text-2xl font-bold">Baumfäller24</span>
              </div>
              <p className="text-gray-400 mb-4">
                Ihr zuverlässiger Partner für professionelle Baumfällungen in Berlin & Brandenburg.
              </p>
              <div className="flex space-x-4">
                <Button size="sm" variant="outline" className="border-gray-600 text-gray-400 hover:text-white">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="border-gray-600 text-gray-400 hover:text-white">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Leistungen</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Baumfällung</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Spezialfällungen</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Baumpflege</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sturmschäden</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Unternehmen</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Über uns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Referenzen</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Karriere</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kontakt</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Rechtliches</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Impressum</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Datenschutz</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AGB</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Baumschutzsatzung</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Baumfäller24. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
