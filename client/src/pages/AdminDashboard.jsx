import React, { useState } from 'react';
import axios from 'axios';
import { Upload, Plus, Trash2, CheckCircle, FileText, Loader } from 'lucide-react';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '', titleArabic: '', description: '', descriptionArabic: '', price: '',
    benefits: [''], benefitsArabic: [''], included: [''], includedArabic: ['']
  });
  const [files, setFiles] = useState({ coverImage: null, pdfFile: null });

  const handleArrayChange = (index, value, type) => {
    const newArray = [...formData[type]];
    newArray[index] = value;
    setFormData({ ...formData, [type]: newArray });
  };

  const addField = (type) => setFormData({ ...formData, [type]: [...formData[type], ''] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (Array.isArray(formData[key])) {
        data.append(key, JSON.stringify(formData[key].filter(i => i)));
      } else {
        data.append(key, formData[key]);
      }
    });
    data.append('coverImage', files.coverImage);
    data.append('pdfFile', files.pdfFile);

    try {
      await axios.post('http://localhost:5000/api/admin/books', data);
      alert('Book added successfully!');
      window.location.reload();
    } catch (err) {
      alert('Error: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="bg-black text-white p-12 rounded-3xl mb-12 flex justify-between items-center shadow-2xl">
        <h1 className="text-4xl font-black uppercase tracking-tighter">Admin Dashboard</h1>
        <div className="px-6 py-2 bg-primary/20 text-primary border border-primary/40 rounded-full font-black text-sm uppercase">Secure Mode</div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12 animate-fade-in bg-white border border-gray-100 p-12 rounded-3xl shadow-xl">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-xl font-black border-b border-gray-100 pb-2">English Details</h3>
            <input required placeholder="Book Title" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:bg-white focus:border-black border border-transparent transition-all" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            <textarea required placeholder="Full Description" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:bg-white focus:border-black border border-transparent transition-all h-32" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          </div>
          <div className="space-y-6" dir="rtl">
            <h3 className="text-xl font-black border-b border-gray-100 pb-2">تفاصيل الكتاب بالعربية</h3>
            <input required placeholder="عنوان الكتاب" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:bg-white focus:border-black border border-transparent transition-all" value={formData.titleArabic} onChange={e => setFormData({...formData, titleArabic: e.target.value})} />
            <textarea required placeholder="وصف كامل للكتاب" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:bg-white focus:border-black border border-transparent transition-all h-32" value={formData.descriptionArabic} onChange={e => setFormData({...formData, descriptionArabic: e.target.value})} />
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-xl font-black">Files & Pricing</h3>
            <div className="flex gap-4 items-center p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-300 relative group cursor-pointer hover:border-black transition-all">
              <Upload className="text-gray-400" />
              <input type="file" required className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setFiles({...files, coverImage: e.target.files[0]})} />
              <span className="text-gray-500 font-medium truncate">{files.coverImage ? files.coverImage.name : "Upload Cover Image"}</span>
            </div>
            <div className="flex gap-4 items-center p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-300 relative group cursor-pointer hover:border-black transition-all">
              <FileText className="text-gray-400" />
              <input type="file" required className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setFiles({...files, pdfFile: e.target.files[0]})} />
              <span className="text-gray-500 font-medium truncate">{files.pdfFile ? files.pdfFile.name : "Upload PDF Source"}</span>
            </div>
            <div className="relative group">
               <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-xl">$</span>
               <input required type="number" placeholder="Price" className="w-full p-4 pl-10 bg-gray-50 rounded-2xl outline-none focus:bg-white focus:border-black border border-transparent transition-all" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
            </div>
          </div>
          
          <div className="space-y-6">
             <div className="flex justify-between items-center">
               <h3 className="text-xl font-black">Benefits (EN)</h3>
               <button type="button" onClick={() => addField('benefits')} className="p-2 bg-black text-white rounded-lg"><Plus size={16} /></button>
             </div>
             {formData.benefits.map((b, i) => (
               <input key={i} className="w-full p-4 bg-gray-50 rounded-xl outline-none mb-2" value={b} onChange={e => handleArrayChange(i, e.target.value, 'benefits')} />
             ))}
          </div>
        </section>

        <button disabled={loading} className="w-full py-8 bg-black text-white text-2xl font-black rounded-3xl hover:bg-primary transition-all flex items-center justify-center gap-4 shadow-2xl">
          {loading ? <Loader className="animate-spin" /> : <><CheckCircle /> Publish Book to Store</>}
        </button>
      </form>
    </div>
  );
};

export default AdminDashboard;
