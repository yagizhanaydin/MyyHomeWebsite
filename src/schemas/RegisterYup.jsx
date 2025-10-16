import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email("Lütfen geçerli bir e-posta giriniz")
    .required("Email boş bırakılamaz"),
  password: Yup.string()
    .min(5, "Şifre en az 5 karakter olmalı")
    .max(11, "Şifre en fazla 11 karakter olabilir")
    .required("Şifre giriniz"),
  passwordagain: Yup.string()
    .oneOf([Yup.ref("password"), null], "Şifreler aynı olmalı")
    .required("Şifreyi tekrar giriniz"),
});

export default RegisterSchema;
