import React, {useEffect, Suspense, lazy} from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import Breadcrumb from 'components/Breadcrumb'
import Loading from 'components/LoadingState'
import {RenderRoutes} from 'components/AppRouter'

import AuthenticatedHoc from 'HOC/WithAuthenticated'
import WithBreadcrumbs from 'HOC/WithBreadcrumbs'
import WithDashboardHOC from 'HOC/WithDashboard'

import {useDashboard} from 'hooks/useDashboard'
import useApplicationsQuery from 'hooks/queries/useApplicationsQuery'

import Sidebar from 'screens/Dashboard/components/Sidebar'
import Header from 'screens/Dashboard/components/Header'
import './dashboard.scss'
import r from 'constants/routes'
import navItems, {settings} from 'constants/nav'

import {removeStoredAuthToken} from 'utils/authToken'

const routes = [
  r.CREATE_APPLICATION,
  r.APPLICATIONS_LIST,
  r.VIEW_APPLICATION,
  r.WEBHOOKS,
]

const Dashboard = ({breadcrumbs, history, location}) => {
  const [dashboard, setDashboardState] = useDashboard()
  const fetchDefaultApp = useApplicationsQuery('default')

  React.useEffect(() => {
    setDashboardState({
      breadcrumbs,
      navItems,
    })
  }, [setDashboardState, breadcrumbs])

  useEffect(() => {
    if (fetchDefaultApp.isSuccess) {
      setDashboardState({defaultApp: fetchDefaultApp.data.payload.appid})
    }
  }, [fetchDefaultApp.data, fetchDefaultApp.isSuccess, setDashboardState])

  const NotFound = lazy(() => import('screens/NotFound'))
  const handleLogout = () => {
    removeStoredAuthToken()
    history.push(r.LOGIN.path)
  }
  const handleMenuToggle = () =>
    setDashboardState({isSidebarOpen: !dashboard.isSidebarOpen})

  const appSettings = settings.map((setting) => ({
    ...setting,
    appId: dashboard.defaultApp,
  }))
  let updatedNavItems = {
    ...dashboard.navItems,
    ...(dashboard.defaultApp ? {settings: appSettings} : {}),
  }

  return (
    <div
      className={`dashboard ${
        dashboard.isSidebarOpen ? 'has-sidebar-open' : ''
      }`}
      id="wrapper"
    >
      <section className="h-full w-full">
        <Header onToggleMenu={handleMenuToggle}>
          <Breadcrumb items={dashboard.breadcrumbs} />
        </Header>
        <Sidebar
          currentItemPath={location.pathname}
          isVisible={dashboard.isSidebarOpen}
          isExpanded
          onToggleMenu={handleMenuToggle}
          onLogout={handleLogout}
          items={updatedNavItems}
        />

        <Suspense fallback={<Loading />}>
          <Switch>
            <Redirect
              exact
              from={r.DASHBOARD.path}
              to={r.APPLICATIONS_LIST.path}
            />

            <RenderRoutes routes={routes} />

            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </section>
    </div>
  )
}

export default WithDashboardHOC(
  WithBreadcrumbs(routes)(AuthenticatedHoc(Dashboard)),
)
