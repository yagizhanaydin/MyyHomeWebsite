import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import RegisterSchema from "../schemas/RegisterYup";

function RegisterClient() {
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const RegisterFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordagain: ""
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setServerError("");
      setSuccessMessage("");
      try {
        const response = await axios.post("http://localhost:3000/api/register", values);
        setSuccessMessage(response?.data?.message || "Kayıt başarılı!");
        resetForm();
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
      RegisterFormik.touched[fieldName] && RegisterFormik.errors[fieldName]
        ? "border-rose-400 shadow-rose-100 shadow-lg"
        : "border-gray-200/60 focus:border-blue-500 focus:shadow-blue-100 focus:shadow-lg"
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4">
    
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <form
          onSubmit={RegisterFormik.handleSubmit}
          className="bg-white/20 backdrop-blur-lg rounded-3xl border-2 border-white/30 shadow-2xl p-8"
          aria-label="Kayıt formu"
        >
       
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-white/30">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">BenimEvimm</h2>
            <p className="text-white/80 text-sm">Kayıt Ol</p>
          </div>

        
          {successMessage && (
            <div className="mb-6 p-4 rounded-xl bg-green-500/20 backdrop-blur-sm border border-green-400/30 text-white text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {successMessage}
              </div>
            </div>
          )}

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

    
          <div className="space-y-6">
        
            <div>
              <label className="block text-white/90 text-sm font-medium mb-3">E-posta Adresi</label>
              <input
                type="email"
                name="email"
                placeholder="ornek@email.com"
                {...RegisterFormik.getFieldProps("email")}
                className={inputClass("email")}
              />
              {RegisterFormik.touched.email && RegisterFormik.errors.email && (
                <p className="text-rose-200 text-xs mt-2 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {RegisterFormik.errors.email}
                </p>
              )}
            </div>

       
            <div>
              <label className="block text-white/90 text-sm font-medium mb-3">Şifre</label>
              <input
                type="password"
                name="password"
                placeholder="En az 8 karakter"
                {...RegisterFormik.getFieldProps("password")}
                className={inputClass("password")}
              />
              {RegisterFormik.touched.password && RegisterFormik.errors.password && (
                <p className="text-rose-200 text-xs mt-2 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {RegisterFormik.errors.password}
                </p>
              )}
            </div>

        
            <div>
              <label className="block text-white/90 text-sm font-medium mb-3">Şifre Tekrar</label>
              <input
                type="password"
                name="passwordagain"
                placeholder="Şifrenizi tekrar girin"
                {...RegisterFormik.getFieldProps("passwordagain")}
                className={inputClass("passwordagain")}
              />
              {RegisterFormik.touched.passwordagain && RegisterFormik.errors.passwordagain && (
                <p className="text-rose-200 text-xs mt-2 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {RegisterFormik.errors.passwordagain}
                </p>
              )}
            </div>
          </div>

      
          <button
            type="submit"
            disabled={RegisterFormik.isSubmitting}
            className="w-full mt-8 py-4 px-6 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/30 rounded-xl text-white font-semibold text-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
          >
            {RegisterFormik.isSubmitting ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Kayıt Yapılıyor...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Kayıt Ol
              </>
            )}
          </button>

      
          <div className="mt-6 text-center">
            <p className="text-white/70 text-sm">
              Zaten hesabınız var mı?{" "}
              <a href="/login" className="text-white font-semibold hover:text-white/90 underline transition-colors">
                Giriş Yapın
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterClient;