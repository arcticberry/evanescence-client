import { useMutation } from 'react-query';
import api from 'services/api';

export default function usePasswordReset() {
	const resetPasswordRequest = (payload) => api.post('/auth/reset-password', payload);
	const { mutate, ...mutationState } = useMutation(resetPasswordRequest);

	return [mutate, mutationState];
}
