import React, { useState } from "react";
import axios from "axios";
import illerData from "../data/turkiye_il_ilce.json"; 

function OdaYenilemeHizmetleri() {
  const [iller] = useState(
    Object.entries(illerData).map(([il, ilceler]) => ({ il, ilceler }))
  );
  const [arama, setArama] = useState("");
  const [secilenIl, setSecilenIl] = useState("");
  const [secilenIlceler, setSecilenIlceler] = useState([]);
  const [secilenIlce, setSecilenIlce] = useState("");

  const [odaSayisi, setOdaSayisi] = useState(1);
  const [odaTurleri, setOdaTurleri] = useState([""]);
  const [fotolar, setFotolar] = useState([]);
  const [aciklama, setAciklama] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filtreliIller = iller.filter((item) =>
    item.il.toLowerCase().includes(arama.toLowerCase())
  );

  const handleIlSelect = (il) => {
    setSecilenIl(il);
    const ilObj = iller.find((item) => item.il === il);
    setSecilenIlceler(ilObj ? ilObj.ilceler : []);
    setArama("");
  };

  const handleOdaSayisiChange = (e) => {
    const sayi = parseInt(e.target.value);
    setOdaSayisi(sayi);
    const yeniTurler = [...odaTurleri];
    while (yeniTurler.length < sayi) yeniTurler.push("");
    while (yeniTurler.length > sayi) yeniTurler.pop();
    setOdaTurleri(yeniTurler);
  };

  const handleOdaTuruChange = (index, value) => {
    const yeniTurler = [...odaTurleri];
    yeniTurler[index] = value;
    setOdaTurleri(yeniTurler);
  };

  const handleFotoChange = (e) => {
    setFotolar((prev) => [...prev, ...Array.from(e.target.files)]);
  };

  const removeFoto = (index) => {
    setFotolar((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!secilenIl || !secilenIlce) {
      alert("Lütfen il ve ilçe seçiniz!");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("odaSayisi", odaSayisi);
    odaTurleri.forEach((tur) => formData.append("odaTurleri[]", tur));
    formData.append("aciklama", aciklama);
    formData.append("il", secilenIl);
    formData.append("ilce", secilenIlce);
    fotolar.forEach((foto) => formData.append("fotolar", foto));

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3000/oda-yenileme/add-odahizmet", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Oda yenileme talebiniz başarıyla gönderildi!");
      setOdaSayisi(1);
      setOdaTurleri([""]);
      setFotolar([]);
      setAciklama("");
      setSecilenIl("");
      setSecilenIlce("");
      setSecilenIlceler([]);
    } catch (err) {
      console.error(err);
      alert("Bir hata oluştu, tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <h1 className="text-2xl font-bold text-white text-center">
            Oda Yenileme Hizmetleri
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
    
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              İl Seçiniz
            </label>
            <input
              type="text"
              value={arama || secilenIl}
              onChange={(e) => {
                setArama(e.target.value);
                setSecilenIl("");
                setSecilenIlce("");
                setSecilenIlceler([]);
              }}
              placeholder="İl ara veya seç..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {arama && (
              <div className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow-md max-h-48 overflow-y-auto w-full mt-1">
                {filtreliIller.length > 0 ? (
                  filtreliIller.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleIlSelect(item.il)}
                      className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                    >
                      {item.il}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500 text-sm">Sonuç bulunamadı</div>
                )}
              </div>
            )}
          </div>

   
          {secilenIlceler.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                İlçe Seçiniz
              </label>
              <select
                value={secilenIlce}
                onChange={(e) => setSecilenIlce(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seçiniz</option>
                {secilenIlceler.map((ilce, index) => (
                  <option key={index} value={ilce}>
                    {ilce}
                  </option>
                ))}
              </select>
            </div>
          )}

        
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kaç Oda</label>
            <input
              type="number"
              value={odaSayisi}
              onChange={handleOdaSayisiChange}
              min="1"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {odaTurleri.map((tur, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {index + 1}. Oda Türü
              </label>
              <select
                value={tur}
                onChange={(e) => handleOdaTuruChange(index, e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seçiniz</option>
                <option value="Mutfak">Mutfak</option>
                <option value="Banyo">Banyo</option>
                <option value="Hol">Hol</option>
                <option value="Çocuk Odası">Çocuk Odası</option>
              </select>
            </div>
          ))}

      
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
            <textarea
              value={aciklama}
              onChange={(e) => setAciklama(e.target.value)}
              placeholder="Ne tür bir tadilat istiyorsunuz?"
              rows={4}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Oda Fotoğrafları ({fotolar.length}/9)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200">
              <label htmlFor="file-upload" className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                Fotoğraf Ekle
              </label>
              <input id="file-upload" type="file" multiple onChange={handleFotoChange} accept="image/*" className="hidden" />
            </div>
            {fotolar.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-3">
                {fotolar.map((foto, index) => (
                  <div key={index} className="relative">
                    <img src={URL.createObjectURL(foto)} alt={`oda-${index}`} className="h-20 w-full object-cover rounded-lg" />
                    <button type="button" onClick={() => removeFoto(index)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

        
          <button type="submit" disabled={isSubmitting} className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 ${
            isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          }`}>
            {isSubmitting ? "Gönderiliyor..." : "Gönder"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default OdaYenilemeHizmetleri;
