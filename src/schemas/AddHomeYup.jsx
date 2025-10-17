import * as Yup from "yup";

const AddSchemaYup = Yup.object().shape({
  il: Yup.string().required("İl zorunludur"),
  ilce: Yup.string().required("İlçe zorunludur"),
  adres: Yup.string().required("Adres zorunludur"),
  odaSayisi: Yup.string().required("Oda sayısı zorunludur"),
  metrekare: Yup.number().required("Metrekare zorunludur"),
  fiyat: Yup.number().required("Fiyat zorunludur"),
  aciklama: Yup.string().required("Açıklama zorunludur"),
});

export default AddSchemaYup;
