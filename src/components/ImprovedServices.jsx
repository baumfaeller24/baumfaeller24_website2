import React from 'react';
import { TreePine, Scissors, Shield, Zap, Drill, Truck } from 'lucide-react';

const ImprovedServices = () => {
  const services = [
    {
      id: 1,
      icon: TreePine,
      title: "Baumfällung",
      description: "Professionelle Fällung von Bäumen jeder Größe mit modernster Technik und höchsten Sicherheitsstandards.",
      color: "bg-green-600 hover:bg-green-700",
      iconColor: "text-green-600"
    },
    {
      id: 2,
      icon: Scissors,
      title: "Spezialfällungen", 
      description: "Komplexe Fällarbeiten mit Seilklettertechnik und Kran für schwer zugängliche Bereiche.",
      color: "bg-blue-600 hover:bg-blue-700",
      iconColor: "text-blue-600"
    },
    {
      id: 3,
      icon: Shield,
      title: "Baumpflege",
      description: "Fachgerechte Baumpflege zur Erhaltung der Gesundheit und Verkehrssicherheit Ihrer Bäume.",
      color: "bg-emerald-600 hover:bg-emerald-700", 
      iconColor: "text-emerald-600"
    },
    {
      id: 4,
      icon: Zap,
      title: "Sturmschäden",
      description: "24h Notdienst für die schnelle Beseitigung von Sturmschäden und Gefahrenbäumen.",
      color: "bg-red-600 hover:bg-red-700",
      iconColor: "text-red-600"
    },
    {
      id: 5,
      icon: Drill,
      title: "Wurzelstockentfernung",
      description: "Professionelles Stubbenfräsen und komplette Entfernung von Baumstümpfen.",
      color: "bg-amber-600 hover:bg-amber-700",
      iconColor: "text-amber-600"
    },
    {
      id: 6,
      icon: Truck,
      title: "Baufeldräumung",
      description: "Komplette Rodung und Räumung von Bauflächen für Ihr Bauprojekt.",
      color: "bg-orange-600 hover:bg-orange-700",
      iconColor: "text-orange-600"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Unsere Leistungen
          </h2>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Mit über 12 Jahren Erfahrung bieten wir Ihnen professionelle Baumarbeiten 
            mit modernster Technik und höchsten Sicherheitsstandards.
          </p>
          <p className="md:hidden text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mt-4">
            Von der einfachen Baumfällung bis zur komplexen Baufeldräumung - wir sind Ihr zuverlässiger Partner 
            in Berlin und Brandenburg. Nutzen Sie unseren kostenlosen Genehmigungscheck um herauszufinden, 
            ob für Ihr Vorhaben eine behördliche Genehmigung erforderlich ist.
          </p>
        </div>

        {/* Services Grid - 2 Column Layout inspired by Evergreen */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service) => {
            const IconComponent = service.icon;
            
            return (
              <div 
                key={service.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 
                           transform hover:-translate-y-2 overflow-hidden group"
              >
                <div className="p-8">
                  
                  {/* Icon and Title Row */}
                  <div className="flex items-center mb-6">
                    <div className={`w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center 
                                   group-hover:bg-gray-50 transition-colors duration-300 mr-4`}>
                      <IconComponent className={`w-8 h-8 ${service.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {service.title}
                      </h3>
                      <div className={`w-12 h-1 ${service.color.replace('hover:', '').replace('bg-', 'bg-')} rounded-full`}></div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-4 md:mb-8 text-lg">
                    {service.description}
                  </p>

                  {/* Buttons removed - cleaner design, no broken links */}
                </div>

                {/* Service Number Badge */}
                <div className="absolute top-4 right-4">
                  <div className={`w-8 h-8 rounded-full ${service.color.replace('hover:', '').replace('bg-', 'bg-')} 
                                 text-white flex items-center justify-center font-bold text-sm`}>
                    {service.id}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom call-to-action removed for cleaner design */}
      </div>
    </section>
  );
};

export default ImprovedServices;
