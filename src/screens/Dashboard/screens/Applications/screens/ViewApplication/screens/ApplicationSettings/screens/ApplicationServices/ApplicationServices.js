import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Formik} from 'formik'

import LoadingState from 'components/LoadingState'
import ErrorLoading from 'components/ErrorLoading'
import ManageServices from './components/ManageServices'

import AuthenticatedHoc from 'HOC/WithAuthenticated'

import {useDashboard} from 'hooks/useDashboard'
import useMutationNotifications from 'hooks/useMutationNotifications'
import useApplicationsQuery from 'hooks/queries/useApplicationsQuery'
import useUpdateApplicationMutation from 'hooks/queries/useUpdateApplicationMutation'

import {setSelectedApplication} from 'services/application/application.slice'

const initialFormState = {
  services: {},
  dirty: false,
}

const ApplicationServices = ({match}) => {
  const {isLoading: isLoadingApplication, isError, data} = useApplicationsQuery(
    match.params.id,
  )

  // Declare application mutation update and handle state changes
  const [
    doUpdateApplication,
    applicationUpdateState,
  ] = useUpdateApplicationMutation(match.params.id)
  useMutationNotifications({
    ...applicationUpdateState,
    entity: 'application',
    actionType: 'update',
  })

  const [, setDashboardState] = useDashboard()

  const groupVendorsByServiceId = React.useCallback((services) => {
    return services.reduce((acc, service) => {
      const vendors = service.vendors.reduce((acc, vendor) => {
        return {
          ...acc,
          [vendor.id]: vendor,
        }
      }, {})

      return {
        ...acc,
        [service._id]: vendors,
      }
    }, {})
  }, [])

  useEffect(() => {
    setDashboardState({
      isUpdatingApplication: applicationUpdateState.isLoading,
    })
  }, [applicationUpdateState.isLoading, setDashboardState])

  useEffect(() => {
    setDashboardState({
      successFullyUpdatedApplication: applicationUpdateState.isSuccess,
    })
  }, [applicationUpdateState.isSuccess, setDashboardState])

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

  const {services, vendors} = data.application.entities
  const allVendors = groupVendorsByServiceId(data.payload.services)

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
                id: vendorId,
              },
              ...inactiveVendors.map((vendorId) => ({
                isActive: false,
                id: vendorId,
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
      <section className="">
        <Formik initialValues={initialFormState} onSubmit={handleFormSubmit}>
          {({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <ManageServices
                services={services}
                vendors={vendors}
                allVendors={allVendors}
              />
            </form>
          )}
        </Formik>
      </section>
    </>
  )
}
const mapStateToProps = ({application: {selectedApplication}}) => ({
  selectedApplication,
})

const mapDispatchToProps = {setSelectedApplication}
export default AuthenticatedHoc(
  connect(mapStateToProps, mapDispatchToProps)(ApplicationServices),
)
