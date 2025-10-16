import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import LoginSchema from '../schemas/LoginYup';

function Login() {
  const [serverError, setServerError] = useState("");

  const LoginFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setServerError("");
      try {
        const response = await axios.post("/api/login", values);
        console.log("Giriş başarılı:", response.data);
        // İstersen yönlendirme veya token işlemi ekleyebilirsin
      } catch (error) {
        console.error(error);
        const msg = error?.response?.data?.message || "Sunucu ile bağlantı kurulamadı.";
        setServerError(msg);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const inputBase = "w-full px-4 py-3 rounded-xl border-2 bg-white/80 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:scale-[1.02]";

  const inputClass = (fieldName) =>
    `${inputBase} ${
      LoginFormik.touched[fieldName] && LoginFormik.errors[fieldName]
        ? "border-rose-400 shadow-rose-100 shadow-lg"
        : "border-gray-200/60 focus:border-blue-500 focus:shadow-blue-100 focus:shadow-lg"
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <form
          onSubmit={LoginFormik.handleSubmit}
          className="bg-white/20 backdrop-blur-lg rounded-3xl border-2 border-white/30 shadow-2xl p-8"
          aria-label="Giriş formu"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-white/30">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Hoş Geldiniz</h2>
            <p className="text-white/80 text-sm">Hesabınıza giriş yapın</p>
          </div>

          {/* Error Message */}
          {serverError && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/20 backdrop-blur-sm border border-rose-400/30 text-white text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {serverError}
              </div>
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-white/90 text-sm font-medium mb-3">E-posta Adresi</label>
              <input
                type="email"
                name="email"
                placeholder="ornek@email.com"
                {...LoginFormik.getFieldProps("email")}
                className={inputClass("email")}
              />
              {LoginFormik.touched.email && LoginFormik.errors.email && (
                <p className="text-rose-200 text-xs mt-2 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {LoginFormik.errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-white/90 text-sm font-medium mb-3">Şifre</label>
              <input
                type="password"
                name="password"
                placeholder="Şifrenizi girin"
                {...LoginFormik.getFieldProps("password")}
                className={inputClass("password")}
              />
              {LoginFormik.touched.password && LoginFormik.errors.password && (
                <p className="text-rose-200 text-xs mt-2 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {LoginFormik.errors.password}
                </p>
              )}
            </div>
          </div>

          {/* Remember me & Forgot password */}
          <div className="flex items-center justify-between mt-4">
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="w-4 h-4 text-blue-500 bg-white/20 border-2 border-white/30 rounded focus:ring-blue-400"
              />
              <span className="ml-2 text-white/80 text-sm">Beni hatırla</span>
            </label>
            <a href="/forgot-password" className="text-white/80 text-sm hover:text-white transition-colors">
              Şifremi unuttum?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={LoginFormik.isSubmitting}
            className="w-full mt-8 py-4 px-6 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/30 rounded-xl text-white font-semibold text-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
          >
            {LoginFormik.isSubmitting ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Giriş Yapılıyor...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Giriş Yap
              </>
            )}
          </button>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-white/70 text-sm">
              Hesabınız yok mu?{" "}
              <a href="/register" className="text-white font-semibold hover:text-white/90 underline transition-colors">
                Kayıt Olun
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;