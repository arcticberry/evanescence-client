import React from 'react';
import { Field, Form, Formik } from 'formik';

import { Label } from '@zendeskgarden/react-forms';
import { Button } from '@zendeskgarden/react-buttons';

import { Link } from 'react-router-dom';
import Logo from 'components/Logo/Logo';
import { loginUser } from 'services/login/login.slice';
import { connect } from 'react-redux';
import { PasswordInput, Input } from 'components/Form';

const Login = ({ loginUser, history }) => {
	const loginDetails = {
		uid: '',
		password: '',
	};

	const handleFormSubmission = async (values) => {
		await loginUser(values, history);
	};

	return (
		<div className="grid md:grid-cols-2">
			<section className="md:h-screen" style={{ backgroundImage: 'url(/img/account-page-bg.png)' }}></section>

			<section className="md:h-screen flex flex-col justify-center p-16 md:px-48">
				<a href="/" className="w-48">
					<Logo variant="primary" />
				</a>
				<div className="">
					<h1 className="text-3xl py-16 font-light">Log In</h1>
					<Formik initialValues={loginDetails} onSubmit={async (values) => handleFormSubmission(values)}>
						<Form action="#">
							<div className="mb-8">
								<Label>Email</Label>
								<Input name={'uid'} type="email" />
							</div>

							<div>
								<section className="mb-4">
									<Label>Password</Label>
									<a href="/" className="float-right font-bold text-brand-primary">
										<small>Forgot your password?</small>
									</a>
								</section>

								<PasswordInput name="password" />
							</div>

							<div className="form-group">
								<div className="input-group input-group-merge">
									<div className="input-group-append" data-password="false">
										<div className="input-group-text">
											<span className="password-eye"></span>
										</div>
									</div>
								</div>
							</div>

							<div className="mt-16 mb-8">
								<Button isStretched isPrimary>
									Log In
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

const mapDispatchToProps = { loginUser };

export default connect(null, mapDispatchToProps)(Login);
