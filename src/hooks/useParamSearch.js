import { useLocation, useHistory } from 'react-router-dom';

const useParamSearch = (paramName) => {
	const location = useLocation();
	const history = useHistory();
	const urlParams = new URLSearchParams(location.search);

	const setValue = (value) => {
		if (!value) {
			urlParams.delete(paramName);
		} else if (urlParams.has(paramName)) {
			urlParams.set(paramName, value);
		} else {
			urlParams.append(paramName, value);
		}

		history.replace({
			...location,
			search: decodeURIComponent(urlParams.toString()),
		});

		return urlParams;
	};

	const getValue = () => urlParams.get(paramName) || '';

	return [getValue, setValue];
};

export default useParamSearch;
