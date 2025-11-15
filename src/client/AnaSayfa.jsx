import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import turkiyeIlIlce from "../data/turkiye_il_ilce.json"; 

function AnaSayfa() {
  const [ilanlar, setIlanlar] = useState([]);
  const [odaYenileme, setOdaYenileme] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("hepsi");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    odaSayisi: "",
    minFiyat: "",
    maxFiyat: "",
    il: "",
    ilce: ""
  });

  const navigate = useNavigate();


  const getIlceler = () => {
    if (!filters.il) return [];
    return turkiyeIlIlce[filters.il] || [];
  };

  const dataAl = async () => {
    setLoading(true);
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

 
  useEffect(() => {
    if (filters.il) {
      setFilters(prev => ({...prev, ilce: ""}));
    }
  }, [filters.il]);

 
  const getFilteredItems = () => {
    let filteredIlanlar = [...ilanlar];
    let filteredOdaYenileme = [...odaYenileme];

    
    if (filter !== "oda") {
      if (filters.odaSayisi) {
        filteredIlanlar = filteredIlanlar.filter(item => 
          item.oda_sayisi === filters.odaSayisi
        );
      }
      if (filters.minFiyat) {
        filteredIlanlar = filteredIlanlar.filter(item => 
          item.fiyat >= parseInt(filters.minFiyat)
        );
      }
      if (filters.maxFiyat) {
        filteredIlanlar = filteredIlanlar.filter(item => 
          item.fiyat <= parseInt(filters.maxFiyat)
        );
      }
      if (filters.il) {
        filteredIlanlar = filteredIlanlar.filter(item => 
          item.il.toLowerCase().includes(filters.il.toLowerCase())
        );
      }
      if (filters.ilce) {
        filteredIlanlar = filteredIlanlar.filter(item => 
          item.ilce.toLowerCase().includes(filters.ilce.toLowerCase())
        );
      }
    }

    return { filteredIlanlar, filteredOdaYenileme };
  };

  const { filteredIlanlar, filteredOdaYenileme } = getFilteredItems();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const resetFilters = () => {
    setFilters({
      odaSayisi: "",
      minFiyat: "",
      maxFiyat: "",
      il: "",
      ilce: ""
    });
  };

  const activeFilterCount = Object.values(filters).filter(value => value !== "").length;

  if (loading) return <div className="p-4 text-center">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">BenimEvimm</h1>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 text-white rounded text-sm"
            >
              Çıkış
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
      
        <div className="grid grid-cols-3 gap-2 mb-6">
          <button
            onClick={() => navigate("/ilanekleme")}
            className="bg-blue-500 text-white py-2 rounded text-sm"
          >
            İlan Ekle
          </button>
          <button
            onClick={() => navigate("/odayenileme")}
            className="bg-green-500 text-white py-2 rounded text-sm"
          >
            Oda Yenileme
          </button>
          <button
            onClick={() => navigate("/tekliflerim")}
            className="bg-orange-500 text-white py-2 rounded text-sm"
          >
            Tekliflerim
          </button>
        </div>

       
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          <button
            onClick={() => setFilter("hepsi")}
            className={`px-3 py-2 rounded text-sm whitespace-nowrap ${
              filter === "hepsi" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Hepsi
          </button>
          <button
            onClick={() => setFilter("ilan")}
            className={`px-3 py-2 rounded text-sm whitespace-nowrap ${
              filter === "ilan" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Ev İlanları
          </button>
          <button
            onClick={() => setFilter("oda")}
            className={`px-3 py-2 rounded text-sm whitespace-nowrap ${
              filter === "oda" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Oda Yenileme
          </button>
          
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-3 py-2 bg-purple-500 text-white rounded text-sm whitespace-nowrap flex items-center gap-1"
          >
            <span>🔍 Filtrele</span>
            {activeFilterCount > 0 && (
              <span className="bg-white text-purple-500 rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

      
        {showFilters && (
          <div className="bg-white p-4 rounded border mb-4 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
             
              {filter !== "oda" && (
                <div>
                  <label className="block text-sm font-medium mb-1">Oda Sayısı</label>
                  <select
                    value={filters.odaSayisi}
                    onChange={(e) => setFilters(prev => ({...prev, odaSayisi: e.target.value}))}
                    className="w-full p-2 border rounded text-sm"
                  >
                    <option value="">Seçiniz</option>
                    <option value="1+0">1+0</option>
                    <option value="1+1">1+1</option>
                    <option value="2+0">2+0</option>
                    <option value="2+1">2+1</option>
                    <option value="3+1">3+1</option>
                    <option value="3+2">3+2</option>
                    <option value="4+1">4+1</option>
                    <option value="4+2">4+2</option>
                    <option value="5+1">5+1</option>
                    <option value="5+2">5+2</option>
                  </select>
                </div>
              )}
              
          
              <div>
                <label className="block text-sm font-medium mb-1">İl</label>
                <select
                  value={filters.il}
                  onChange={(e) => setFilters(prev => ({...prev, il: e.target.value}))}
                  className="w-full p-2 border rounded text-sm"
                >
                  <option value="">İl Seçin</option>
                  {Object.keys(turkiyeIlIlce).map((il) => (
                    <option key={il} value={il}>
                      {il}
                    </option>
                  ))}
                </select>
              </div>

          
              <div>
                <label className="block text-sm font-medium mb-1">İlçe</label>
                <select
                  value={filters.ilce}
                  onChange={(e) => setFilters(prev => ({...prev, ilce: e.target.value}))}
                  className="w-full p-2 border rounded text-sm"
                  disabled={!filters.il}
                >
                  <option value="">İlçe Seçin</option>
                  {getIlceler().map((ilce) => (
                    <option key={ilce} value={ilce}>
                      {ilce}
                    </option>
                  ))}
                </select>
              </div>

           
              <div>
                <label className="block text-sm font-medium mb-1">Fiyat Aralığı</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minFiyat}
                    onChange={(e) => setFilters(prev => ({...prev, minFiyat: e.target.value}))}
                    className="flex-1 p-2 border rounded text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxFiyat}
                    onChange={(e) => setFilters(prev => ({...prev, maxFiyat: e.target.value}))}
                    className="flex-1 p-2 border rounded text-sm"
                  />
                </div>
              </div>
            </div>

          
            <div className="flex gap-2">
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
              >
                Filtreleri Temizle
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
              >
                Uygula
              </button>
            </div>
          </div>
        )}

        {/* İlanlar */}
        {filter !== "oda" && filteredIlanlar.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Ev İlanları ({filteredIlanlar.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredIlanlar.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/ilandetail/${item.id}`)}
                >
                  {item.images && item.images.length > 0 && (
                    <img
                      src={`http://localhost:3000/uploads/${item.images[0]}`}
                      alt="ilan"
                      className="w-full h-40 object-cover"
                    />
                  )}
                  <div className="p-3">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-sm">{item.il}, {item.ilce}</h3>
                      <span className="font-bold text-green-600">₺{item.fiyat}</span>
                    </div>
                    <p className="text-gray-600 text-xs mb-1">{item.adres}</p>
                    <p className="text-gray-500 text-xs">{item.oda_sayisi} | {item.metrekare}m²</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Oda Yenileme */}
        {filter !== "ilan" && filteredOdaYenileme.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Oda Yenileme ({filteredOdaYenileme.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredOdaYenileme.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/odayenilemedetail/${item.id}`)}
                >
                  {item.fotolar && item.fotolar.length > 0 && (
                    <img
                      src={`http://localhost:3000/uploads/${item.fotolar[0]}`}
                      alt="oda"
                      className="w-full h-40 object-cover"
                    />
                  )}
                  <div className="p-3">
                    <h3 className="font-semibold text-sm mb-2">{item.il}, {item.ilce}</h3>
                    <p className="text-gray-600 text-xs mb-2 line-clamp-2">{item.aciklama}</p>
                    <div className="flex justify-between text-gray-500 text-xs">
                      <span>{item.oda_sayisi} oda</span>
                      <span>{new Date(item.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sonuç bulunamadı mesajları */}
        {filter === "ilan" && filteredIlanlar.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {activeFilterCount > 0 
              ? "Filtrelere uygun ilan bulunamadı" 
              : "Henüz ilan bulunmuyor"
            }
          </div>
        )}

        {filter === "oda" && filteredOdaYenileme.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Henüz oda yenileme talebi yok
          </div>
        )}
      </div>
    </div>
  );
}

export default AnaSayfa;