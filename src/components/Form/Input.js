import React from 'react';
import { Field } from 'formik';

import { InputGroup, Input } from '@zendeskgarden/react-forms';
import { Label } from './';

const TelephoneInput = ({ name, label, ...props }) => {
	return (
		<>
			<Label label={label} name={name} />
			<Field name={name}>
				{({ field }) => (
					<InputGroup>
						<Input {...field} id={name} {...props} />
					</InputGroup>
				)}
			</Field>
		</>
	);
};

TelephoneInput.propTypes = {};
TelephoneInput.defaultProps = {
	type: 'text',
};

export default TelephoneInput;
