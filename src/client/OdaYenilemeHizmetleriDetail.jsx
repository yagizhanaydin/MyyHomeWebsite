import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function OdaYenilemeHizmetleriDetail() {
  const { id } = useParams();
  const [oda, setOda] = useState(null);
  const [loading, setLoading] = useState(true);
  const [teklifFiyat, setTeklifFiyat] = useState("");
  const [aciklama, setAciklama] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [submitting, setSubmitting] = useState(false);
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
    if (!teklifFiyat) {
      alert("Lütfen teklif fiyatı girin!");
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem("companyToken") || localStorage.getItem("token");

      if (!token) {
        alert("Teklif vermek için giriş yapmalısınız!");
        return;
      }

      await axios.post(
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

      alert("Teklifiniz başarıyla gönderildi!");
      setTeklifFiyat("");
      setAciklama("");
    } catch (err) {
      console.error("Teklif gönderme hatası:", err);
      alert("Teklif gönderilemedi!");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
        <p className="text-gray-600">Yükleniyor...</p>
      </div>
    </div>
  );

  if (!oda) return null;

  const isLoggedIn = localStorage.getItem("companyToken") || localStorage.getItem("token");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate("/odayenileme")}
              className="flex items-center text-gray-600 hover:text-gray-900 transition duration-200 font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Geri
            </button>
            <h1 className="text-lg font-semibold text-gray-800">Oda Yenileme Detayı</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sol Taraf - İçerik */}
          <div className="lg:w-7/12">
            {/* Görseller */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
              {oda.fotolar?.length > 0 ? (
                <>
                  <div className="relative bg-gray-100">
                    <img
                      src={`http://localhost:3000/uploads/${oda.fotolar[activeImage]}`}
                      alt={`oda-${activeImage}`}
                      className="w-full h-80 md:h-96 object-cover"
                    />
                    {oda.fotolar.length > 1 && (
                      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                        {activeImage + 1} / {oda.fotolar.length}
                      </div>
                    )}
                  </div>
                  
                  {oda.fotolar.length > 1 && (
                    <div className="p-4 border-t border-gray-200">
                      <div className="flex space-x-2 overflow-x-auto">
                        {oda.fotolar.map((foto, index) => (
                          <button
                            key={index}
                            onClick={() => setActiveImage(index)}
                            className={`flex-shrink-0 w-20 h-16 rounded border-2 overflow-hidden transition-all duration-200 ${
                              activeImage === index 
                                ? 'border-green-500 shadow-sm' 
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            <img
                              src={`http://localhost:3000/uploads/${foto}`}
                              alt={`thumbnail-${index}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-80 bg-gray-100 flex flex-col items-center justify-center text-gray-400">
                  <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p>Görsel bulunamadı</p>
                </div>
              )}
            </div>

            {/* Talep Detayları */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">Talep Detayları</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Oda Sayısı</p>
                    <p className="font-semibold text-gray-800">{oda.oda_sayisi}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Konum</p>
                    <p className="font-semibold text-gray-800">{oda.il}, {oda.ilce}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Talep Tarihi</p>
                    <p className="font-semibold text-gray-800">{new Date(oda.created_at).toLocaleDateString('tr-TR')}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Talep Durumu</p>
                    <p className="font-semibold text-gray-800">Aktif</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Açıklama */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Açıklama</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {oda.aciklama || "Açıklama bulunmuyor."}
              </p>
            </div>

            {/* Adres */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Adres</h2>
              <div className="flex items-start">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-lg mb-1">{oda.il}, {oda.ilce}</p>
                  <p className="text-gray-600">{oda.adres || "Adres bilgisi bulunmuyor."}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Taraf - Teklif Formu */}
          <div className="lg:w-5/12">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">Teklif Ver</h2>

              {!isLoggedIn ? (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Teklif vermek için giriş yapın
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Bu talebe teklif verebilmek için hesabınıza giriş yapmalısınız.
                  </p>
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold text-lg transition duration-200"
                  >
                    Giriş Yap
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teklif Fiyatı (₺)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                        ₺
                      </span>
                      <input
                        type="number"
                        placeholder="0.00"
                        value={teklifFiyat}
                        onChange={(e) => setTeklifFiyat(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teklif Açıklaması (İsteğe Bağlı)
                    </label>
                    <textarea
                      placeholder="Teklifiniz hakkında detaylı açıklama yazın..."
                      value={aciklama}
                      onChange={(e) => setAciklama(e.target.value)}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all resize-none"
                    />
                  </div>

                  <button
                    onClick={handleTeklifVer}
                    disabled={!teklifFiyat || submitting}
                    className={`w-full py-3 rounded-lg font-semibold text-lg transition-all ${
                      !teklifFiyat || submitting
                        ? "bg-gray-400 cursor-not-allowed text-gray-200"
                        : "bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow-md"
                    }`}
                  >
                    {submitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        <span>Gönderiliyor...</span>
                      </div>
                    ) : (
                      "Teklifi Gönder"
                    )}
                  </button>

                  {!teklifFiyat && (
                    <p className="text-sm text-red-500 text-center">
                      Lütfen teklif fiyatı girin
                    </p>
                  )}
                </div>
              )}

              {/* Güvenlik Uyarısı */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <div className="text-sm text-blue-700">
                    <p className="font-medium mb-1">Güvenlik Uyarısı</p>
                    <p>Tanımadığınız kişilere ön ödeme yapmayın, yüz yüze görüşerek anlaşın.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hızlı Eylemler */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6">
              <h3 className="font-semibold text-gray-800 mb-4">Hızlı Eylemler</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate("/odayenileme")}
                  className="w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-medium transition duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                  </svg>
                  <span>Oda Yenileme Listesi</span>
                </button>
                <button
                  onClick={() => navigate("/tekliflerim")}
                  className="w-full flex items-center justify-center space-x-2 bg-orange-100 hover:bg-orange-200 text-orange-700 py-3 rounded-lg font-medium transition duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span>Tekliflerim</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OdaYenilemeHizmetleriDetail;