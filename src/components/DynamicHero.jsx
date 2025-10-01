import React, { useState, useEffect } from 'react';
import { Phone, Mail, CheckCircle, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

// Import work scene images
import heroBackground from '../assets/hero-background.jpg';
import treeClimber from '../assets/tree-climber.jpg';
import excavatorWork from '../assets/excavator-work.jpg';
import stumpGrinder from '../assets/stump-grinder.jpg';
import treeHandler from '../assets/tree-handler.jpg';

const DynamicHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Professional work scenes with descriptions
  const workScenes = [
    {
      image: heroBackground,
      title: "Ihr zuverlässiger Partner für",
      subtitle: "Baumarbeiten",
      description: "Professionelle Baumfällung, Baumpflege und Sturmschadenbeseitigung in Berlin & Brandenburg",
      focus: "Allgemeine Baumarbeiten",
      mobilePosition: "bg-center"
    },
    {
      image: treeClimber,
      title: "Professionelle",
      subtitle: "Seilklettertechnik",
      description: "Sichere Baumfällung in schwer zugänglichen Bereichen mit modernster Klettertechnik",
      focus: "Spezialfällungen",
      mobilePosition: "bg-right-top"
    },
    {
      image: excavatorWork,
      title: "Großflächige",
      subtitle: "Rodungsarbeiten",
      description: "Effiziente Flächenräumung mit schwerem Gerät für Bauprojekte und Landschaftsgestaltung",
      focus: "Baufeldräumung",
      mobilePosition: "bg-left-center"
    },
    {
      image: stumpGrinder,
      title: "Professionelle",
      subtitle: "Stubbenfräsung",
      description: "Komplette Entfernung von Baumstümpfen mit modernster Frästechnik",
      focus: "Wurzelstockentfernung",
      mobilePosition: "bg-center-top"
    },
    {
      image: treeHandler,
      title: "Moderne",
      subtitle: "Maschinentechnik",
      description: "Präzise Baumarbeiten mit speziellen Maschinen für maximale Sicherheit und Effizienz",
      focus: "Technische Expertise",
      mobilePosition: "bg-right-center"
    }
  ];

  const trustSignals = [
    { icon: CheckCircle, text: "12 Jahre Erfahrung" },
    { icon: CheckCircle, text: "Vollversichert" },
    { icon: CheckCircle, text: "24h Notdienst" },
    { icon: CheckCircle, text: "Moderne Technik" }
  ];

  // Auto-advance slides
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % workScenes.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isPlaying, workScenes.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % workScenes.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + workScenes.length) % workScenes.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const currentScene = workScenes[currentSlide];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Dynamic Background Images */}
      <div className="absolute inset-0">
        {workScenes.map((scene, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-contain md:bg-cover ${scene.mobilePosition} md:bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${scene.image})` }}
          >
            {/* Dynamic overlay based on image */}
            <div className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide 
                ? 'bg-gradient-to-b from-black/40 via-black/50 to-black/70' 
                : 'bg-black/60'
            }`}></div>
          </div>
        ))}
      </div>

      {/* Slide Navigation Controls */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20">
        <button
          onClick={prevSlide}
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full
                     transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20">
        <button
          onClick={nextSlide}
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full
                     transition-all duration-300 hover:scale-110"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Play/Pause Control */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={togglePlayPause}
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full
                     transition-all duration-300 hover:scale-110"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4">
        
        {/* Dynamic Headlines */}
        <div className="mb-8">
          <div className="mb-4">
            <span className="inline-block bg-green-600/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
              {currentScene.focus}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-fade-in">
            <span className="block text-white mb-2 transition-all duration-500">
              {currentScene.title}
            </span>
            <span className="block text-green-400 text-4xl md:text-5xl lg:text-6xl transition-all duration-500">
              {currentScene.subtitle}
            </span>
          </h1>
          
          {/* Dynamic Description */}
          <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-4xl mx-auto leading-relaxed transition-all duration-500">
            {currentScene.description}
          </p>
        </div>

        {/* Trust Signals */}
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

        {/* Call-to-Action Buttons */}
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

        {/* Emergency Notice */}
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

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {workScenes.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-green-400 scale-125' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
        
        {/* Scene Description */}
        <div className="mt-4 text-center">
          <p className="text-white/80 text-sm">
            {currentSlide + 1} / {workScenes.length} - {currentScene.focus}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
        <div 
          className="h-full bg-green-400 transition-all duration-300"
          style={{ 
            width: `${((currentSlide + 1) / workScenes.length) * 100}%` 
          }}
        ></div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center text-white/70 hover:text-white transition-colors duration-300">
          <span className="text-sm mb-2">Mehr erfahren</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Natural decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-900/20 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default DynamicHero;
