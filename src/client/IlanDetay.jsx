import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

function IlanDetay() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [ilan, setIlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  const getIlanDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/home/ilandetail/${id}`);
      const home = response.data.home;

      // Backend düzeltildiği için images işlemine gerek yok
      // home.images zaten dizi olarak gelecek
      
      setIlan(home);
    } catch (error) {
      console.error("Verileri çekerken hata oldu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getIlanDetail();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
        <p className="text-gray-600">İlan yükleniyor...</p>
      </div>
    </div>
  );
  
  if (!ilan) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <p className="text-xl text-gray-700 font-medium mb-2">İlan bulunamadı</p>
        <p className="text-gray-500 mb-6">Aradığınız ilan mevcut değil veya kaldırılmış olabilir.</p>
        <button 
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-200 font-medium"
        >
          Geri Dön
        </button>
      </div>
    </div>
  );

  // images dizisini güvenli bir şekilde al
  const images = ilan.images || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition duration-200 font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Geri
            </button>
            <h1 className="text-lg font-semibold text-gray-800">İlan Detayı</h1>
            <div className="w-20 flex justify-end">
              <button className="text-gray-400 hover:text-gray-600 transition duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-7/12">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
              {images.length > 0 ? (
                <>
                  <div className="relative bg-gray-100">
                    <img
                      src={`http://localhost:3000/uploads/${images[selectedImage]}`}
                      alt={`ilan-resim-${selectedImage}`}
                      className="w-full h-80 md:h-96 object-cover"
                    />
                    {images.length > 1 && (
                      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                        {selectedImage + 1} / {images.length}
                      </div>
                    )}
                  </div>
                  
                  {images.length > 1 && (
                    <div className="p-4 border-t border-gray-200">
                      <div className="flex space-x-2 overflow-x-auto">
                        {images.map((resim, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`flex-shrink-0 w-20 h-16 rounded border-2 overflow-hidden transition-all duration-200 ${
                              selectedImage === index 
                                ? 'border-orange-500 shadow-sm' 
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            <img
                              src={`http://localhost:3000/uploads/${resim}`}
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
                  <p>Resim bulunamadı</p>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">Özellikler</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Oda Sayısı</p>
                    <p className="font-semibold text-gray-800">{ilan.oda_sayisi}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Brüt Metrekare</p>
                    <p className="font-semibold text-gray-800">{ilan.brut_metrekare} m²</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Net Metrekare</p>
                    <p className="font-semibold text-gray-800">{ilan.net_metrekare} m²</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Konum</p>
                    <p className="font-semibold text-gray-800">{ilan.il}, {ilan.ilce}</p>
                  </div>
                </div>

                {ilan.numara && (
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Telefon</p>
                      <p className="font-semibold text-gray-800">{ilan.numara}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center">
                  <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">İlan Durumu</p>
                    <p className="font-semibold text-gray-800">Aktif</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Açıklama</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {ilan.aciklama || "Açıklama bulunmuyor."}
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Adres</h2>
              <div className="flex items-start">
                <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-lg mb-1">{ilan.il}, {ilan.ilce}</p>
                  <p className="text-gray-600">{ilan.adres}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-5/12">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {new Intl.NumberFormat('tr-TR').format(ilan.fiyat)} TL
                </div>
                <div className="text-sm text-gray-500">Fiyat</div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-gray-800">{ilan.oda_sayisi}</div>
                    <div className="text-gray-500">Oda</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-800">{ilan.brut_metrekare}</div>
                    <div className="text-gray-500">Brüt m²</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-800">{ilan.net_metrekare}</div>
                    <div className="text-gray-500">Net m²</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-orange-600 transition duration-200 shadow-sm">
                  {ilan.numara ? `0${ilan.numara}` : 'Telefon Numarası'}
                </button>
                <button className="w-full border border-orange-500 text-orange-500 py-3 rounded-lg font-semibold text-lg hover:bg-orange-50 transition duration-200">
                  Mesaj Gönder
                </button>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <div className="text-sm text-blue-700">
                    <p className="font-medium mb-1">Güvenliğiniz için öneriler:</p>
                    <p>Tanımadığınız kişilere ön ödeme yapmayın, yüz yüze görüşün.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6">
              <h3 className="font-semibold text-gray-800 mb-4">Satıcı Bilgileri</h3>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Emlak Ofisi</p>
                  <p className="text-sm text-gray-500">Üye since 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IlanDetay;