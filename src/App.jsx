import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterClient from './client/RegisterClient';
import Login from './client/Login';
import VerifyEmail from './client/VerifyEmail';
import AnaSayfa from './client/AnaSayfa';
import IlanDetay from './client/IlanDetay';
import AddIlan from './client/Addilan'; // Büyük harfle başlamalı
import OdaYenilemeHizmetleri from './client/OdaYenilemeHizmetleri';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterClient />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/" element={<AnaSayfa />} />
        <Route path="/ilanekleme" element={<AddIlan />} /> 
        <Route path="/ilandetail/:id" element={<IlanDetay />} />
          <Route path="/odayenileme" element={<OdaYenilemeHizmetleri />} />
      </Routes>
    </Router>
  );
}

export default App;