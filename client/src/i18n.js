import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          brand: 'ATHAR',
          slogan: 'Because knowledge leaves an impact',
          nav: { home: 'Home', shop: 'Shop', about: 'About', contact: 'Contact' },
          hero: { title: 'Elevate Your Mind', cta: 'Browse Books' },
          shop: { title: 'Digital Collection', filter: 'Filter', search: 'Search books...' },
          product: { buy: 'Buy Now', include: 'What\'s included', benefits: 'Benefits' },
          contact: { name: 'Full Name', email: 'Email', message: 'Message', send: 'Send' }
        }
      },
      ar: {
        translation: {
          brand: 'أثر',
          slogan: 'لأن العلم يترك أثرًا',
          nav: { home: 'الرئيسية', shop: 'المتجر', about: 'عن أثر', contact: 'اتصل بنا' },
          hero: { title: 'ارتقِ بعقلك', cta: 'تصفح الكتب' },
          shop: { title: 'المجموعة الرقمية', filter: 'تصفية', search: 'بحث عن كتب...' },
          product: { buy: 'شراء الآن', include: 'ماذا يشمل؟', benefits: 'الفوائد' },
          contact: { name: 'الاسم الكامل', email: 'البريد الإلكتروني', message: 'الرسالة', send: 'إرسال' }
        }
      }
    },
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;
