import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function AdminPanel() {
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState([]);

  // 🔐 Admin kontrolü
  const AdminControl = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      console.log("Decoded token:", decoded);

      // Eğer backend token'a role eklemiyorsa localStorage'dan oku:
      const role = decoded.role || localStorage.getItem("role");

      if (role !== "admin") {
        navigate("/");
      }
    } catch (err) {
      console.error("Token çözümlenemedi:", err);
      navigate("/login");
    }
  };

  // 🧾 Şirket verilerini çek
  const GetCompanyData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:3000/admin/companylist", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      setCompanyData(response.data);
    } catch (error) {
      console.error("Veri alınırken hata oluştu:", error);
    }
  };

  // 🚪 Çıkış işlemi
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  useEffect(() => {
    AdminControl();
    GetCompanyData();
  }, []);

  return (
    <div className="p-10 relative">
      {/* 🔹 Üst bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Çıkış Yap
        </button>
      </div>

      {/* 🔹 Şirket listesi */}
      {companyData.length > 0 ? (
        <ul className="space-y-2">
          {companyData.map((company, index) => (
            <li key={index} className="p-3 bg-gray-100 rounded-xl">
              {company.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>Şirket verisi bulunamadı.</p>
      )}
    </div>
  );
}

export default AdminPanel;
