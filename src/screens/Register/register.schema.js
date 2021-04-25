import * as Yup from 'yup';

const RegistrationSchema = Yup.object().shape({
	businessName: Yup.string().required('Please add a business name'),
	email: Yup.string().email('Please add a valid email').required('Please add an email'),
	phone: Yup.number().required('Please add a phone number'),
	password: Yup.string().min(6).required('Please add a password'),
});

export default RegistrationSchema;
