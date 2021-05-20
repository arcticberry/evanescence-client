import React from 'react';
import { Field } from 'formik';

import { InputGroup, Input } from '@zendeskgarden/react-forms';
import Button from 'components/Button';

import { Label } from './';

const Password = ({ name, label, ...props }) => {
	const [isPasswordVisible, setPasswordVisibility] = React.useState(false);

	const togglePasswordVisibility = () => setPasswordVisibility(!isPasswordVisible);

	return (
		<>
			<Label label={label} name={name} />

			<Field name={name}>
				{({ field }) => (
					<InputGroup>
						<Input {...field} {...props} type={isPasswordVisible ? 'text' : 'password'} />
						{field.value.length ? (
							<Button type="button" onClick={togglePasswordVisibility}>
								{isPasswordVisible ? 'Hide' : 'Show'}
							</Button>
						) : null}
					</InputGroup>
				)}
			</Field>
		</>
	);
};

Password.propTypes = {};

export default Password;
