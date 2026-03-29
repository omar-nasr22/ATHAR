import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/contact', formData);
      setSent(true);
    } catch {
      alert('Error sending message');
    }
    setLoading(false);
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto bg-white rounded-3xl p-16 shadow-2xl">
          <div className="w-24 h-24 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
            ✓
          </div>
          <h1 className="text-4xl font-black mb-4 text-emerald-600">Message Sent!</h1>
          <p className="text-xl text-gray-600 mb-8">Thank you! We'll respond within 24 hours.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-12 py-4 bg-black text-white font-bold rounded-3xl hover:bg-gray-800 transition-all"
          >
            Send Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-24">
      <div className="bg-white rounded-3xl shadow-2xl p-12">
        <h1 className="text-5xl font-black mb-12 text-center bg-gradient-to-r from-black to-amber-500 bg-clip-text text-transparent">
          Contact Us
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-lg font-bold mb-3">{t('contact.name')}</label>
            <input
              type="text"
              required
              className="w-full p-6 rounded-2xl border border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none transition-all bg-gray-50 hover:bg-white"
              placeholder={t('contact.name')}
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-lg font-bold mb-3">{t('contact.email')}</label>
            <input
              type="email"
              required
              className="w-full p-6 rounded-2xl border border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none transition-all bg-gray-50 hover:bg-white"
              placeholder={t('contact.email')}
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-lg font-bold mb-3">{t('contact.message')}</label>
            <textarea
              required
              rows="6"
              className="w-full p-6 rounded-2xl border border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none transition-all bg-gray-50 hover:bg-white resize-vertical"
              placeholder={t('contact.message')}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            />
          </div>

          <button
            disabled={loading}
            className="w-full py-8 bg-gradient-to-r from-black to-amber-600 text-white font-black text-2xl rounded-3xl hover:from-amber-600 hover:to-amber-700 hover:shadow-2xl transition-all shadow-xl disabled:opacity-50"
          >
            {loading ? 'إرسال...' : t('contact.send')}
          </button>
        </form>
      </div>

      <div className="mt-32 text-center text-gray-500">
        <p>info@athar.ai | Dubai, UAE</p>
      </div>
    </div>
  );
};

export default Contact;

