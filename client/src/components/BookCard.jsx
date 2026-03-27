import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ShoppingCart, ExternalLink } from 'lucide-react';

const BookCard = ({ book }) => {
  const { t, i18n } = useTranslation();
  const title = i18n.language === 'ar' ? book.titleArabic : book.title;
  const description = i18n.language === 'ar' ? book.descriptionArabic : book.description;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={`http://localhost:5000/${book.coverImage}`} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
           <Link 
            to={`/product/${book._id}`} 
            className="p-3 bg-white rounded-full text-black hover:bg-primary hover:text-white transition-colors"
          >
            <ExternalLink size={24} />
          </Link>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 truncate">{title}</h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-black text-black">${book.price}</span>
          <Link to={`/product/${book._id}`} className="px-6 py-2 bg-black text-white text-sm rounded-lg hover:bg-primary transition-colors">
            {t('hero.cta')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
