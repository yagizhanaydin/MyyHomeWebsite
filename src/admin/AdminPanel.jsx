import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

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
          Authorization: `Bearer ${token}`,
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
    <div className="p-10 relative min-h-screen bg-gray-50">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {companyData.map((company, index) => (
            <div
              key={index}
              className="p-4 bg-white shadow-md rounded-2xl border border-gray-200"
            >
              <h2 className="text-xl font-semibold mb-2 text-blue-700">
                {company.company_name}
              </h2>
              <p className="text-gray-600">
                <strong>Telefon:</strong> {company.phone_number}
              </p>
              <p className="text-gray-600">
                <strong>Kayıt Tarihi:</strong>{" "}
                {new Date(company.kayit_tarihi).toLocaleString("tr-TR")}
              </p>

              {/* Belgeler */}
              {company.belgeler && company.belgeler.length > 0 && (
                <div className="mt-3">
                  <p className="font-semibold text-gray-700 mb-2">Belgeler:</p>
                  <div className="flex flex-wrap gap-2">
                    {company.belgeler.map((belge, i) => (
                      <a
                        key={i}
                        href={belge}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={belge}
                          alt={`belge-${i}`}
                          className="w-24 h-24 object-cover rounded-lg border border-gray-300 hover:scale-105 transition-transform"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Şirket verisi bulunamadı.</p>
      )}
    </div>
  );
}

export default AdminPanel;
