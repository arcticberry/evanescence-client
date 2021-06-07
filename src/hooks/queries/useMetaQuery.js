import { useQuery } from 'react-query';
import api from 'services/api';

const getMeta = async (queryParams) => {
	const response = await api.getAll(`settings/${queryParams}`);
	return response.data;
};

export default function useMeta(queryParams) {
	return useQuery(['meta', queryParams], () => getMeta(queryParams));
}
