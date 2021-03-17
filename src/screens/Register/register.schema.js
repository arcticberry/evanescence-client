import * as Yup from "yup";

const RegistrationSchema = Yup.object().shape({
  businessName: Yup.string().required("Business Name Is Required"),
  email: Yup.string().email("Invalid email").required("Email Is Required"),
  phone: Yup.number().required("Phone Number Is Required"),
  password: Yup.string().min(6).required("Password Is Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords don't match")
    .required("Password Is Required"),
});

export default RegistrationSchema;
