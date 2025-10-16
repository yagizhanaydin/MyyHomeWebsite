import React, { useState } from "react";
import { useFormik } from "formik";
import AddSchemaYup from "../schemas/AddHomeYup";
import axios from "axios";

function AddIlan() {
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formik = useFormik({
    initialValues: {
      aciklama: "",
      fiyat: "",
    },
    validationSchema: AddSchemaYup,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const token = localStorage.getItem("token");
        const formData = new FormData();

        formData.append("aciklama", values.aciklama);
        formData.append("fiyat", values.fiyat);

        images.forEach((file, index) => {
          formData.append("images", file);
        });

        const response = await axios.post("http://localhost:3000/home/addilan", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("İlan eklendi:", response.data);
        formik.resetForm();
        setImages([]);
      } catch (error) {
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Mevcut resimlerle yeni seçilenleri birleştir
    const allImages = [...images, ...files];
    
    if (allImages.length > 9) {
      alert("En fazla 9 resim ekleyebilirsiniz!");
      return;
    }
    
    setImages(allImages);
    
    // Input'u sıfırla ki aynı dosyaları tekrar seçebilsin
    e.target.value = '';
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <h1 className="text-2xl font-bold text-white text-center">Yeni İlan Ekle</h1>
        </div>
        
        <form onSubmit={formik.handleSubmit} className="p-6 space-y-6">
          {/* Açıklama Alanı */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Açıklama
            </label>
            <textarea
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                formik.touched.aciklama && formik.errors.aciklama
                  ? "border-red-500 ring-2 ring-red-200"
                  : "border-gray-300"
              }`}
              placeholder="İlan açıklamasını yazın..."
              {...formik.getFieldProps("aciklama")}
            />
            {formik.touched.aciklama && formik.errors.aciklama && (
              <div className="mt-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {formik.errors.aciklama}
              </div>
            )}
          </div>

          {/* Fiyat Alanı */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fiyat
            </label>
            <div className="relative">
              <input
                type="number"
                className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  formik.touched.fiyat && formik.errors.fiyat
                    ? "border-red-500 ring-2 ring-red-200"
                    : "border-gray-300"
                }`}
                placeholder="0.00"
                {...formik.getFieldProps("fiyat")}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500">₺</span>
              </div>
            </div>
            {formik.touched.fiyat && formik.errors.fiyat && (
              <div className="mt-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {formik.errors.fiyat}
              </div>
            )}
          </div>

          {/* Resim Yükleme Alanı */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Resimler ({images.length}/9)
            </label>
            
            {/* Dosya Seçme Butonu */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="mt-4">
                <label htmlFor="file-upload" className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 inline-flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Resim Ekle
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                PNG, JPG, JPEG formatları (En fazla 9 resim)
              </p>
              {images.length > 0 && (
                <p className="mt-1 text-xs text-blue-600">
                  {images.length} resim seçildi. Daha fazla ekleyebilirsiniz.
                </p>
              )}
            </div>

            {/* Seçilen Resimlerin Önizlemesi */}
            {images.length > 0 && (
              <div className="mt-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-medium text-gray-700">Seçilen Resimler:</h4>
                  <button
                    type="button"
                    onClick={() => setImages([])}
                    className="text-xs text-red-600 hover:text-red-800 font-medium"
                  >
                    Tümünü Temizle
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {images.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-100 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600 shadow-lg"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                  
                  {/* Boş alanları göster */}
                  {Array.from({ length: 9 - images.length }).map((_, index) => (
                    <div key={`empty-${index}`} className="w-full h-20 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400 text-2xl">+</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Gönder Butonu */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                İlan Ekleniyor...
              </div>
            ) : (
              "İlanı Ekle"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddIlan;