import * as Yup from "yup";

const ApplicationSchema = Yup.object().shape({
  applicationName: Yup.string().required("Application Name Is Required"),
});

export default ApplicationSchema;
