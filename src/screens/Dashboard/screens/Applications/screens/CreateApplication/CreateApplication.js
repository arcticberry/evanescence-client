import React, {lazy, Suspense} from 'react'
import {connect} from 'react-redux'
import {Redirect, Route, Switch} from 'react-router-dom'
import {useMutation} from 'react-query'
import {Formik} from 'formik'
import r from 'constants/routes'

import {useDashboard} from 'hooks/useDashboard'

import AuthenticatedHoc from 'HOC/WithAuthenticated'
import WithBreadcrumbs from 'HOC/WithBreadcrumbs'

import api from 'services/api'
import {fetchServices} from 'services/application/service.slice'

import Loading from 'components/LoadingState'
import {RenderRoutes} from 'components/AppRouter'
import {isEqual} from 'lodash'

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

const CreateApplication = ({match: {path}, breadcrumbs, history}) => {
  const [dashboard, setDashboardState] = useDashboard()

  React.useEffect(() => {
    if (!isEqual(breadcrumbs, dashboard.breadcrumbs)) {
      setDashboardState({breadcrumbs})
    }
  }, [dashboard.breadcrumbs, setDashboardState, breadcrumbs])

  const formValues = {
    name: 'John Newton',
    services: {},
  }

  const applicationCreationRequest = async (payload) =>
    api.post('applications', payload)

  const mutation = useMutation(applicationCreationRequest, {
    onSuccess: async () => {
      history.push(`${path}/success`)
    },
  })

  const handleFormSubmit = (values) => {
    const {name: label, services} = values
    const payload = {
      label,
      services: transformServices(services),
    }

    mutation.mutate(payload)
  }

  return (
    <>
      <Formik initialValues={formValues} onSubmit={handleFormSubmit}>
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
