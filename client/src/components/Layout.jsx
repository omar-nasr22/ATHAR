import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  
  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(nextLang);
    document.documentElement.dir = nextLang === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="text-3xl font-bold tracking-tighter text-black">
            {t('brand')}
          </Link>
          
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">{t('nav.home')}</Link>
            <Link to="/shop" className="text-sm font-medium hover:text-primary transition-colors">{t('nav.shop')}</Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">{t('nav.about')}</Link>
            <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">{t('nav.contact')}</Link>
            <button onClick={toggleLanguage} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Globe size={20} />
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 py-4 px-4 space-y-4">
          <Link to="/" className="block text-lg font-medium" onClick={() => setIsOpen(false)}>{t('nav.home')}</Link>
          <Link to="/shop" className="block text-lg font-medium" onClick={() => setIsOpen(false)}>{t('nav.shop')}</Link>
          <Link to="/about" className="block text-lg font-medium" onClick={() => setIsOpen(false)}>{t('nav.about')}</Link>
          <Link to="/contact" className="block text-lg font-medium" onClick={() => setIsOpen(false)}>{t('nav.contact')}</Link>
          <button onClick={() => { toggleLanguage(); setIsOpen(false); }} className="w-full text-left py-2 flex items-center gap-2">
            <Globe size={20} /> {i18n.language === 'en' ? 'العربية' : 'English'}
          </button>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-black text-white py-20 px-4 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h2 className="text-3xl font-bold mb-4">{t('brand')}</h2>
          <p className="text-gray-400 max-w-xs">{t('slogan')}</p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-primary mb-2">Company</h3>
          <Link to="/about" className="text-gray-400 hover:text-white transition-colors">{t('nav.about')}</Link>
          <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">{t('nav.contact')}</Link>
        </div>
        <div>
          <h3 className="font-bold text-primary mb-2">Connect</h3>
          <p className="text-gray-400 mb-4">info@athar.ai</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary">X (Twitter)</a>
            <a href="#" className="hover:text-primary">Instagram</a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-gray-800 mt-16 pt-8 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} {t('brand')}. All rights reserved.
      </div>
    </footer>
  );
};

export const Layout = ({ children }) => {
  const { i18n } = useTranslation();
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};
