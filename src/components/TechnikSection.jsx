import React from 'react';
import { Badge } from '@/components/ui/badge.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { ArrowUp, Truck, TreePine, Wrench } from 'lucide-react';

const TechnikSection = () => {
  const equipment = [
    {
      icon: ArrowUp,
      title: "Hebebühne bis 40m",
      description: "Moderne Arbeitsbühnen für sichere Arbeiten in großer Höhe - ideal für Privatleute mit schwer zugänglichen Bäumen.",
      features: ["40m Arbeitshöhe", "Präzise Steuerung", "Enge Durchfahrten möglich"],
      color: "blue"
    },
    {
      icon: TreePine,
      title: "Seilklettertechnik",
      description: "Professionelle Kletterausrüstung für Arbeiten ohne Maschinenzugang - unsere Spezialität für komplexe Fällungen.",
      features: ["Zertifizierte Kletterer", "Modernste Seiltechnik", "Jeder Baum erreichbar"],
      color: "green"
    },
    {
      icon: Truck,
      title: "Schweres Gerät",
      description: "Bagger, Mulcher und Spezialmaschinen für Großprojekte - effiziente Baufeldräumung bis 50 Hektar.",
      features: ["Moderne Bagger", "Forstmulcher", "Bis 50 Hektar"],
      color: "orange"
    },
    {
      icon: Wrench,
      title: "Stubbenfräse",
      description: "Professionelle Fräsmaschinen für die komplette Entfernung von Wurzelstöcken bis 80cm Durchmesser.",
      features: ["Bis 80cm Durchmesser", "Tiefenfräsung möglich", "Saubere Ergebnisse"],
      color: "brown"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: "bg-blue-50 border-blue-200 text-blue-800",
      green: "bg-green-50 border-green-200 text-green-800", 
      orange: "bg-orange-50 border-orange-200 text-orange-800",
      brown: "bg-amber-50 border-amber-200 text-amber-800"
    };
    return colorMap[color] || colorMap.green;
  };

  const getIconColorClasses = (color) => {
    const colorMap = {
      blue: "text-blue-600",
      green: "text-green-600",
      orange: "text-orange-600", 
      brown: "text-amber-600"
    };
    return colorMap[color] || colorMap.green;
  };

  return (
    <section className="py-18 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <Badge className="mb-4 bg-green-100 text-green-800">Unsere Technik</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5">
            Moderne Technik für jede Herausforderung
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Von der Hebebühne für Privatleute bis zum schweren Gerät für Großprojekte - 
            wir haben die richtige Ausrüstung für jeden Auftrag.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {equipment.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-green-200">
                <CardContent className="p-7">
                  <div className="flex items-start space-x-4">
                    <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${getColorClasses(item.color)}`}>
                      <IconComponent className={`h-7 w-7 ${getIconColorClasses(item.color)}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-green-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="space-y-2">
                        {item.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-10">
          <div className="bg-white rounded-lg p-7 shadow-sm border border-border max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Welche Technik benötigen Sie?
            </h3>
            <p className="text-muted-foreground mb-6">
              Unsere Experten beraten Sie gerne bei der Auswahl der optimalen Technik für Ihr Projekt.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:03065940049" 
                className="inline-flex items-center justify-center px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                📞 030 65 94 00 49
              </a>
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-5 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors font-semibold"
              >
                Kostenlose Beratung
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnikSection;
