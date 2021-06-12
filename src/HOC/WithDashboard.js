import React from 'react'
const {DashboardProvider} = require('hooks/useDashboard')

const WithDashboardHOC = (Component) => (props) => (
  <DashboardProvider>
    <Component {...props} />
  </DashboardProvider>
)

export default WithDashboardHOC
