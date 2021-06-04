import { useState } from 'react';

import { AUTH_TOKEN_IDENTIFIER } from 'constants';

const useAuthToken = () => {
	const getToken = () => {
		const tokenString = localStorage.getItem(AUTH_TOKEN_IDENTIFIER);
		return JSON.parse(tokenString)?.token;
	};

	const saveToken = (token) => {
		localStorage.setItem(AUTH_TOKEN_IDENTIFIER, JSON.stringify({ token }));
		setToken(token);
	};

	const [token, setToken] = useState(getToken());

	return {
		token,
		setToken: saveToken,
	};
};

export default useAuthToken;
