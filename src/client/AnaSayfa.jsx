import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AnaSayfa() {
  const [ilanlar, setIlanlar] = useState([]);
  const [odaYenileme, setOdaYenileme] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("hepsi"); // hepsi / ilan / oda
  const navigate = useNavigate();

  const dataAl = async () => {
    setLoading(true);

  
    if (filter === "ilan") setOdaYenileme([]);
    if (filter === "oda") setIlanlar([]);
    if (filter === "hepsi") {
      setIlanlar([]);
      setOdaYenileme([]);
    }

    try {
      if (filter === "hepsi" || filter === "ilan") {
        const ilanRes = await axios.get("http://localhost:3000/home/getilan");
        setIlanlar(ilanRes.data.homes || []);
      }
      if (filter === "hepsi" || filter === "oda") {
        const odaRes = await axios.get("http://localhost:3000/oda-yenileme/get-odahizmet");
        setOdaYenileme(odaRes.data.odaYenilemeler || []);
      }
    } catch (err) {
      console.error("Veri alınırken hata oluştu:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dataAl();
  }, [filter]);

  if (loading) return <p className="p-6">Veriler yükleniyor...</p>;

  return (
    <div className="p-6">
      {/* Başlık ve butonlar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Ana Sayfa</h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/ilanekleme")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            İlan Ekle
          </button>
          <button
            onClick={() => navigate("/odayenileme")}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Oda Yenileme Hizmetleri
          </button>
        </div>
      </div>

      {/* Filtre Butonları */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setFilter("hepsi")}
          className={`px-4 py-2 rounded-lg ${
            filter === "hepsi" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Hepsi
        </button>
        <button
          onClick={() => setFilter("ilan")}
          className={`px-4 py-2 rounded-lg ${
            filter === "ilan" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Ev İlanları
        </button>
        <button
          onClick={() => setFilter("oda")}
          className={`px-4 py-2 rounded-lg ${
            filter === "oda" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Oda Yenileme
        </button>
      </div>

      {/* Ev İlanları */}
      {filter !== "oda" && ilanlar.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-2">Ev İlanları</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ilanlar.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => navigate(`/ilandetail/${item.id}`)}
              >
                {item.images && item.images.length > 0 && (
                  <img
                    src={`http://localhost:3000/uploads/${item.images[0]}`}
                    alt="ilan"
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">
                    {item.il}, {item.ilce}
                  </h3>
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
        </>
      )}

      {/* Oda Yenileme Talepleri */}
      {filter !== "ilan" && odaYenileme.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mt-6 mb-2">Oda Yenileme Talepleri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {odaYenileme.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => navigate(`/odayenilemedetail/${item.id}`)}
              >
                {item.fotolar && item.fotolar.length > 0 && (
                  <img
                    src={`http://localhost:3000/uploads/${item.fotolar[0]}`}
                    alt="oda"
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">
                    {item.il}, {item.ilce}
                  </h3>
                  <p className="text-gray-700 text-sm mb-1">{item.aciklama}</p>
                  <p className="text-gray-700 text-sm mb-1">Oda Sayısı: {item.oda_sayisi}</p>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    Talep Tarihi: {new Date(item.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {filter === "ilan" && ilanlar.length === 0 && <p>Henüz ilan yok.</p>}
      {filter === "oda" && odaYenileme.length === 0 && <p>Henüz oda yenileme talebi yok.</p>}
    </div>
  );
}

export default AnaSayfa;
