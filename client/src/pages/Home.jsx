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
      <section className="relative h-[80vh] flex items-center justify-center text-center px-4 overflow-hidden bg-white">
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-5 pointer-events-none scale-150 transform rotate-12">
          <h1 className="text-[40vw] font-black">{t('brand')}</h1>
        </div>
        <div className="z-10 max-w-4xl mx-auto space-y-8 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-black uppercase">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
            {t('slogan')}
          </p>
          <div className="flex justify-center gap-6">
            <Link to="/shop" className="px-12 py-5 bg-black text-white text-lg font-bold rounded-2xl hover:bg-primary transition-all transform hover:-translate-y-1 shadow-lg flex items-center gap-3 group">
              {t('hero.cta')}
              <ArrowRight className="group-hover:translate-x-1 transition-transform rtl:rotate-180" size={24} />
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
