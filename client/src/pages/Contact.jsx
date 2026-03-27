import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Send, Loader, Twitter, Instagram, Linkedin } from 'lucide-react';

const Contact = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert('Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-32 space-y-40">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-40">
        <div className="space-y-12">
          <header className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-black uppercase leading-none">{t('nav.contact')}</h1>
            <p className="text-2xl text-gray-500 font-medium leading-relaxed max-w-lg">
              We're here to assist you on your journey towards knowledge and impact. Reach out anytime.
            </p>
          </header>

          <div className="space-y-10">
            <div className="flex gap-8 items-start">
              <div className="p-5 bg-primary/10 rounded-2xl text-primary shrink-0"><Mail size={32} /></div>
              <div>
                <h3 className="text-xl font-bold mb-1">Email Support</h3>
                <p className="text-lg text-gray-500">hello@athar.ai</p>
              </div>
            </div>
            <div className="flex gap-8 items-start">
              <div className="p-5 bg-primary/10 rounded-2xl text-primary shrink-0"><Phone size={32} /></div>
              <div>
                <h3 className="text-xl font-bold mb-1">Direct Line</h3>
                <p className="text-lg text-gray-500">+1 (800) 123-ATHAR</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold">Follow Our Journey</h3>
            <div className="flex gap-4">
              <a href="#" className="p-4 bg-gray-50 rounded-2xl text-gray-400 hover:text-black hover:bg-primary transition-all duration-300"><Twitter size={24} /></a>
              <a href="#" className="p-4 bg-gray-50 rounded-2xl text-gray-400 hover:text-black hover:bg-primary transition-all duration-300"><Instagram size={24} /></a>
              <a href="#" className="p-4 bg-gray-50 rounded-2xl text-gray-400 hover:text-black hover:bg-primary transition-all duration-300"><Linkedin size={24} /></a>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-12 md:p-20 rounded-[80px] space-y-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12"><Send size={200} /></div>
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="space-y-3">
              <label className="text-sm font-black uppercase tracking-widest text-gray-400 pl-2">{t('contact.name')}</label>
              <input required type="text" className="w-full p-6 bg-white border border-transparent rounded-3xl outline-none focus:border-black transition-all" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-black uppercase tracking-widest text-gray-400 pl-2">{t('contact.email')}</label>
              <input required type="email" className="w-full p-6 bg-white border border-transparent rounded-3xl outline-none focus:border-black transition-all" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-black uppercase tracking-widest text-gray-400 pl-2">{t('contact.message')}</label>
              <textarea required rows="4" className="w-full p-6 bg-white border border-transparent rounded-3xl outline-none focus:border-black transition-all resize-none" value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
            </div>
            <button disabled={loading} className="w-full py-8 bg-black text-white text-xl font-black rounded-3xl flex items-center justify-center gap-4 hover:bg-primary transition-all shadow-2xl">
              {loading ? <Loader className="animate-spin" /> : <><Send /> {t('contact.send')}</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
