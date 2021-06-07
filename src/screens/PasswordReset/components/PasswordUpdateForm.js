import React from 'react';
import { Form, Formik } from 'formik';
import { Spinner } from '@zendeskgarden/react-loaders';
import { toast } from 'react-toastify';

import Button from 'components/Button';
import { PasswordInput } from 'components/Form';

import usePasswordResetMutation from 'hooks/queries/usePasswordResetMutation';

const PasswordUpdateForm = ({ token }) => {
	const defaults = {
		password: '',
	};

	const [doPasswordReset, passwordResetState] = usePasswordResetMutation();

	React.useEffect(() => {
		if (passwordResetState.isError) {
			toast.error(passwordResetState.error.response.data.message);
		} else if (passwordResetState.isSuccess) {
			toast.success('Successfully reset password. Please login.');
		}
	}, [passwordResetState.isError, passwordResetState.isSuccess, passwordResetState.error]);

	return (
		<Formik initialValues={defaults} onSubmit={(payload) => doPasswordReset({ ...payload, token })}>
			<Form action="/">
				<div>
					<section className="mb-4">
						<label className="text-gray-500">New password</label>
					</section>

					<PasswordInput name="password" required />
				</div>

				<div className="my-8">
					<Button isStretched variant="primary" type="submit">
						{passwordResetState.isLoading ? <Spinner delayMS={0} size={32} /> : 'Reset password'}
					</Button>
				</div>
			</Form>
		</Formik>
	);
};

export default PasswordUpdateForm;
