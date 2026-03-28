import React from 'react';

export const SimpleLayout = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
    <nav className="sticky top-0 bg-white/95 backdrop-blur z-50 border-b border-slate-200 shadow-sm px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-black bg-gradient-to-r from-slate-900 to-amber-600 bg-clip-text text-transparent">
          أثر ATHAR
        </h1>
        <div className="space-x-6 text-lg font-bold">
          <a href="/" className="hover:text-amber-500">الرئيسية</a>
          <a href="/shop" className="hover:text-amber-500">المتجر</a>
          <a href="/admin" className="hover:text-amber-500">الإدارة</a>
        </div>
      </div>
    </nav>
    <main className="pt-24 pb-32">
      {children}
    </main>
    <footer className="bg-slate-950 text-slate-300 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <p>© 2024 أثر - لأن المعرفة تترك أثراً</p>
        <p className="mt-4 text-sm text-slate-500">info@athar.ai</p>
      </div>
    </footer>
  </div>
);

