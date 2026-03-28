import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Star, Zap } from 'lucide-react';
import BookCard from '../components/BookCard';

const Home = () => {
  const { t, i18n } = useTranslation();
  const [featuredBooks, setFeaturedBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/books?limit=4')
      .then(res => setFeaturedBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="space-y-32 mb-32">
  {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center px-4 overflow-hidden bg-gradient-to-b from-white via-white/90 to-gold-50">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-500/5 via-transparent to-transparent"></div>
          <div className="absolute inset-0 z-10 opacity-20">
            <h1 className="text-[35vw] font-display font-black text-gold-200 absolute inset-0 pointer-events-none rotate-12 scale-110">ATHAR</h1>
          </div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl animate-pulse-glow"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        </div>
        <div className="relative z-20 max-w-5xl mx-auto space-y-12 animate-fade-in" style={{animationDelay: '0.3s'}}>
          <div className="space-y-4">
            <span className="inline-block px-6 py-2 bg-gradient-to-r from-gold-500 to-primary text-black font-black text-sm uppercase tracking-wider rounded-full shadow-lg animate-float" style={{animationDelay: '0.5s'}}>Digital Publishing Excellence</span>
            <h1 className="text-7xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem] font-display font-black tracking-[-0.1em] bg-gradient-to-r from-black via-gray-900 to-black bg-clip-text text-transparent leading-none">
              أثر
            </h1>
            <p className="font-display text-3xl md:text-4xl text-gray-600 max-w-3xl mx-auto leading-relaxed opacity-90">
              {t('slogan')}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Link to="/shop" className="group px-12 py-7 bg-gradient-to-r from-black to-gray-900 text-white font-display font-black text-xl rounded-3xl shadow-2xl hover:shadow-gold/50 hover:shadow-2xl hover:from-gold-500 hover:to-primary hover:-translate-y-2 transition-all duration-500 flex items-center gap-4 uppercase tracking-wider">
              <span>{t('hero.cta')}</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform rtl:rotate-180" />
            </Link>
            <Link to="/about" className="font-black text-lg text-gray-500 hover:text-black transition-colors uppercase tracking-wider flex items-center gap-2 hover:gap-4">
              {t('nav.about')} <ArrowRight className="w-5 h-5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-16">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto">
            <BookOpen size={32} />
          </div>
          <h3 className="text-2xl font-bold">Diverse Library</h3>
          <p className="text-gray-500">Access a wide range of exclusive digital content curated for modern thinkers.</p>
        </div>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto">
            <Zap size={32} />
          </div>
          <h3 className="text-2xl font-bold">Instant Delivery</h3>
          <p className="text-gray-500">Your books are delivered directly to your inbox immediately after purchase.</p>
        </div>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto">
            <Star size={32} />
          </div>
          <h3 className="text-2xl font-bold">Premium Quality</h3>
          <p className="text-gray-500">Carefully selected high-quality publications that leave a lasting impact.</p>
        </div>
      </section>

      {/* Featured Books */}
      <section className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="flex justify-between items-end border-b border-gray-100 pb-8">
          <h2 className="text-4xl font-black">{i18n.language === 'ar' ? 'الكتب المميزة' : 'Featured Books'}</h2>
          <Link to="/shop" className="text-primary font-bold hover:underline flex items-center gap-2">
            View All <ArrowRight size={20} className="rtl:rotate-180" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredBooks.map(book => (
            <BookCard key={book._id} book={book} />
          ))}
          {featuredBooks.length === 0 && [1, 2, 3, 4].map(i => (
            <div key={i} className="animate-pulse bg-gray-50 aspect-[3/4] rounded-2xl" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
