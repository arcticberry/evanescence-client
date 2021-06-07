import { useMutation } from 'react-query';
import api from 'services/api';

export default function usePasswordResetLink() {
	const resetPasswordLinkRequest = (payload) => api.post('/auth/reset-password', payload);
	const { mutate, ...mutationState } = useMutation(resetPasswordLinkRequest);

	return [mutate, mutationState];
}
