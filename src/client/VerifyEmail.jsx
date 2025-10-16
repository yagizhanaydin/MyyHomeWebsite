// src/pages/VerifyEmail.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function VerifyEmail() {
  const [status, setStatus] = useState("Doğrulama yapılıyor...");
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");

  useEffect(() => {
    if (!token) {
      setStatus("Geçersiz token");
      return;
    }

    const verify = async () => {
      try {
        // Backend portunu açıkça belirt
        const res = await axios.get(`http://localhost:3000/api/verify?token=${token}`);
        setStatus(res.data || "Mail doğrulandı, artık giriş yapabilirsiniz!");
      } catch (err) {
        setStatus(err.response?.data || "Doğrulama sırasında hata oluştu");
      }
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white/20 backdrop-blur-lg rounded-3xl border-2 border-white/30 shadow-2xl p-8 text-center max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4">Mail Doğrulama</h2>
        <p className="text-white/80">{status}</p>
      </div>
    </div>
  );
}

export default VerifyEmail;
