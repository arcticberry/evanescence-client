import React from 'react';

export { default as PasswordInput } from './Password';
export { default as Input } from './Input';
export { default as TelephoneInput } from './Telephone';

export const Label = ({ label, name }) => (
	<>
		{label ? (
			<label htmlFor={name} className="text-gray-500 mb-2 inline-block">
				{label}
			</label>
		) : null}
	</>
);
