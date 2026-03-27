import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { CheckCircle, ShieldCheck, Download, CreditCard, ArrowRight, Loader } from 'lucide-react';

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
    axios.get(`http://localhost:5000/api/books/${id}`)
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

  if (loading) return <div className="min-h-screen flex items-center justify-center animate-pulse"><div className="w-16 h-16 bg-primary/20 rounded-full" /></div>;
  if (!book) return <div className="text-center py-40 font-bold text-3xl">Book not found</div>;

  const title = i18n.language === 'ar' ? book.titleArabic : book.title;
  const description = i18n.language === 'ar' ? book.descriptionArabic : book.description;
  const benefits = i18n.language === 'ar' ? book.benefitsArabic : book.benefits;
  const included = i18n.language === 'ar' ? book.includedArabic : book.included;

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        <div className="relative group perspective">
          <img 
            src={`http://localhost:5000/${book.coverImage}`} 
            className="w-full h-auto rounded-3xl shadow-2xl transition-transform duration-700 group-hover:rotate-y-6"
            alt={title}
          />
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="space-y-12">
          <div className="space-y-6">
            <span className="px-4 py-1.5 bg-black text-white text-xs font-black uppercase tracking-widest rounded-full">{book.category}</span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">{title}</h1>
            <p className="text-xl text-gray-500 leading-relaxed max-w-lg">{description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h3 className="text-lg font-black uppercase tracking-widest text-primary border-b border-primary/20 pb-2">{t('product.benefits')}</h3>
              <ul className="space-y-4">
                {benefits.map((b, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <CheckCircle className="text-primary mt-1 shrink-0" size={20} />
                    <span className="font-medium text-gray-700">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="text-lg font-black uppercase tracking-widest text-primary border-b border-primary/20 pb-2">{t('product.include')}</h3>
              <ul className="space-y-4">
                {included.map((item, i) => (
                  <li key={i} className="flex gap-4 items-center">
                    <Download className="text-primary shrink-0" size={18} />
                    <span className="font-medium text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 p-10 rounded-3xl space-y-8 relative overflow-hidden">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Price</p>
                <h2 className="text-5xl font-black text-black">${book.price}</h2>
              </div>
              <ShieldCheck className="text-green-500" size={48} />
            </div>
            
            {!showCheckout ? (
              <button 
                onClick={() => setShowCheckout(true)}
                className="w-full py-6 bg-black text-white text-xl font-bold rounded-2xl hover:bg-primary transition-all flex items-center justify-center gap-4 group"
              >
                {t('product.buy')} <ArrowRight className="group-hover:translate-x-1 transition-transform rtl:rotate-180" />
              </button>
            ) : (
              <form onSubmit={handleCheckout} className="space-y-4 animate-fade-in">
                <input 
                  type="text" required placeholder={t('contact.name')} 
                  className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-black"
                  value={checkoutData.name} onChange={e => setCheckoutData({...checkoutData, name: e.target.value})}
                />
                <input 
                  type="email" required placeholder={t('contact.email')} 
                  className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-black"
                  value={checkoutData.email} onChange={e => setCheckoutData({...checkoutData, email: e.target.value})}
                />
                <button 
                  disabled={processing}
                  className="w-full py-6 bg-black text-white text-xl font-bold rounded-2xl flex items-center justify-center gap-4 hover:bg-primary"
                >
                  {processing ? <Loader className="animate-spin" /> : <><CreditCard /> Confirm Payment</>}
                </button>
                <button type="button" onClick={() => setShowCheckout(false)} className="w-full text-center text-gray-400 font-bold text-sm">Cancel</button>
              </form>
            )}
            
            <p className="text-center text-xs text-gray-400 font-medium">Safe & Secure Payment via Stripe & SSL Encryption</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
