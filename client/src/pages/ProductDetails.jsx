import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { useTranslation } from 'react-i18next';
import { CheckCircle, ShieldCheck, Download, CreditCard, ArrowRight, Loader, ShoppingCart } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutData, setCheckoutData] = useState({ name: '', email: '' });
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    api.get(`/api/books/${id}`)
      .then(res => setBook(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleCheckout = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const { data } = await axios.post('http://localhost:5000/api/orders/create', {
        bookId: id,
        customerName: checkoutData.name,
        customerEmail: checkoutData.email
      });
      
      // Simulate payment success
      const res = await axios.post('http://localhost:5000/api/orders/complete', { orderId: data.orderId });
      alert('Purchase successful! Redirecting to download...');
      window.location.href = `http://localhost:5000${res.data.downloadLink}`;
    } catch (err) {
      alert('Error processing order: ' + err.message);
    }
    setProcessing(false);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-24 h-24 bg-gradient-to-r from-gold-400 to-primary rounded-full animate-spin-slow shadow-xl" /></div>;
  if (!book) return <div className="min-h-screen flex items-center justify-center text-center py-20"><h1 className="text-4xl font-display font-black text-gray-400">Book Not Found</h1></div>;

  const title = i18n.language === 'ar' ? book.titleArabic : book.title;
  const description = i18n.language === 'ar' ? book.descriptionArabic : book.description;
  const benefits = i18n.language === 'ar' ? book.benefitsArabic : book.benefits;
  const included = i18n.language === 'ar' ? book.includedArabic : book.included;

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32 items-start">
        {/* Book Cover - Premium 3D */}
        <div className="relative group perspective-[2500px]">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-primary/5 rounded-[3rem] blur-xl -z-10 animate-pulse-glow"></div>
          <img 
            src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/${book.coverImage}`} 
            className="w-full h-auto rounded-[3rem] shadow-2xl lg:shadow-[0_50px_100px_rgba(0,0,0,0.15)] group-hover:rotate-y-12 group-hover:rotate-x-8 group-hover:scale-[1.02] transition-all duration-[1200ms] cursor-grab active:cursor-grabbing object-cover"
            alt={title}
          />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gold/25 rounded-full blur-3xl animate-[float_4s_ease-in-out_infinite]"></div>
        </div>

        {/* Content & Sticky Buy */}
        <div className="space-y-20 lg:sticky lg:top-24 lg:pt-24">
          {/* Header */}
          <div className="space-y-8 backdrop-blur-sm">
            <div className="flex gap-6">
              <span className="px-8 py-4 bg-gradient-to-r from-gold-400/90 to-primary text-black/95 font-display font-black uppercase text-lg tracking-wide rounded-3xl shadow-2xl backdrop-blur-xl animate-pulse-glow border border-gold/30">Instant Digital Download</span>
              <span className="px-6 py-3 bg-black text-white/95 text-xs font-black uppercase tracking-widest rounded-2xl shadow-lg px-5">{book.category}</span>
            </div>
            <h1 className="text-[4rem] lg:text-[6rem] xl:text-[7.5rem] font-display font-black tracking-[-0.08em] bg-gradient-to-r from-gray-900 via-black to-gray-900 bg-clip-text text-transparent leading-[0.85] lg:leading-[0.82]">
              {title}
            </h1>
            <p className="font-display text-2xl lg:text-3xl text-gray-600/90 leading-[1.6] max-w-2xl">{description}</p>
          </div>

          {/* Benefits & Included */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            {/* Benefits */}
            <div className="space-y-8 bg-white/60 backdrop-blur-xl rounded-4xl p-10 lg:p-12 shadow-xl border border-white/40 hover:shadow-gold/20 hover:shadow-2xl transition-all duration-500">
              <h3 className="text-3xl lg:text-4xl font-display font-black uppercase tracking-wider bg-gradient-to-r from-gold-600 to-primary bg-clip-text text-transparent border-b border-gold/30 pb-8">
                {t('product.benefits')}
              </h3>
              <ul className="space-y-6">
                {benefits.map((b, i) => (
                  <li key={i} className="flex gap-6 items-start group hover:translate-x-4 transition-all duration-300 hover:shadow-md hover:rounded-2xl hover:p-4 hover:bg-white/50 hover:backdrop-blur">
                    <div className="p-5 mt-1 shrink-0 bg-gradient-to-br from-gold-400 to-primary rounded-3xl shadow-2xl group-hover:shadow-gold/40 group-hover:scale-105 transition-all duration-300 border border-gold/20">
                      <CheckCircle className="text-black w-9 h-9" />
                    </div>
                    <span className="font-semibold text-xl text-gray-700 lg:text-lg leading-relaxed group-hover:text-black">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What's Included */}
            <div className="space-y-8">
              <h3 className="text-3xl lg:text-4xl font-display font-black uppercase tracking-wider bg-gradient-to-r from-gold-600 to-primary bg-clip-text text-transparent border-b border-gold/30 pb-8">
                {t('product.include')}
              </h3>
              <ul className="space-y-6">
                {included.map((item, i) => (
                  <li key={i} className="flex gap-6 items-center group hover:translate-x-4 transition-all duration-300 hover:shadow-md hover:rounded-2xl hover:p-4 hover:bg-white/50 hover:backdrop-blur">
                    <div className="w-16 h-16 p-3 bg-gradient-to-r from-primary to-gold-500 rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-gold/40 group-hover:scale-110 transition-all duration-300 border border-white/30">
                      <Download className="text-white w-8 h-8" />
                    </div>
                    <span className="font-semibold text-xl text-gray-700 lg:text-lg group-hover:text-black">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Premium Buy Section */}
          <div className="bg-white/80 backdrop-blur-2xl p-12 lg:p-16 xl:p-20 rounded-[4rem] shadow-2xl border border-gold/20 relative overflow-hidden animate-float hover:animate-none">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-primary/10"></div>
            <div className="absolute top-12 -right-12 w-52 h-52 bg-gold/30 rounded-full blur-3xl animate-[spin_20s_linear_infinite]"></div>
            <div className="absolute -bottom-12 left-12 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-pulse-glow"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-center lg:items-baseline mb-12">
                <div className="space-y-3">
                  <p className="text-lg font-black uppercase tracking-widest text-gold-600 bg-gold-100/80 px-6 py-2 rounded-full inline-block shadow-lg backdrop-blur">Exclusive Price</p>
                  <h2 className="text-[6rem] lg:text-[8rem] xl:text-[10rem] font-display font-black bg-gradient-to-r from-gold-500 via-primary to-gold-600 bg-clip-text text-transparent tracking-[-0.15em]">
                    ${book.price}
                  </h2>
                </div>
                <div className="p-8 bg-gradient-to-br from-emerald-400/20 to-emerald-500/20 rounded-4xl border border-emerald-200/50 backdrop-blur-xl shadow-2xl">
                  <ShieldCheck className="w-20 h-20 text-emerald-500 shadow-lg" />
                </div>
              </div>

              {!showCheckout ? (
                <button 
                  onClick={() => setShowCheckout(true)}
                  className="w-full lg:w-auto group px-20 py-10 bg-gradient-to-r from-black via-gray-900 to-black text-white font-display font-black text-3xl rounded-[3rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_35px_60px_-15px_rgba(212,175,55,0.4)] hover:shadow-3xl hover:from-gold-500 hover:to-primary hover:-translate-y-4 transition-all duration-700 mx-auto lg:ml-0 uppercase tracking-wider flex items-center justify-center gap-8 hover:gap-12"
                >
                  <ShoppingCart className="w-12 h-12 group-hover:scale-110" />
                  <span>{t('product.buy')}</span>
                  <ArrowRight className="w-10 h-10 group-hover:translate-x-4 transition-transform rtl:rotate-180 duration-700" />
                </button>
              ) : (
                <form onSubmit={handleCheckout} className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
                    <div className="space-y-2">
                      <label className="font-black uppercase text-sm tracking-wider text-gray-700">{t('contact.name')}</label>
                      <input 
                        type="text" required 
                        className="w-full p-8 rounded-[2rem] border-2 border-gray-200/50 bg-white/60 backdrop-blur-xl outline-none focus:border-gold-400 focus:ring-8 focus:ring-gold/20 transition-all shadow-inner hover:shadow-lg"
                        placeholder={t('contact.name')}
                        value={checkoutData.name} onChange={e => setCheckoutData({...checkoutData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-black uppercase text-sm tracking-wider text-gray-700">{t('contact.email')}</label>
                      <input 
                        type="email" required 
                        className="w-full p-8 rounded-[2rem] border-2 border-gray-200/50 bg-white/60 backdrop-blur-xl outline-none focus:border-gold-400 focus:ring-8 focus:ring-gold/20 transition-all shadow-inner hover:shadow-lg"
                        placeholder={t('contact.email')}
                        value={checkoutData.email} onChange={e => setCheckoutData({...checkoutData, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <button 
                    disabled={processing}
                    className="w-full group px-20 py-10 bg-gradient-to-r from-primary via-gold-500 to-primary text-black font-display font-black text-2xl rounded-[3rem] shadow-2xl hover:shadow-gold/50 hover:shadow-[0_35px_60px_-15px_rgba(212,175,55,0.4)] hover:scale-105 hover:shadow-4xl transition-all duration-500 flex items-center justify-center gap-8 uppercase tracking-wider"
                  >
                    {processing ? (
                      <>
                        <Loader className="animate-spin w-12 h-12" />
                        Processing Secure Payment...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-10 h-10 group-hover:scale-110" />
                        Confirm & Pay Securely
                        <ArrowRight className="w-10 h-10 group-hover:translate-x-4 transition-transform rtl:rotate-180" />
                      </>
                    )}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setShowCheckout(false)} 
                    className="w-full text-center text-gray-500 font-semibold text-xl hover:text-black transition-all py-8 font-black uppercase tracking-wider hover:underline"
                  >
                    Cancel Purchase
                  </button>
                </form>
              )}

              <div className="pt-16 mt-16 border-t border-gold/30">
                <p className="text-center text-lg text-gray-500/80 font-medium leading-relaxed opacity-85">
                  🔒 <strong>Stripe Verified</strong> • SSL Secured • Instant Digital Delivery • 7-Day Download Link • Lifetime Access
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
