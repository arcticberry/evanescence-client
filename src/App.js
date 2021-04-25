import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DefaultTheme } from 'styled-components';

import { ToastContainer } from "react-toastify";
import { QueryClientProvider, QueryClient } from "react-query";
import { fetchMetaData } from "services/core/core.slice";
import { AppRouter } from "components/AppRouter";
import { ThemeProvider, DEFAULT_THEME  } from '@zendeskgarden/react-theming';

import "react-toastify/dist/ReactToastify.css";

const brand = {
  700: '#00B4D8',
}

const theme = (parentTheme) => ({
  ...parentTheme,
  palette: {
    ...parentTheme.palette,
    brand
  },
  borderRadii: {
    ...parentTheme.borderRadii,
    md: '0'
  },
  colors: {
    ...parentTheme.colors,
    primaryHue: 'brand'
  }
});

function App({ fetchMetaData }) {
  const queryClient = new QueryClient();

  useEffect(() => 
    fetchMetaData()
  , []);

  return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider focusVisibleRef={null} theme={theme(DEFAULT_THEME)}>
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
