import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import LoginSchema from '../schemas/LoginYup';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const LoginFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setServerError("");
      try {
        const response = await axios.post("http://localhost:3000/api/login", values);

        console.log("Giriş başarılı:", response.data);

       
        const token = response.data.token;
        if (token) {
          localStorage.setItem("token", token);
          console.log("Token localStorage’a kaydedildi:", token);
        }

      
        navigate("/");

      } catch (error) {
        console.error(error);
        const msg = error?.response?.data?.message || "Sunucu ile bağlantı kurulamadı.";
        setServerError(msg);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const inputBase =
    "w-full px-4 py-3 rounded-xl border-2 bg-white/80 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:scale-[1.02]";

  const inputClass = (fieldName) =>
    `${inputBase} ${
      LoginFormik.touched[fieldName] && LoginFormik.errors[fieldName]
        ? "border-rose-400 shadow-rose-100 shadow-lg"
        : "border-gray-200/60 focus:border-blue-500 focus:shadow-blue-100 focus:shadow-lg"
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-md relative z-10">
        <form
          onSubmit={LoginFormik.handleSubmit}
          className="bg-white/20 backdrop-blur-lg rounded-3xl border-2 border-white/30 shadow-2xl p-8"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Giriş Yap</h2>

          {serverError && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/20 border border-rose-400/30 text-white text-sm">
              {serverError}
            </div>
          )}

       
          <div>
            <label className="block text-white/90 text-sm font-medium mb-3">E-posta</label>
            <input
              type="email"
              name="email"
              placeholder="ornek@email.com"
              {...LoginFormik.getFieldProps("email")}
              className={inputClass("email")}
            />
          </div>

      
          <div className="mt-6">
            <label className="block text-white/90 text-sm font-medium mb-3">Şifre</label>
            <input
              type="password"
              name="password"
              placeholder="Şifrenizi girin"
              {...LoginFormik.getFieldProps("password")}
              className={inputClass("password")}
            />
          </div>

       
          <button
            type="submit"
            disabled={LoginFormik.isSubmitting}
            className="w-full mt-8 py-4 bg-white/20 hover:bg-white/30 rounded-xl text-white font-semibold"
          >
            {LoginFormik.isSubmitting ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>

          <p className="mt-4 text-center text-white/70 text-sm">
            Hesabınız yok mu?{" "}
            <a href="/register" className="text-white font-semibold underline">
              Kayıt Olun
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
