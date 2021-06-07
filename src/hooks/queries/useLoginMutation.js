import { useMutation } from 'react-query';
import api from 'services/api';

const loginRequest = (payload) => api.post('/auth/login', payload);

export default function useLogin() {
	const { mutate, ...mutationState } = useMutation(loginRequest);

	return [mutate, mutationState];
}
