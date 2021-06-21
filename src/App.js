import React from 'react'
import {connect} from 'react-redux'
import {ToastContainer} from 'react-toastify'
import {QueryClientProvider, QueryClient} from 'react-query'
import {ToastProvider} from '@zendeskgarden/react-notifications'

import themeCreator from 'config/theme'
import {AppRouter} from 'components/AppRouter'
import {ThemeProvider, DEFAULT_THEME} from '@zendeskgarden/react-theming'

import 'react-toastify/dist/ReactToastify.css'

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })
  const topProps = {
    style: {top: DEFAULT_THEME.space.base * 3},
  }
  const bottomProps = {
    style: {bottom: DEFAULT_THEME.space.base * 3},
  }
  const placementProps = {
    'top-start': topProps,
    top: topProps,
    'top-end': topProps,
    'bottom-start': bottomProps,
    bottom: bottomProps,
    'bottom-end': bottomProps,
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider focusVisibleRef={null} theme={themeCreator(DEFAULT_THEME)}>
        <ToastProvider placementProps={placementProps} zIndex={1}>
          <AppRouter />
        </ToastProvider>
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
  )
}

const mapDispatchToProps = (dispatch) => ({})
export default connect(null, mapDispatchToProps)(App)
