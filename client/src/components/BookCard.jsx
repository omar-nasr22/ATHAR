import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ShoppingCart, ExternalLink, ArrowRight } from 'lucide-react';

const BookCard = ({ book }) => {
  const { t, i18n } = useTranslation();
  const title = i18n.language === 'ar' ? book.titleArabic : book.title;
  const description = i18n.language === 'ar' ? book.descriptionArabic : book.description;

  return (
    <div className="group bg-gradient-to-b from-white/90 to-white/50 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl hover:shadow-amber/25 border border-amber/20 hover:border-amber/40 hover:shadow-[0_25px_50px_-12px_rgba(212,175,55,0.25)] hover:-translate-y-3 transition-all duration-700">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/${book.coverImage}`} 
          alt={title}
          className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-2 group-hover:brightness-110"
        />
        <div className="absolute top-4 left-4">
          <span className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-black/90 text-xs font-black rounded-full shadow-lg backdrop-blur animate-pulse-glow">New Release</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 backdrop-blur-md opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-700">
          <Link to={`/product/${book._id}`} className="p-6 bg-white/30 hover:bg-white/50 backdrop-blur-xl rounded-3xl text-white/90 hover:text-black font-bold shadow-2xl border border-white/30 animate-float hover:animate-none hover:scale-110 transition-all duration-300">
            <ExternalLink size={28} />
          </Link>
        </div>
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-display font-black mb-3 line-clamp-2 leading-tight">{title}</h3>
        <p className="text-gray-600 text-base line-clamp-2 mb-6 leading-relaxed">{description}</p>
        <div className="flex justify-between items-center pt-4 border-t border-amber/20">
          <span className="text-3xl font-display font-black bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">$ {book.price}</span>
          <Link to={`/product/${book._id}`} className="group/btn px-8 py-4 bg-gradient-to-r from-black to-amber-500 text-white font-black rounded-2xl shadow-2xl hover:shadow-amber/50 hover:scale-105 hover:from-amber-500 hover:to-amber-600 transition-all duration-300">
            {t('hero.cta')} <ArrowRight className="inline ml-2 group-hover/btn:translate-x-2 transition-transform rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;

