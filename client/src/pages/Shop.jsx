import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Search, Filter, ArrowDownWideIcon } from 'lucide-react';
import BookCard from '../components/BookCard';

const Shop = () => {
  const { t } = useTranslation();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetchBooks();
  }, [searchTerm, activeCategory]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/books?search=${searchTerm}&category=${activeCategory === 'All' ? '' : activeCategory}`);
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 space-y-16">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-gray-100 pb-16">
        <h1 className="text-5xl font-black">{t('shop.title')}</h1>
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={20} />
          <input 
            type="text" 
            placeholder={t('shop.search')} 
            className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-medium"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-16">
        <aside className="w-full md:w-64 space-y-12">
          <div className="space-y-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Filter size={20} /> {t('shop.filter')}
            </h3>
            <div className="flex flex-wrap md:flex-col gap-3">
              {['All', 'Business', 'Philosophy', 'Art', 'Tech'].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-xl text-left font-bold transition-all ${activeCategory === cat ? 'bg-black text-white shadow-xl translate-x-1' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
          {loading ? (
            Array.from({length: 12}, (_, i) => (
              <div key={i} className="break-inside-avoid animate-pulse bg-gradient-to-br from-gray-100 to-gray-200 aspect-[2.8/4] rounded-3xl shadow-lg" />
            ))
          ) : (
            books.map(book => (
              <div key={book._id} className="break-inside-avoid mb-8">
                <BookCard book={book} />
              </div>
            ))
          )}
          {!loading && books.length === 0 && (
            <div className="col-span-full row-span-full py-32 text-center text-gray-400 font-display font-bold text-3xl uppercase bg-gradient-to-r from-transparent via-white/80 to-transparent rounded-3xl p-20 backdrop-blur-sm shadow-inner">
              <BookOpen className="w-32 h-32 mx-auto text-gray-300 mb-8 animate-spin-slow" />
              No books found. Upload some via <Link to="/admin" className="text-primary hover:underline font-black">Admin Panel</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
