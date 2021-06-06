import { useMutation } from 'react-query';
import api from 'services/api';

export default function usePasswordResetLink() {
	const { mutate, ...mutation } = useMutation((payload) => api.post('/auth/forgot-password', payload));

	return [mutate, mutation];
}
