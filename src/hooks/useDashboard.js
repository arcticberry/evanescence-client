import React from 'react'

const DashboardContext = React.createContext()
const initialState = {
  isSidebarOpen: false,
  breadcrumbs: [],
  isCreatingApplication: false,
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
