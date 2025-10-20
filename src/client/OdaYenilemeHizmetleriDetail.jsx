import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function OdaYenilemeHizmetleriDetail() {
  const { id } = useParams();
  const [oda, setOda] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOda = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/oda-yenileme/odahizmet-detail/${id}`);
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

      {oda.fotolar && oda.fotolar.length > 0 && (
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
    </div>
  );
}

export default OdaYenilemeHizmetleriDetail;
