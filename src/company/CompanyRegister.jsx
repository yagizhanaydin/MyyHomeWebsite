import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import CompanyRegisterSchema from "../schemas/CompanyRegisterSchema.jsx";

function CompanyRegister() {
  const [belgeler, setBelgeler] = useState([]);

  const handleFileChange = (e) => {
    const yeniBelgeler = Array.from(e.target.files);
    setBelgeler((prev) => [...prev, ...yeniBelgeler]);
  };

  const RegisterFormik = useFormik({
    initialValues: {
      company_name: "",
      phone_number: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: CompanyRegisterSchema,
   onSubmit: async (values) => {
  if (belgeler.length === 0) {
    alert("Lütfen belgelerinizi yükleyin!");
    return;
  }

  const formData = new FormData();
  formData.append("company_name", values.company_name);
  formData.append("phone_number", values.phone_number);
  formData.append("password", values.password);
  formData.append("confirmPassword", values.confirmPassword);

  belgeler.forEach((belge) => formData.append("belgeler", belge));

  try {
    const res = await axios.post(
      "http://localhost:3000/company/register",
      formData
    );

    console.log(" Backend cevabı:", res.data);  
    alert("Kayıt ve belge yükleme başarılı!");
  } catch (err) {
    console.error(" Kayıt hatası:", err);

    
    if (err.response && err.response.data && err.response.data.message) {
      alert("Kayıt başarısız: " + err.response.data.message);
      console.log("Backend mesajı:", err.response.data.message);
    } else {
      alert("Kayıt başarısız: Sunucuya ulaşılamıyor veya bilinmeyen hata.");
    }
  }
}

  });

  return (
    <div style={{ padding: "20px" }}>
      <h2>Emlak Şirketi Kaydı</h2>
      <p>Aşağıdaki belgeleri yüklemeniz gerekmektedir:</p>
      <ul>
        <li>Vergi levhası</li>
        <li>Ticaret sicil gazetesi</li>
        <li>Kimlik fotokopisi</li>
        <li>Ofis kira kontratı veya tapu</li>
        <li>Emlak yetki belgesi</li>
      </ul>

      <form
        onSubmit={RegisterFormik.handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "320px",
        }}
      >
        <input
          type="text"
          name="company_name"
          placeholder="Şirket Adı"
          onChange={RegisterFormik.handleChange}
          value={RegisterFormik.values.company_name}
          required
        />
        <input
          type="text"
          name="phone_number"
          placeholder="Telefon Numarası"
          onChange={RegisterFormik.handleChange}
          value={RegisterFormik.values.phone_number}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Şifre"
          onChange={RegisterFormik.handleChange}
          value={RegisterFormik.values.password}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Şifre Tekrar"
          onChange={RegisterFormik.handleChange}
          value={RegisterFormik.values.confirmPassword}
          required
        />
        <input
          type="file"
          name="belgeler"
          onChange={handleFileChange}
          accept=".pdf,.jpg,.png"
          multiple
          required
        />

       
        {belgeler.length > 0 && (
          <div>
            <p>Yüklenecek Belgeler:</p>
            <ul>
              {belgeler.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}

        <button type="submit">Kayıt Ol</button>
      </form>
    </div>
  );
}

export default CompanyRegister;
