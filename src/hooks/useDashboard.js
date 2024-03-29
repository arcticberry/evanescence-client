import React from 'react'

const DashboardContext = React.createContext()
const initialState = {
  isSidebarOpen: false,
  navItems: {},
  breadcrumbs: [],
  defaultApplication: null,
  isCreatingApplication: false,
  isUpdatingApplication: false,
  successFullyUpdatedApplication: false,
  isUpdatingApplicationCredentials: false,
  successFullyUpdatedApplicationCredentials: {status: false, message: ''},
  errorUpdatingApplicationCredentials: {status: false, message: ''},
  isUpdatingApplicationWebhook: false,
  successFullyUpdatedApplicationWebhook: {status: false, message: ''},
}

function dashboardReducer(state, action) {
  return {
    ...state,
    ...action,
  }
}

function DashboardProvider({children}) {
  const [state, dispatch] = React.useReducer(dashboardReducer, initialState)

  const value = {state, dispatch}

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  )
}

function useDashboard() {
  const context = React.useContext(DashboardContext)

  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider')
  }

  return [context.state, context.dispatch]
}
export {DashboardProvider, useDashboard}
