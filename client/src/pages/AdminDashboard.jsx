import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Upload, Plus, Trash2, CheckCircle, FileText, Loader, LogOut, ChevronRight, Pencil } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '', titleArabic: '', description: '', descriptionArabic: '', price: '',
    benefits: [''], benefitsArabic: [''], included: [''], includedArabic: ['']
  });
  const [files, setFiles] = useState({ coverImage: null, pdfFile: null });
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('athar_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchBooks();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('athar_token');
    localStorage.removeItem('athar_user');
    navigate('/admin/login');
  };

  const [editingId, setEditingId] = useState(null);

  const handleEdit = (book) => {
    setEditingId(book._id);
    setFormData({
      title: book.title, titleArabic: book.titleArabic,
      description: book.description, descriptionArabic: book.descriptionArabic,
      price: book.price,
      benefits: book.benefits.length ? book.benefits : [''],
      benefitsArabic: book.benefitsArabic.length ? book.benefitsArabic : [''],
      included: book.included.length ? book.included : [''],
      includedArabic: book.includedArabic.length ? book.includedArabic : ['']
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleArrayChange = (index, value, type) => {
    const newArray = [...formData[type]];
    newArray[index] = value;
    setFormData({ ...formData, [type]: newArray });
  };

  const addField = (type) => setFormData({ ...formData, [type]: [...formData[type], ''] });

  const fetchBooks = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/books');
      setBooks(data);
    } catch (err) { console.error(err); }
  };

  const deleteBook = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    try {
      const token = localStorage.getItem('athar_token');
      await axios.delete(`http://localhost:5000/api/admin/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBooks();
    } catch (err) { alert('Error: ' + err.message); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    const token = localStorage.getItem('athar_token');
    
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
      if (editingId) {
        await axios.put(`http://localhost:5000/api/admin/books/${editingId}`, data, {
          headers: { 
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}` 
          }
        });
        alert('Book updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/admin/books', data, {
          headers: { 
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}` 
          }
        });
        alert('Book added successfully!');
      }
      fetchBooks();
      setEditingId(null);
      setFormData({
        title: '', titleArabic: '', description: '', descriptionArabic: '', price: '',
        benefits: [''], benefitsArabic: [''], included: [''], includedArabic: ['']
      });
      setFiles({ coverImage: null, pdfFile: null });
    } catch (err) {
      alert('Error: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="bg-black text-white p-12 rounded-3xl mb-12 flex justify-between items-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 scale-150 rotate-12"><Shield size={120} /></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-black uppercase tracking-tighter">Admin Dashboard</h1>
          <div className="flex gap-4 mt-2">
            <div className="px-6 py-2 bg-primary/20 text-primary border border-primary/40 rounded-full font-black text-sm uppercase">Secure Mode</div>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="relative z-10 p-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all flex items-center gap-3 font-bold"
        >
          <LogOut size={20} /> Log Out
        </button>
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
          {loading ? <Loader className="animate-spin" /> : <><CheckCircle /> {editingId ? 'Update Book Details' : 'Publish Book to Store'}</>}
        </button>
        {editingId && (
          <button type="button" onClick={() => { setEditingId(null); setFormData({ title: '', titleArabic: '', description: '', descriptionArabic: '', price: '', benefits: [''], benefitsArabic: [''], included: [''], includedArabic: [''] }); }} className="w-full text-center text-gray-400 font-bold">Cancel Editing</button>
        )}
      </form>

      {/* Inventory Section */}
      <section className="mt-20 space-y-8 animate-fade-in">
        <h2 className="text-4xl font-black tracking-tighter">Inventory Management</h2>
        <div className="grid grid-cols-1 gap-6">
          {books.map(book => (
            <div key={book._id} className="bg-white p-6 rounded-3xl border border-gray-100 flex flex-col md:flex-row items-center gap-8 hover:shadow-lg transition-all">
              <img src={`http://localhost:5000/${book.coverImage}`} className="w-24 h-32 object-cover rounded-xl shadow-md" alt={book.title} />
              <div className="flex-1 space-y-1">
                <h4 className="text-xl font-bold">{book.title}</h4>
                <p className="text-gray-400 font-medium">${book.price}</p>
                <p className="text-xs text-gray-300 font-mono truncate max-w-xs">{book._id}</p>
              </div>
              <div className="flex gap-4">
                <button onClick={() => handleEdit(book)} className="p-4 bg-gray-50 text-gray-500 rounded-2xl hover:bg-black hover:text-white transition-all">
                  <Pencil size={24} />
                </button>
                <button onClick={() => deleteBook(book._id)} className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all">
                  <Trash2 size={24} />
                </button>
              </div>
            </div>
          ))}
          {books.length === 0 && <div className="text-center py-20 bg-gray-50 rounded-3xl text-gray-400 font-bold uppercase tracking-widest">No inventory found</div>}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
