import React from 'react';
import { useTranslation } from 'react-i18next';
import { Compass, Eye, Target, Globe } from 'lucide-react';

const About = () => {
  const { t } = useTranslation();
  return (
    <div className="max-w-7xl mx-auto px-4 py-32 space-y-40">
      <header className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-black uppercase">{t('nav.about')}</h1>
        <p className="text-2xl text-gray-500 font-medium leading-relaxed">
          {t('brand')} is a premier digital publishing house dedicated to creating meaningful impact through the power of curated knowledge.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-32 items-center">
        <div className="space-y-12">
          <div className="space-y-4">
            <h3 className="text-4xl font-black flex items-center gap-4">
              <Compass className="text-primary" size={32} /> Mission
            </h3>
            <p className="text-xl text-gray-500 leading-relaxed">
              Our mission is to empower thinkers, creators, and lifelong learners by providing high-quality digital publications that challenge the status quo and inspire personal growth.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-4xl font-black flex items-center gap-4">
              <Eye className="text-primary" size={32} /> Vision
            </h3>
            <p className="text-xl text-gray-500 leading-relaxed">
              To become the world's most trusted source for premium digital content that bridges cultural divides and fosters a global community of intellectual excellence.
            </p>
          </div>
        </div>
        <div className="bg-gray-50 aspect-square rounded-[100px] overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-700 relative">
          <div className="absolute inset-0 bg-primary opacity-10 blur-3xl rounded-full translate-x-10 translate-y-10" />
          <div className="absolute inset-0 flex items-center justify-center p-20">
             <Globe className="w-full h-full text-black opacity-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
