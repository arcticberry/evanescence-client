import { useQuery } from 'react-query';
import api from 'services/api';

const getApplications = async () => {
	const data = await api.getAll('applications');
	return data;
};

export default function useApplications() {
	return useQuery('applications', getApplications);
}
