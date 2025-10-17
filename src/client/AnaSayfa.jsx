import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AnaSayfa() {
  const [homeData, setHomeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // API'den ilanları çek
  const dataAl = async () => {
    try {
      const response = await axios.get("http://localhost:3000/home/getilan");
      setHomeData(response.data.homes); 
    } catch (error) {
      console.error("Veri alınırken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dataAl();
  }, []);

  if (loading) return <p className="p-6">Veriler yükleniyor...</p>;

  return (
    <div className="p-6">
      {/* Başlık ve ilan ekleme butonu */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Ana Sayfa</h1>
        <button
          onClick={() => navigate("/ilanekleme")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          İlan Ekle
        </button>
      </div>

      {/* İlan listesi */}
      {homeData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {homeData.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => navigate(`/ilandetail/${item.id}`)} // İlan detay sayfasına yönlendir
            >
              {/* İlk resmi göster */}
              {item.images && item.images.length > 0 && (
                <img
                  src={`http://localhost:3000/uploads/${item.images[0]}`}
                  alt="ilan"
                  className="w-full h-48 object-cover"
                />
              )}

              {/* İlan bilgileri */}
              <div className="p-4">
                <h2 className="font-bold text-lg mb-1">
                  {item.il}, {item.ilce}
                </h2>
                <p className="text-gray-700 text-sm mb-1">{item.adres}</p>
                <p className="text-gray-700 text-sm mb-1">
                  {item.oda_sayisi} | {item.metrekare} m²
                </p>
                <p className="text-gray-900 font-semibold mb-2">₺{item.fiyat}</p>
                <p className="text-gray-600 text-sm line-clamp-2">{item.aciklama}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Henüz ilan yok.</p>
      )}
    </div>
  );
}

export default AnaSayfa;
