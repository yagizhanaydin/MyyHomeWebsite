import * as Yup from "yup";

const AddSchemaYup = Yup.object().shape({
  aciklama: Yup.string()
    .trim()
    .min(5, "Açıklama en az 5 karakter olmalı")
    .required("Lütfen bir açıklama yazınız"),

  fiyat: Yup.number()
    .typeError("Fiyat bir sayı olmalı")
    .positive("Fiyat pozitif olmalı")
    .required("Lütfen bir fiyat yazınız"),
});

export default AddSchemaYup;
