import React from 'react';

const DummyHome = () => {
  return (
    <div style={{padding: '100px', fontFamily: 'Arial', textAlign: 'center'}}>
      <h1 style={{fontSize: '4rem', color: '#d4af37', marginBottom: '20px'}}>
        أثر ATHAR
      </h1>
      <p style={{fontSize: '2rem', color: '#333'}}>
        المتجر الرقمي جاهز!
      </p>
      <p style={{color: '#666', marginTop: '20px'}}>
        سيرفر frontend شغال - Backend: cd server && npm run dev
      </p>
      <div style={{marginTop: '50px'}}>
        <div style={{display: 'inline-block', background: 'black', color: 'white', padding: '20px 40px', borderRadius: '50px', fontWeight: 'bold', fontSize: '1.5rem', margin: '10px', cursor: 'pointer'}}>
          Shop
        </div>
        <div style={{display: 'inline-block', background: 'white', color: 'black', padding: '20px 40px', borderRadius: '50px', fontWeight: 'bold', fontSize: '1.5rem', margin: '10px', border: '2px solid black', cursor: 'pointer'}}>
          Admin
        </div>
      </div>
    </div>
  );
};

export default DummyHome;
