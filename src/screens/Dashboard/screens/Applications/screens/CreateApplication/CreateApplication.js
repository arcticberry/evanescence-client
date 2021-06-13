import React, {lazy, Suspense} from 'react'
import {connect} from 'react-redux'
import {Redirect, Route, Switch} from 'react-router-dom'
import {Formik} from 'formik'
import {isEqual} from 'lodash'

import r from 'constants/routes'

import Loading from 'components/LoadingState'
import {RenderRoutes} from 'components/AppRouter'

import {useDashboard} from 'hooks/useDashboard'
import useCreateApplicationMutation from 'hooks/queries/useCreateApplicationMutation'

import AuthenticatedHoc from 'HOC/WithAuthenticated'
import WithBreadcrumbs from 'HOC/WithBreadcrumbs'

import {fetchServices} from 'services/application/service.slice'

const NotFound = lazy(() => import('screens/NotFound'))

const routes = [
  r.ADD_APPLICATION_NAME,
  r.PICK_APPLICATION_SERVICES,
  r.APP_CREATION_SUCCESS,
]

const transformServices = (services) =>
  Object.keys(services).map((serviceId) => ({
    serviceId: serviceId,
    vendors: services[serviceId],
  }))

const initialFormState = {
  name: 'Chrysamenthum',
  services: {},
}

const CreateApplication = ({match: {path}, breadcrumbs, history}) => {
  const [
    doCreateApplication,
    applicationCreationState,
  ] = useCreateApplicationMutation()
  const [dashboard, setDashboardState] = useDashboard()

  React.useEffect(() => {
    if (!isEqual(breadcrumbs, dashboard.breadcrumbs)) {
      setDashboardState({breadcrumbs})
    }
  }, [dashboard.breadcrumbs, setDashboardState, breadcrumbs])

  React.useEffect(() => {
    if (applicationCreationState.isSuccess)
      history.push(r.APP_CREATION_SUCCESS.path)
  }, [history, applicationCreationState.isSuccess])

  React.useEffect(() => {
    setDashboardState({
      isCreatingApplication: applicationCreationState.isLoading,
    })
  }, [applicationCreationState.isLoading, setDashboardState])

  const handleFormSubmit = (values) => {
    const {name: label, services} = values
    const payload = {
      label,
      services: transformServices(services),
    }

    doCreateApplication(payload)
  }

  return (
    <>
      <Formik initialValues={initialFormState} onSubmit={handleFormSubmit}>
        {({handleSubmit}) => (
          <Suspense fallback={<Loading />}>
            <Switch>
              <>
                <form onSubmit={handleSubmit}>
                  <RenderRoutes routes={routes} />
                </form>
              </>
              <Route component={NotFound} />
              <Redirect to="/dashboard" />
            </Switch>
          </Suspense>
        )}
      </Formik>
    </>
  )
}

const mapStateToProps = ({service}) => {
  return {
    services: service.services,
  }
}

const mapDispatchToProps = {fetchServices}

export default AuthenticatedHoc(
  WithBreadcrumbs(routes)(
    connect(mapStateToProps, mapDispatchToProps)(CreateApplication),
  ),
)
