import React, {lazy, Suspense} from 'react'
import {connect} from 'react-redux'
import {Redirect, Route, Switch} from 'react-router-dom'
import {useMutation} from 'react-query'
import {Formik} from 'formik'
import {isEqual} from 'lodash'

import r from 'constants/routes'

import Loading from 'components/LoadingState'
import {RenderRoutes} from 'components/AppRouter'

import {useDashboard} from 'hooks/useDashboard'
import useCreateApplicationMutation from 'hooks/queries/useCreateApplicationMutation'

import AuthenticatedHoc from 'HOC/WithAuthenticated'
import WithBreadcrumbs from 'HOC/WithBreadcrumbs'

import api from 'services/api'
import {fetchServices} from 'services/application/service.slice'

const NotFound = lazy(() => import('screens/NotFound'))

const routes = [
  r.ADD_APPLICATION_NAME,
  r.PICK_APPLICATION_SERVICES,
  r.APP_CREATION_SUCCESS,
]

const transformServices = (services) =>
  Object.keys(services).map((serviceId) => ({
    service_id: serviceId,
    vendors: services[serviceId],
  }))

const initialFormState = {
  name: 'John Newton',
  services: {},
}

const CreateApplication = ({match: {path}, breadcrumbs, history}) => {
  const [dashboard, setDashboardState] = useDashboard()
  const [
    doCreateApplication,
    applicationCreationState,
  ] = useCreateApplicationMutation()

  React.useEffect(() => {
    if (!isEqual(breadcrumbs, dashboard.breadcrumbs)) {
      setDashboardState({breadcrumbs})
    }
  }, [dashboard.breadcrumbs, setDashboardState, breadcrumbs])

  React.useEffect(() => {
    if (applicationCreationState.isSuccess) history.push(r.APP_CREATION_SUCCESS)
  }, [history, applicationCreationState.isSuccess])

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
