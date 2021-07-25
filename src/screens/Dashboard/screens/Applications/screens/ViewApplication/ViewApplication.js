import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Formik} from 'formik'

import Button from 'components/Button'
import LoadingState from 'components/LoadingState'
import CalloutCard from 'components/Card/CalloutCard'
import ManageServices from './components/ManageServices'
import ManageCredentials from './components/ManageCredentials'
import ErrorLoading from 'components/ErrorLoading'

import AuthenticatedHoc from 'HOC/WithAuthenticated'
import {useDashboard} from 'hooks/useDashboard'
import useParamSearch from 'hooks/useParamSearch'
import useApplicationsQuery from 'hooks/queries/useApplicationsQuery'
import useUpdateApplicationMutation from 'hooks/queries/useUpdateApplicationMutation'
import useUpdateApplicationCredentialsMutation from 'hooks/queries/useUpdateApplicationCredentialsMutation'

import RecentTransactions from './components/RecentTransactions'
import makeData from 'utils/makeData'
import tableSchema from './tableSchema'
import {setSelectedApplication} from 'services/application/application.slice'
import '../../applications.css'

const initialFormState = {
  services: {},
  dirty: false,
}

const initialCredentialsForm = {
  dirty: false,
}

const ViewApplication = ({match}) => {
  const {
    isLoading: isLoadingApplication,
    isError,
    data: applicationData,
  } = useApplicationsQuery(match.params.id)
  const [
    doUpdateApplication,
    applicationUpdateState,
  ] = useUpdateApplicationMutation(match.params.id)
  const [
    doUpdateApplicationCredentials,
    applicationCredentialsUpdateState,
  ] = useUpdateApplicationCredentialsMutation(match.params.id)

  const [, setDashboardState] = useDashboard()

  const [getPageParamValue, setPageParamValue] = useParamSearch('page')
  const [getPageSizeParamValue, setPageSizeParamValue] = useParamSearch(
    'pageSize',
  )

  const data = React.useMemo(() => makeData(100), [])

  React.useEffect(() => {
    setDashboardState({
      isUpdatingApplication: applicationUpdateState.isLoading,
    })
  }, [applicationUpdateState.isLoading, setDashboardState])

  React.useEffect(() => {
    setDashboardState({
      successFullyUpdatedApplication: applicationUpdateState.isSuccess,
    })
  }, [applicationUpdateState.isSuccess, setDashboardState])

  React.useEffect(() => {
    setDashboardState({
      isUpdatingApplicationCredentials:
        applicationCredentialsUpdateState.isLoading,
    })
  }, [applicationCredentialsUpdateState.isLoading, setDashboardState])

  React.useEffect(() => {
    setDashboardState({
      successFullyUpdatedApplicationCredentials:
        applicationCredentialsUpdateState.isSuccess,
    })
  }, [applicationCredentialsUpdateState.isSuccess, setDashboardState])

  if (isLoadingApplication)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoadingState />
      </div>
    )

  if (isError)
    return (
      <ErrorLoading
        title="Oops..."
        message="Something unexpected happened. Please retry."
      />
    )

  const {services, vendors} = applicationData.entities
  const pageParamValue = getPageParamValue()
  const pageSizeParamValue = getPageSizeParamValue()

  const defaultTableOptions = {
    ...(pageParamValue && {defaultPageIndex: Number(pageParamValue - 1)}),
    ...(pageSizeParamValue && {defaultPageSize: Number(pageSizeParamValue)}),
  }

  const handleCredentialsFormSubmit = (values) => {
    const excludedFields = ['dirty']
    const isNotExcluded = (key) => !excludedFields.includes(key)

    const payloadReducer = (acc, curr) => {
      const currentValue = values[curr]
      const [provider, field] = curr.split('-')

      return {
        ...acc,
        [provider]: {
          ...acc[provider],
          ...(currentValue.length ? {[field]: currentValue} : {}),
        },
      }
    }

    const payload = Object.keys(values)
      .filter(isNotExcluded)
      .reduce(payloadReducer, {})

    doUpdateApplicationCredentials(payload)
  }

  const handleFormSubmit = (values) => {
    const transformServices = (selectedServices, services) =>
      Object.keys(selectedServices)
        .filter((serviceId) => selectedServices[serviceId].length)
        .map((serviceId) => {
          const vendorId = selectedServices[serviceId][0]

          const isSameService = (vendorId) =>
            services[serviceId].vendors.includes(vendorId)
          const isNotActiveVendor = (vId) => vendorId !== vId

          const inactiveVendors = services[serviceId].vendors
            .filter(isSameService)
            .filter(isNotActiveVendor)

          return {
            serviceId,
            vendors: [
              {
                isActive: true,
                vendorId,
              },
              ...inactiveVendors.map((vendorId) => ({
                isActive: false,
                vendorId,
              })),
            ],
          }
        })

    doUpdateApplication({
      services: transformServices(values.services, services),
    })
  }

  return (
    <>
      <section className="h-32">
        <CalloutCard variant="mu">
          <div className="px-4 md:px-16 lg:px-24 pb-8 flex flex-col md:flex-row items-center justify-between text-gray-100">
            <span className="mb-2">
              You can switch between your apps easily
            </span>
            <Link to="/dashboard/applications">
              <Button>Switch application</Button>
            </Link>
          </div>
        </CalloutCard>
      </section>

      <Formik
        initialValues={initialCredentialsForm}
        onSubmit={handleCredentialsFormSubmit}
      >
        {({handleSubmit, handleReset}) => (
          <form onSubmit={handleSubmit}>
            <ManageCredentials
              applicationId={match.params.id}
              handleReset={handleReset}
            />
          </form>
        )}
      </Formik>

      <Formik initialValues={initialFormState} onSubmit={handleFormSubmit}>
        {({handleSubmit}) => (
          <form onSubmit={handleSubmit}>
            <ManageServices services={services} vendors={vendors} />
          </form>
        )}
      </Formik>

      <RecentTransactions
        data={data}
        schema={tableSchema()}
        onPageNavigation={setPageParamValue}
        onPageSizeUpdate={setPageSizeParamValue}
        {...defaultTableOptions}
      />
    </>
  )
}
const mapStateToProps = ({application: {selectedApplication}}) => ({
  selectedApplication,
})

const mapDispatchToProps = {setSelectedApplication}
export default AuthenticatedHoc(
  connect(mapStateToProps, mapDispatchToProps)(ViewApplication),
)
