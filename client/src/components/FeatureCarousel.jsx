import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FeatureCarousel = ({ features, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [features.length]);

  const goToPrev = () => setCurrentIndex((prev) => prev === 0 ? features.length - 1 : prev - 1);
  const goToNext = () => setCurrentIndex((prev) => prev === features.length - 1 ? 0 : prev + 1);

  return (
    <div className="relative w-full">
      <h3 className="text-3xl font-display font-black mb-12 text-center uppercase tracking-wider bg-gradient-to-r from-gold-600 to-primary bg-clip-text text-transparent">
        {title}
      </h3>
      <div className="relative h-96 lg:h-[500px] rounded-4xl overflow-hidden shadow-2xl bg-gradient-to-r from-gray-50/50 to-white/60 backdrop-blur-xl border border-gold/10">
        {features.map((feature, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-all duration-1000 transform ${
              index === currentIndex 
                ? 'scale-100 opacity-100' 
                : 'scale-75 opacity-20 blur-sm'
            }`}
            style={{ zIndex: features.length - index }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-gold/5"></div>
            <div className="relative h-full flex items-center justify-center p-12 lg:p-20 text-center">
              <div className="max-w-4xl mx-auto">
                <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-gold-400 to-primary rounded-4xl flex items-center justify-center shadow-2xl animate-float">
                  <CheckCircle className="w-20 h-20 text-black" />
                </div>
                <h4 className="text-4xl lg:text-5xl font-display font-black mb-6 leading-tight bg-gradient-to-r from-black to-gray-900 bg-clip-text text-transparent">
                  {feature.title}
                </h4>
                <p className="text-xl lg:text-2xl text-gray-700 font-medium leading-relaxed max-w-2xl mx-auto opacity-95">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
        <button 
          onClick={goToPrev}
          className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-white/80 hover:bg-white backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-gold/30 hover:scale-110 transition-all duration-300 border border-white/50 w-16 h-16 flex items-center justify-center"
        >
          <ChevronLeft className="w-8 h-8 text-gray-700" />
        </button>
        <button 
          onClick={goToNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-white/80 hover:bg-white backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-gold/30 hover:scale-110 transition-all duration-300 border border-white/50 w-16 h-16 flex items-center justify-center"
        >
          <ChevronRight className="w-8 h-8 text-gray-700" />
        </button>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-10 bg-primary shadow-lg' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureCarousel;

