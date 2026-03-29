import React from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 space-y-24">
      <section className="text-center">
        <h1 className="text-7xl font-black bg-gradient-to-r from-black via-gray-900 to-amber-500 bg-clip-text text-transparent mb-8">
          {t('brand')}
        </h1>
        <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {t('slogan')}
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-5xl font-bold mb-8">Our Mission</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            To preserve and distribute Arabic knowledge through digital publishing. Every book is carefully curated for quality and impact.
          </p>
          <h2 className="text-5xl font-bold mb-8">Our Vision</h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            أن نكون المنصة الأولى للنشر الرقمي باللغة العربية، حيث تترك كل معرفة أثرها.
          </p>
        </div>
        <div className="relative">
          <div className="w-full h-96 bg-gradient-to-br from-amber-50 to-white rounded-4xl shadow-2xl p-12 flex items-center justify-center">
            <div className="text-6xl font-black text-amber-600">أثر</div>
          </div>
        </div>
      </section>

      <section className="text-center py-32 bg-gradient-to-r from-amber-50/50 via-white to-amber-50/50 rounded-4xl backdrop-blur-sm">
        <h2 className="text-6xl font-black mb-12 bg-gradient-to-r from-black to-amber-500 bg-clip-text text-transparent">
          Why ATHAR?
        </h2>
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <div className="space-y-4">
            <div className="w-20 h-20 bg-amber-500 text-white rounded-4xl flex items-center justify-center mx-auto shadow-2xl">
              📚
            </div>
            <h3 className="text-2xl font-bold">Premium Arabic Content</h3>
            <p className="text-gray-600">Curated digital books by leading Arabic authors and thinkers.</p>
          </div>
          <div className="space-y-4">
            <div className="w-20 h-20 bg-amber-500 text-white rounded-4xl flex items-center justify-center mx-auto shadow-2xl">
              ⚡
            </div>
            <h3 className="text-2xl font-bold">Instant Delivery</h3>
            <p className="text-gray-600">Download immediately after purchase. PDF format, lifetime access.</p>
          </div>
          <div className="space-y-4">
            <div className="w-20 h-20 bg-amber-500 text-white rounded-4xl flex items-center justify-center mx-auto shadow-2xl">
              🔒
            </div>
            <h3 className="text-2xl font-bold">Secure Payments</h3>
            <p className="text-gray-600">Stripe verified, SSL protected, expiring download links.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

