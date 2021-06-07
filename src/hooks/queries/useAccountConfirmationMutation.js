import { useMutation } from 'react-query';
import api from 'services/api';

const accountConfirmationRequest = (payload) => api.post('/auth/confirm-account', payload);

export default function useAccountConfirmationMutation() {
	const { mutate, ...mutationState } = useMutation(accountConfirmationRequest);

	return [mutate, mutationState];
}
