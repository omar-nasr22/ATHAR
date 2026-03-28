import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100 top-0">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="text-3xl font-black bg-gradient-to-r from-black to-gray-800 bg-clip-text text-transparent">أثر</h1>
          <div className="space-x-6">
            <Link to="/" className="text-lg font-bold hover:text-amber-500">Home</Link>
            <Link to="/shop" className="text-lg font-bold hover:text-amber-500">Shop</Link>
            <Link to="/about" className="text-lg font-bold hover:text-amber-500">About</Link>
          </div>
        </div>
      </nav>
      <main className="pt-20">
        <section className="h-screen flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-black mb-8 bg-gradient-to-r from-black via-gray-900 to-amber-600 bg-clip-text text-transparent animate-fade-in">
            أثر ATHAR
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 mb-12 max-w-2xl leading-relaxed animate-fade-in-up">
            لأن المعرفة تترك أثرا
          </p>
          <div className="flex gap-6">
            <Link to="/shop" className="px-12 py-6 bg-black text-white text-xl font-bold rounded-3xl hover:bg-gray-800 transition-all shadow-2xl hover:shadow-amber/25 hover:-translate-y-1">
              تصفح الكتب <ArrowRight className="inline ml-2" />
            </Link>
            <Link to="/about" className="px-12 py-6 border-2 border-black text-black text-xl font-bold rounded-3xl hover:bg-black hover:text-white transition-all">
              من نحن
            </Link>
          </div>
        </section>
        
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-5xl font-black text-center mb-24 bg-gradient-to-r from-black to-gray-800 bg-clip-text text-transparent">
              الكتب المميزة
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[1,2,3,4,5,6].map((i) => (
                <div key={i} className="group bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-2xl hover:shadow-amber/25 hover:-translate-y-4 transition-all duration-500 hover:border-amber-300">
                  <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mb-6 animate-pulse group-hover:bg-gradient-to-br group-hover:from-amber-50 group-hover:to-white"></div>
                  <h3 className="text-2xl font-bold mb-4 line-clamp-2">كتاب رقم {i}</h3>
                  <p className="text-gray-600 mb-6 line-clamp-2">وصف مختصر للكتاب الرقمي الذي سيظهر محتواه هنا بعد تشغيل السيرفر الخلفي.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-black text-amber-600">$29</span>
                    <Link to="/product/1" className="px-8 py-3 bg-black text-white font-bold rounded-2xl hover:bg-gray-800 transition-colors">
                      اشتري الآن
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;

