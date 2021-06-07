import { useQuery } from 'react-query';
import api from 'services/api';

const getApplications = async (queryParams) => {
	const data = await api.getAll(`applications/${queryParams}`);
	return data;
};

export default function useApplications(queryParams) {
	return useQuery(['applications', queryParams], () => getApplications(queryParams));
}
