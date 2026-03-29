import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Upload, Plus, Trash2, CheckCircle, FileText, Loader, LogOut, Pencil } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '', titleArabic: '', description: '', descriptionArabic: '', price: '',
    benefits: [''], benefitsArabic: [''], included: [''], includedArabic: ['']
  });
  const [files, setFiles] = useState({ coverImage: null, pdfFile: null });
  const [books, setBooks] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchBooks = useCallback(async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/books');
      setBooks(data);
    } catch (err) { 
      console.error(err);
    }
  }, []);

  const deleteBook = useCallback(async (id) => {
    if (!window.confirm('Delete this book?')) return;
    try {
      const token = localStorage.getItem('athar_token');
      await axios.delete(`http://localhost:5000/api/admin/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBooks();
    } catch (err) { 
      alert('Delete error: ' + err.message); 
    }
  }, [fetchBooks]);

  useEffect(() => {
    const token = localStorage.getItem('athar_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchBooks();
  }, [fetchBooks, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('athar_token');
    localStorage.removeItem('athar_user');
    navigate('/admin/login');
  };

  const handleEdit = (book) => {
    setEditingId(book._id);
    setFormData({
      title: book.title, titleArabic: book.titleArabic,
      description: book.description, descriptionArabic: book.descriptionArabic,
      price: book.price,
      benefits: book.benefits || [''],
      benefitsArabic: book.benefitsArabic || [''],
      included: book.included || [''],
      includedArabic: book.includedArabic || ['']
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

// Removed unused handleArrayChange & addField (eslint fix)

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
    if (files.coverImage) data.append('coverImage', files.coverImage);
    if (files.pdfFile) data.append('pdfFile', files.pdfFile);

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/admin/books/${editingId}`, data, {
          headers: { 
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}` 
          }
        });
        alert('Updated!');
      } else {
        await axios.post('http://localhost:5000/api/admin/books', data, {
          headers: { 
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}` 
          }
        });
        alert('Added!');
      }
      fetchBooks();
      setEditingId(null);
      setFormData({
        title: '', titleArabic: '', description: '', descriptionArabic: '', price: '',
        benefits: [''], benefitsArabic: [''], included: [''], includedArabic: ['']
      });
      setFiles({ coverImage: null, pdfFile: null });
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    }
    setLoading(false);
  };

  const handleCoverClick = () => {
    document.getElementById('cover-input').click();
  };

  const handlePdfClick = () => {
    document.getElementById('pdf-input').click();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 bg-white min-h-screen">
      <div className="bg-gradient-to-r from-gray-900 to-black text-white p-12 rounded-3xl mb-12 flex justify-between items-center shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent" />
        <div className="relative z-10">
          <h1 className="text-4xl font-black uppercase tracking-tighter">Admin Panel</h1>
        </div>
        <button onClick={handleLogout} className="p-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all flex items-center gap-3 font-bold">
          <LogOut size={20} /> Logout
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white/50 backdrop-blur-sm border border-gray-200 p-12 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-black">{editingId ? 'Edit' : 'Add'} Book</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="font-bold">English Title</label>
            <input className="w-full p-4 rounded-2xl border focus:border-amber-400 bg-white" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          </div>
          <div className="space-y-4">
            <label className="font-bold">العنوان العربي</label>
            <input className="w-full p-4 rounded-2xl border focus:border-amber-400 bg-white" value={formData.titleArabic} onChange={e => setFormData({...formData, titleArabic: e.target.value})} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <label className="font-bold block mb-2">English Description</label>
            <textarea className="w-full p-4 h-32 rounded-2xl border focus:border-amber-400" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          </div>
          <div>
            <label className="font-bold block mb-2">الوصف العربي</label>
            <textarea className="w-full p-4 h-32 rounded-2xl border focus:border-amber-400" value={formData.descriptionArabic} onChange={e => setFormData({...formData, descriptionArabic: e.target.value})} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="border-2 border-dashed p-8 rounded-2xl text-center hover:border-amber-400 cursor-pointer relative" onClick={handleCoverClick}>
            <Upload size={32} className="mx-auto mb-4" />
            <input id="cover-input" type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={e => setFiles({...files, coverImage: e.target.files[0]})} />
            <p>Cover Image</p>
            <p className="text-sm text-gray-500">{files.coverImage?.name || 'Click to choose'}</p>
          </div>
          <div className="border-2 border-dashed p-8 rounded-2xl text-center hover:border-amber-400 cursor-pointer relative" onClick={handlePdfClick}>
            <FileText size={32} className="mx-auto mb-4" />
            <input id="pdf-input" type="file" accept=".pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={e => setFiles({...files, pdfFile: e.target.files[0]})} />
            <p>PDF File</p>
            <p className="text-sm text-gray-500">{files.pdfFile?.name || 'Click to choose'}</p>
          </div>
          <div>
            <label className="font-bold block mb-2">Price ($)</label>
            <input type="number" step="0.01" className="w-full p-4 rounded-2xl border focus:border-amber-400" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading || !formData.title || !formData.price}
          className="w-full py-6 bg-gradient-to-r from-black to-amber-600 text-white font-black text-xl rounded-3xl hover:shadow-2xl transition-all disabled:opacity-50"
        >
          {loading ? <Loader className="animate-spin mx-auto" /> : editingId ? 'Update Book' : 'Add Book'}
        </button>

        {editingId && (
          <button 
            type="button" 
            onClick={() => {
              setEditingId(null);
              setFormData({
                title: '', titleArabic: '', description: '', descriptionArabic: '', price: '',
                benefits: [''], benefitsArabic: [''], included: [''], includedArabic: ['']
              });
              setFiles({ coverImage: null, pdfFile: null });
            }} 
            className="w-full py-4 border-2 border-gray-300 rounded-3xl hover:bg-gray-50 transition-all"
          >
            Cancel Edit
          </button>
        )}
      </form>

      <div className="mt-20">
        <h2 className="text-4xl font-black mb-8">Inventory ({books.length})</h2>
        <div className="grid gap-4">
          {books.map((book) => (
            <div key={book._id} className="flex items-center gap-4 p-6 bg-white border rounded-2xl hover:shadow-md transition-all">
              <img src={`http://localhost:5000/${book.coverImage}`} alt={book.title} className="w-16 h-24 object-cover rounded-xl flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold truncate">{book.title}</h3>
                <p className="text-sm text-gray-500 truncate">{book.titleArabic}</p>
                <p className="font-mono text-xs text-gray-400">${book.price}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(book)} className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all">
                  <Pencil size={16} />
                </button>
                <button onClick={() => deleteBook(book._id)} className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {!books.length && (
            <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-3xl">
              <p className="text-2xl font-bold text-gray-400 mb-4">No books</p>
              <p className="text-gray-500">Add your first book above!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

