import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function OdaYenilemeHizmetleriDetail() {
  const { id } = useParams();
  const [oda, setOda] = useState(null);
  const [loading, setLoading] = useState(true);
  const [teklifFiyat, setTeklifFiyat] = useState("");
  const [aciklama, setAciklama] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOda = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/oda-yenileme/odahizmet-detail/${id}`
        );
        setOda(res.data.oda);
      } catch (err) {
        console.error("Oda detayı alınamadı:", err);
        alert("Oda detayı alınamadı!");
        navigate("/odayenileme");
      } finally {
        setLoading(false);
      }
    };
    fetchOda();
  }, [id, navigate]);

  const handleTeklifVer = async () => {
    try {
     
      const token = localStorage.getItem("companyToken") || localStorage.getItem("token");

      if (!token) {
        alert("Teklif vermek için giriş yapmalısınız!");
        return;
      }

      const res = await axios.post(
        "http://localhost:3000/oda-yenileme/ekle",
        {
          odaYenilemeId: id,
          teklifFiyat,
          aciklama,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Teklif gönderildi!");
      setTeklifFiyat("");
      setAciklama("");
    } catch (err) {
      console.error("Teklif gönderme hatası:", err);
      alert("Teklif gönderilemedi!");
    }
  };

  if (loading) return <p className="p-6">Yükleniyor...</p>;
  if (!oda) return null;

  return (
    <div className="p-6">
      <button
        onClick={() => navigate("/odayenileme")}
        className="mb-4 bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
      >
        Geri
      </button>

      <h1 className="text-3xl font-bold mb-4">
        {oda.il}, {oda.ilce}
      </h1>

      <p className="mb-2 font-semibold">Oda Sayısı: {oda.oda_sayisi}</p>
      <p className="mb-4">{oda.aciklama}</p>

      {oda.fotolar?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {oda.fotolar.map((foto, index) => (
            <img
              key={index}
              src={`http://localhost:3000/uploads/${foto}`}
              alt={`oda-${index}`}
              className="w-full h-48 object-cover rounded-lg"
            />
          ))}
        </div>
      )}

      <p className="mt-4 text-gray-500">
        Talep Tarihi: {new Date(oda.created_at).toLocaleDateString()}
      </p>

      <div className="mt-8 border-t pt-4">
        <h2 className="text-xl font-bold mb-2">Teklif Ver</h2>
        <input
          type="number"
          placeholder="Teklif fiyatı girin"
          value={teklifFiyat}
          onChange={(e) => setTeklifFiyat(e.target.value)}
          className="border px-3 py-2 rounded w-full mb-2"
        />
        <textarea
          placeholder="Açıklama (isteğe bağlı)"
          value={aciklama}
          onChange={(e) => setAciklama(e.target.value)}
          className="border px-3 py-2 rounded w-full mb-2"
        />
        <button
          onClick={handleTeklifVer}
          className={`px-4 py-2 rounded text-white ${
            localStorage.getItem("companyToken") || localStorage.getItem("token")
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={
            !localStorage.getItem("companyToken") && !localStorage.getItem("token")
          }
        >
          Teklif Gönder
        </button>
      </div>
    </div>
  );
}

export default OdaYenilemeHizmetleriDetail;
