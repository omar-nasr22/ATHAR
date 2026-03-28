import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SimpleLayout } from './components/SimpleLayout';
// import DummyHome from './pages/DummyHome';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import './i18n';

function App() {
  return (
    <Router>
      <SimpleLayout>
        <Routes>
<Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </SimpleLayout>
    </Router>
  );
}

export default App;

