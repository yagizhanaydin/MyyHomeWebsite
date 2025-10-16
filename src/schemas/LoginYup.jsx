import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Geçersiz e-posta formatı")
    .required("Email alanı zorunludur"),
  password: Yup.string()
    .required("Şifre alanı zorunludur"),
});

export default LoginSchema;
