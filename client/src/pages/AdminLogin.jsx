import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Loader, Shield } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('athar_token', data.token);
      localStorage.setItem('athar_user', JSON.stringify(data.user));
      navigate('/admin');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gray-50/50">
      <div className="w-full max-w-md bg-white p-10 md:p-12 rounded-[40px] shadow-2xl space-y-10 animate-fade-in border border-gray-100">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-black rounded-3xl flex items-center justify-center text-primary mx-auto shadow-xl rotate-3">
            <Shield size={40} />
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">Admin Portal</h1>
          <p className="text-gray-400 font-medium">Secure access to ATHAR management</p>
        </div>

        {error && <div className="p-4 bg-red-50 text-red-500 rounded-2xl text-sm font-bold text-center border border-red-100 animate-pulse">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Secure Email</label>
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" size={20} />
              <input 
                required type="email" 
                className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-black transition-all font-medium" 
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Access Key</label>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" size={20} />
              <input 
                required type="password" 
                className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-black transition-all font-medium" 
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full py-6 bg-black text-white text-xl font-black rounded-2xl hover:bg-primary transition-all shadow-2xl flex items-center justify-center gap-4 group"
          >
            {loading ? <Loader className="animate-spin" /> : <><Lock size={20} className="group-hover:scale-110 transition-transform" /> Sign In</>}
          </button>
        </form>

        <p className="text-center text-xs text-gray-300 font-bold uppercase tracking-widest cursor-default">Restricted Area &copy; ATHAR 2026</p>
      </div>
    </div>
  );
};

export default AdminLogin;
