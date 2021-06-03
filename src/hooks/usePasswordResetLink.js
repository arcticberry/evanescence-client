import React from 'react';
import api from 'services/api';

export default function usePasswordReset() {
	const [state, setState] = React.useReducer((_, action) => action, {
		isIdle: true,
	});

	const mutate = React.useCallback(async (payload) => {
		setState({ isLoading: true });

		try {
			const data = await api.post('/auth/forgot-password', payload);

			setState({ isSuccess: true, data });
		} catch (error) {
			setState({ isError: true, error });
		}
	}, []);

	return [mutate, state];
}
