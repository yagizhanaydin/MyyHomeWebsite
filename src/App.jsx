import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterClient from './client/RegisterClient';
import Login from './client/Login';
import VerifyEmail from './client/VerifyEmail';
import AnaSayfa from './client/AnaSayfa';
import Addilan from './client/Addilan';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/Register" element={<RegisterClient />} />
        <Route path="/Login" element={<Login />} />
         <Route path="/verify" element={<VerifyEmail />} />
          <Route path="/" element={<AnaSayfa />} />
            <Route path="/ilanekle" element={<Addilan />} />
      </Routes>
    </Router>
  );
}

export default App;
