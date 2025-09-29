import React from 'react';
import { Phone, Mail, CheckCircle } from 'lucide-react';

const ImprovedHero = ({ heroBackground }) => {
  const trustSignals = [
    { icon: CheckCircle, text: "12 Jahre Erfahrung" },
    { icon: CheckCircle, text: "Vollversichert" },
    { icon: CheckCircle, text: "24h Notdienst" },
    { icon: CheckCircle, text: "Moderne Technik" }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Natural Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        {/* More natural, softer overlay inspired by Evergreen */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60"></div>
        
        {/* Subtle nature-inspired pattern overlay */}
        <div className="absolute inset-0 opacity-10" 
             style={{
               backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
                                radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)`
             }}>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4">
        
        {/* Main Headline - More natural, less dramatic */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            <span className="block text-white mb-2">Ihr zuverlässiger Partner für</span>
            <span className="block text-green-400 text-5xl md:text-7xl lg:text-8xl">
              Baumarbeiten
            </span>
          </h1>
          
          {/* Subtitle with more natural tone */}
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Professionelle Baumfällung, Baumpflege und Sturmschadenbeseitigung 
            in Berlin & Brandenburg – mit Erfahrung, Sicherheit und Vertrauen.
          </p>
        </div>

        {/* Trust Signals - Inspired by Evergreen's clean approach */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 mb-12">
          {trustSignals.map((signal, index) => (
            <div 
              key={index}
              className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm 
                         px-4 py-2 rounded-full border border-white/20
                         hover:bg-white/20 transition-all duration-300"
            >
              <signal.icon className="w-5 h-5 text-green-400" />
              <span className="text-sm md:text-base font-medium">{signal.text}</span>
            </div>
          ))}
        </div>

        {/* Call-to-Action Buttons - Cleaner, more professional */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          
          {/* Primary CTA - Phone */}
          <button 
            onClick={() => window.location.href = 'tel:030659400049'}
            className="group bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl 
                       font-semibold text-lg transition-all duration-300 flex items-center
                       hover:shadow-2xl transform hover:scale-105 min-w-[280px] justify-center"
          >
            <Phone className="w-6 h-6 mr-3 group-hover:animate-pulse" />
            <div className="text-left">
              <div className="text-sm opacity-90">Sofort erreichbar</div>
              <div className="font-bold">030 65 94 00 49</div>
            </div>
          </button>

          {/* Secondary CTA - Contact Form */}
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl 
                       font-semibold text-lg transition-all duration-300 flex items-center
                       backdrop-blur-sm border border-white/30 hover:border-white/50
                       min-w-[280px] justify-center"
          >
            <Mail className="w-6 h-6 mr-3 group-hover:animate-pulse" />
            <div className="text-left">
              <div className="text-sm opacity-90">Kostenlos & unverbindlich</div>
              <div className="font-bold">Angebot anfordern</div>
            </div>
          </button>
        </div>

        {/* Emergency Notice - Subtle but visible */}
        <div className="bg-red-600/90 backdrop-blur-sm text-white px-6 py-4 rounded-xl 
                        border border-red-500/50 max-w-2xl mx-auto">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-3 h-3 bg-red-300 rounded-full animate-pulse"></div>
            <span className="font-semibold text-lg">24h Notdienst verfügbar</span>
            <div className="w-3 h-3 bg-red-300 rounded-full animate-pulse"></div>
          </div>
          <p className="text-sm mt-2 opacity-90">
            Bei Sturmschäden und Gefahrenbäumen sind wir rund um die Uhr für Sie da
          </p>
        </div>
      </div>

      {/* Scroll Indicator - Subtle and elegant */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center text-white/70 hover:text-white transition-colors duration-300">
          <span className="text-sm mb-2">Mehr erfahren</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Natural decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-900/20 to-transparent pointer-events-none"></div>
      
      {/* Subtle leaf pattern in corners */}
      <div className="absolute top-10 left-10 w-20 h-20 opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full text-green-300">
          <path d="M50,10 Q80,30 70,60 Q50,80 30,60 Q20,30 50,10 Z" fill="currentColor" />
        </svg>
      </div>
      
      <div className="absolute bottom-10 right-10 w-16 h-16 opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full text-green-300">
          <path d="M50,10 Q80,30 70,60 Q50,80 30,60 Q20,30 50,10 Z" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
};

export default ImprovedHero;
