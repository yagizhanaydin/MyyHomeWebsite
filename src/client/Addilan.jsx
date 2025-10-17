import React, { useState } from "react";
import { useFormik } from "formik";
import AddSchemaYup from "../schemas/AddHomeYup";
import axios from "axios";

function AddIlan() {
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      il: "",
      ilce: "",
      adres: "",
      numara: "",
      odaSayisi: "",
      brutMetrekare: "",
      netMetrekare: "",
      fiyat: "",
      aciklama: "",
    },
    validationSchema: AddSchemaYup,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const token = localStorage.getItem("token");
        const formData = new FormData();

        // Form verilerini ekle
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value);
        });

        // Görselleri ekle
        images.forEach((file) => formData.append("images", file));

        const response = await axios.post(
          "http://localhost:3000/home/addilan",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("İlan eklendi:", response.data);
        alert("İlan başarıyla eklendi ✅");
        formik.resetForm();
        setImages([]);
      } catch (error) {
        console.error("İlan ekleme hatası:", error);
        alert("Bir hata oluştu ❌");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // Resim seçme
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const allImages = [...images, ...files];

    if (allImages.length > 9) {
      alert("En fazla 9 resim ekleyebilirsiniz!");
      return;
    }

    setImages(allImages);
    e.target.value = "";
  };

  // Resim silme
  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <h1 className="text-2xl font-bold text-white text-center">
            Yeni İlan Ekle
          </h1>
        </div>

        <form onSubmit={formik.handleSubmit} className="p-6 space-y-6">
          {/* İl ve İlçe */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                İl
              </label>
              <input
                type="text"
                placeholder="Örn: İstanbul"
                {...formik.getFieldProps("il")}
                className={`w-full px-4 py-3 border rounded-lg ${
                  formik.touched.il && formik.errors.il
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.il && formik.errors.il && (
                <p className="text-red-600 text-sm mt-1">{formik.errors.il}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                İlçe
              </label>
              <input
                type="text"
                placeholder="Örn: Kadıköy"
                {...formik.getFieldProps("ilce")}
                className={`w-full px-4 py-3 border rounded-lg ${
                  formik.touched.ilce && formik.errors.ilce
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.ilce && formik.errors.ilce && (
                <p className="text-red-600 text-sm mt-1">
                  {formik.errors.ilce}
                </p>
              )}
            </div>
          </div>

          {/* Adres ve Numara */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adres
              </label>
              <input
                type="text"
                placeholder="Mahalle, sokak..."
                {...formik.getFieldProps("adres")}
                className={`w-full px-4 py-3 border rounded-lg ${
                  formik.touched.adres && formik.errors.adres
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.adres && formik.errors.adres && (
                <p className="text-red-600 text-sm mt-1">
                  {formik.errors.adres}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefon Numarası
              </label>
              <input
                type="text"
                placeholder="Örn: 12/A"
                {...formik.getFieldProps("numara")}
                className="w-full px-4 py-3 border rounded-lg border-gray-300"
              />
            </div>
          </div>

          {/* Oda Sayısı, Brüt ve Net m² */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Oda Sayısı
              </label>
              <input
                type="text"
                placeholder="Örn: 3+1"
                {...formik.getFieldProps("odaSayisi")}
                className={`w-full px-4 py-3 border rounded-lg ${
                  formik.touched.odaSayisi && formik.errors.odaSayisi
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.odaSayisi && formik.errors.odaSayisi && (
                <p className="text-red-600 text-sm mt-1">
                  {formik.errors.odaSayisi}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brüt m²
              </label>
              <input
                type="number"
                placeholder="Örn: 120"
                {...formik.getFieldProps("brutMetrekare")}
                className={`w-full px-4 py-3 border rounded-lg ${
                  formik.touched.brutMetrekare && formik.errors.brutMetrekare
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.brutMetrekare && formik.errors.brutMetrekare && (
                <p className="text-red-600 text-sm mt-1">
                  {formik.errors.brutMetrekare}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Net m²
              </label>
              <input
                type="number"
                placeholder="Örn: 100"
                {...formik.getFieldProps("netMetrekare")}
                className={`w-full px-4 py-3 border rounded-lg ${
                  formik.touched.netMetrekare && formik.errors.netMetrekare
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.netMetrekare && formik.errors.netMetrekare && (
                <p className="text-red-600 text-sm mt-1">
                  {formik.errors.netMetrekare}
                </p>
              )}
            </div>
          </div>

          {/* Fiyat */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fiyat
            </label>
            <div className="relative">
              <input
                type="number"
                placeholder="0.00"
                {...formik.getFieldProps("fiyat")}
                className={`w-full px-4 py-3 border rounded-lg ${
                  formik.touched.fiyat && formik.errors.fiyat
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              <div className="absolute right-3 inset-y-0 flex items-center text-gray-500">
                ₺
              </div>
            </div>
            {formik.touched.fiyat && formik.errors.fiyat && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.fiyat}</p>
            )}
          </div>

          {/* Açıklama */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Açıklama
            </label>
            <textarea
              rows={4}
              placeholder="İlan açıklamasını yazın..."
              {...formik.getFieldProps("aciklama")}
              className={`w-full px-4 py-3 border rounded-lg ${
                formik.touched.aciklama && formik.errors.aciklama
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.aciklama && formik.errors.aciklama && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.aciklama}</p>
            )}
          </div>

          {/* Resimler */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Resimler ({images.length}/9)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200">
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
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

            {images.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-3">
                {images.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt=""
                      className="h-20 w-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            }`}
          >
            {isSubmitting ? "İlan Ekleniyor..." : "İlanı Ekle"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddIlan;