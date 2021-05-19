import { useQuery } from 'react-query';
import api from 'services/api';

const getApplication = async (applicationId) => {
	const data = await api.getSingle('application', applicationId);
	return data;
};

export default function useApplication(applicationId) {
	return useQuery(['application', applicationId], () => getApplication(applicationId));
}
