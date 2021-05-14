import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ToastContainer } from 'react-toastify';
import { QueryClientProvider, QueryClient } from 'react-query';

import themeCreator from 'config/theme';
import { fetchMetaData } from 'services/core/core.slice';
import { AppRouter } from 'components/AppRouter';
import { ThemeProvider, DEFAULT_THEME } from '@zendeskgarden/react-theming';

import 'react-toastify/dist/ReactToastify.css';

function App({ fetchMetaData }) {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
			},
		},
	});

	useEffect(() => {
		fetchMetaData();
	}, [fetchMetaData]);

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider focusVisibleRef={null} theme={themeCreator(DEFAULT_THEME)}>
				<AppRouter />
			</ThemeProvider>

			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar
				newestOnTop={false}
				closeOnClickgit
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</QueryClientProvider>
	);
}

const mapDispatchToProps = (dispatch) => ({
	fetchMetaData: bindActionCreators(fetchMetaData, dispatch),
});
export default connect(null, mapDispatchToProps)(App);
