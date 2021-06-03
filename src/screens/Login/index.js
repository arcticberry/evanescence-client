import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Formik } from 'formik';

import Button from 'components/Button';
import { Spinner } from '@zendeskgarden/react-loaders';

import Logo from 'components/Logo/Logo';
import { PasswordInput, Input } from 'components/Form';
import { loginUser } from 'services/login/login.slice';

const Login = ({ loginUser, isPerformingLogin, history }) => {
	const loginDetails = {
		uid: '',
		password: '',
	};

	const handleFormSubmission = async (values) => {
		await loginUser(values, history);
	};

	return (
		<div className="grid md:grid-cols-2">
			<section
				className="hidden md:block md:h-screen"
				style={{ backgroundImage: 'url(/img/account-page-bg.png)' }}
			></section>

			<section className="md:h-screen flex flex-col justify-center py-16 px-8 md:px-16 lg:px-48">
				<a href="/" className="w-48">
					<Logo variant="primary" />
				</a>
				<div>
					<h1 className="text-3xl py-16 font-light">Log In</h1>
					<Formik initialValues={loginDetails} onSubmit={handleFormSubmission}>
						<Form action="/">
							<div className="mb-8">
								<Input label="Email" name={'uid'} type="email" required />
							</div>

							<div>
								<section className="mb-4">
									<label className="text-gray-500">Password</label>
									<a href="/" className="float-right font-bold text-brand-primary">
										<small>Forgot your password?</small>
									</a>
								</section>

								<PasswordInput name="password" required />
							</div>

							<div className="my-8">
								<Button isStretched variant="primary" type="submit">
									{isPerformingLogin ? <Spinner delayMS={0} size={32} /> : 'Log In'}
								</Button>
							</div>
						</Form>
					</Formik>
					<div className="col-12 text-center">
						<p className="text-muted text-left">
							Don't have an account?{' '}
							<Link to="/register" className="text-brand-primary ml-1">
								<b>Sign Up</b>
							</Link>
						</p>
					</div>
				</div>
			</section>
		</div>
	);
};

const mapStateToProps = ({ login }) => {
	const { isPerformingLogin } = login;

	return {
		isPerformingLogin,
	};
};

const mapDispatchToProps = { loginUser };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
