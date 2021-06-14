import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { Spinner } from '@zendeskgarden/react-loaders';
import { toast } from 'react-toastify';

import Button from 'components/Button';
import Logo from 'components/Logo/Logo';
import Icon from 'components/Icon';
import { PasswordInput, Input, TelephoneInput } from 'components/Form';

import useMetaQuery from 'hooks/queries/useMetaQuery';
import useCreateUserMutation from 'hooks/queries/useCreateUserMutation';

import RegistrationSchema from './register.schema';

import r from 'constants/routes';

const initialFormState = {
	firstName: 'John',
	lastName: 'Flanagan',
	password: '',
	email: '',
	businessName: '',
	phone: '',
	isSoftwareDev: false,
};

const Register = ({ history }) => {
	const countriesQuery = useMetaQuery('countries');
	const [doCreateUser, createUserState] = useCreateUserMutation('countries');
	const [countryId, setCountryId] = useState();

	useEffect(() => {
		if (countriesQuery.isSuccess) {
			const { _id } = countriesQuery.data.find(({ name }) => name === 'Nigeria');

			setCountryId(_id);
		}
	}, [countriesQuery.data, countriesQuery.isSuccess, setCountryId]);

	useEffect(() => {
		if (createUserState.isError) {
			toast.error(createUserState.error.response.data.message);
		} else if (createUserState.isSuccess) {
			toast.success('Successfully created account. Please login.');
			history.push(r.LOGIN.path);
		}
	}, [createUserState.isError, createUserState.isSuccess, createUserState.error, history]);

	let codes = countriesQuery.isSuccess
		? countriesQuery.data.filter(({ name }) => name === 'Nigeria').map(({ code }) => code)
		: [];

	const handleFormSubmission = async (values) => {
		await doCreateUser({ ...values, phonePrefixId: countryId, countryId });
	};

	return (
		<div className="grid grid-cols-1 md:grid-cols-2">
			<section
				className="hidden md:block md:h-screen"
				style={{ backgroundImage: 'url(/img/account-page-bg.png)' }}
			></section>

			<section className="md:h-screen flex flex-col justify-center p-8 md:p-16 lg:px-48">
				<a href="/" className="w-32 md:w-48">
					<Logo variant="primary" />
				</a>
				<div>
					<h1 className="text-3xl py-16 font-light">Sign Up</h1>
					<Formik
						initialValues={initialFormState}
						onSubmit={handleFormSubmission}
						validationSchema={RegistrationSchema}
					>
						{({ errors, touched, setFieldValue, validateForm }) => {
							return (
								<Form action="/">
									<div className="mb-8">
										<Input label="Business Name" name={'businessName'} />

										{errors.businessName && touched.businessName ? (
											<div className="text-red-400 my-1 text-sm">{errors.businessName}</div>
										) : null}
									</div>

									<div className="mb-8">
										<Input name={'email'} label="Email" type="email" />
										{errors.email && touched.email ? (
											<div className="text-red-400 my-1 text-sm">{errors.email}</div>
										) : null}
									</div>

									{countriesQuery.isSuccess ? (
										<div className="mb-8">
											<TelephoneInput
												codes={codes}
												name={'phone'}
												icon={<Icon name="flags/nigeria" />}
												label="Phone Number"
												type="telephone"
											/>
											{errors.phone && touched.phone ? (
												<div className="text-red-400 my-1 text-sm">{errors.phone}</div>
											) : null}
										</div>
									) : null}

									<div>
										<PasswordInput label="Password" name="password" id="password" />
										{errors.password && touched.password ? (
											<div className="text-red-400 my-1 text-sm">{errors.password}</div>
										) : null}
									</div>

									<div className="my-8">
										<Button isStretched variant="primary" type="submit">
											{createUserState.isLoading ? <Spinner size={32} delayMS={0} /> : 'Sign up'}
										</Button>
									</div>
								</Form>
							);
						}}
					</Formik>
					<p className="text-gray-500 text-left">
						Already got an account?
						<Link to="/login" className="text-brand-primary ml-1">
							<b>Login</b>
						</Link>
					</p>
				</div>
			</section>
		</div>
	);
};

export default Register;
