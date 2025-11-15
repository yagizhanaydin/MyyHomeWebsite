import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Tekliflerim() {
  const [teklifler, setTeklifler] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeklifler = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          
          navigate("/login");
          return;
        }

       
        const res = await axios.get("http://localhost:3000/oda-yenileme/tekliflerim", {
          headers: { Authorization: `Bearer ${token}` }
        });

        setTeklifler(res.data.teklifler);
      } catch (err) {
        console.error(err);
        // Token geçersiz veya başka hata olursa login’e yönlendir
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchTeklifler();
  }, [navigate]);

  if (loading) return <div>Yükleniyor...</div>;
  if (teklifler.length === 0) return <div>Henüz teklif yok.</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Tekliflerim</h2>
      <ul className="space-y-3">
        {teklifler.map((t, i) => (
          <li key={i} className="p-3 border rounded shadow-sm">
            <strong>{t.company_name}</strong> - {t.teklif_fiyat}₺
            <p>{t.aciklama}</p>
            <small>{new Date(t.teklif_tarihi).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tekliflerim;
