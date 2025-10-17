import * as Yup from "yup";

const AddSchemaYup = Yup.object().shape({
  il: Yup.string().required("İl zorunludur"),
  ilce: Yup.string().required("İlçe zorunludur"),
  adres: Yup.string().required("Adres zorunludur"),
  odaSayisi: Yup.string().required("Oda sayısı zorunludur"),
  brutMetrekare: Yup.number().required("Brüt metrekare zorunludur"),
  netMetrekare: Yup.number().required("Net metrekare zorunludur"),
  fiyat: Yup.number().required("Fiyat zorunludur"),
  aciklama: Yup.string().required("Açıklama zorunludur"),
});

export default AddSchemaYup;
