import { useMutation } from 'react-query';
import api from 'services/api';

export default function useCreateUserQuery() {
	const request = (payload) => api.post('/auth/register', payload);
	const { mutate, ...mutationState } = useMutation(request);

	return [mutate, mutationState];
}
