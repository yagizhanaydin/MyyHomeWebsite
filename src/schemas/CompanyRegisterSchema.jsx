import * as Yup from 'yup';

const CompanyRegisterSchema = Yup.object().shape({
  company_name: Yup.string()
    .required('Şirket adı zorunludur'),
  
  phone_number: Yup.string()
    .matches(/^[0-9]{10,15}$/, 'Geçerli bir telefon numarası girin')
    .required('Telefon numarası zorunludur'),

  password: Yup.string()
    .min(6, 'Şifre en az 6 karakter olmalı')
    .required('Şifre zorunludur'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Şifreler uyuşmuyor')
    .required('Şifre tekrar zorunludur'),
});

export default CompanyRegisterSchema;
