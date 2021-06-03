import React from 'react';
import { Form, Formik } from 'formik';
import { Spinner } from '@zendeskgarden/react-loaders';

import Button from 'components/Button';
import { PasswordInput } from 'components/Form';

const PasswordUpdateForm = ({ onSubmit, loading }) => {
	const defaults = {
		password: '',
	};

	return (
		<Formik initialValues={defaults} onSubmit={onSubmit}>
			<Form action="/">
				<div>
					<section className="mb-4">
						<label className="text-gray-500">New password</label>
					</section>

					<PasswordInput name="password" required />
				</div>

				<div className="my-8">
					<Button isStretched variant="primary" type="submit">
						{loading ? <Spinner delayMS={0} size={32} /> : 'Reset password'}
					</Button>
				</div>
			</Form>
		</Formik>
	);
};

export default PasswordUpdateForm;
