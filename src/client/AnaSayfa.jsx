import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // yönlendirme için

function AnaSayfa() {
  const [homeData, setHomeData] = useState([]);
  const navigate = useNavigate();

  const dataAl = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/getdata");
      setHomeData(response.data);
    } catch (error) {
      console.error("Veri alınırken hata oluştu:", error);
    }
  };

  useEffect(() => {
    dataAl();
  }, []);

  return (
    <>
      <div style={{ padding: "20px" }}>
        <h1>Ana Sayfa</h1>
        <button
          onClick={() => navigate("/ilanekleme")}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          İlan Ekle
        </button>

        <div style={{ marginTop: "20px" }}>
          {homeData.length > 0 ? (
            <ul>
              {homeData.map((item, index) => (
                <li key={index}>{item.isim}</li>
              ))}
            </ul>
          ) : (
            <p>Veri yükleniyor...</p>
          )}
        </div>
      </div>
    </>
  );
}

export default AnaSayfa;
