import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Formik} from 'formik'
import {Tabs, TabList, Tab, TabPanel} from '@zendeskgarden/react-tabs'

import Button from 'components/Button'
import LoadingState from 'components/LoadingState'
import CalloutCard from 'components/Card/CalloutCard'
import ManageServices from './components/ManageServices'
import ManageCredentials from './components/ManageCredentials/ManageCredentials'
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

const tabsList = [
  {item: 'transactions', label: 'Transactions'},
  {item: 'manage-services', label: 'Manage services'},
  {item: 'manage-credentials', label: 'Manage credentials'},
]

const ViewApplication = ({match}) => {
  const [selectedTab, setSelectedTab] = useState(tabsList[0].item)

  const {isLoading: isLoadingApplication, isError, data} = useApplicationsQuery(
    match.params.id,
  )
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

  const memoizedTableData = React.useMemo(() => makeData(100), [])
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

  useEffect(() => {
    setDashboardState({
      isUpdatingApplicationCredentials:
        applicationCredentialsUpdateState.isLoading,
    })
  }, [applicationCredentialsUpdateState.isLoading, setDashboardState])

  useEffect(() => {
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

  const {services, vendors} = data.application.entities
  const allVendors = groupVendorsByServiceId(data.payload.services)
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
      <section className="py-12 px-4 lg:px-24">
        <Tabs selectedItem={selectedTab} onChange={setSelectedTab}>
          <TabList>
            {tabsList.map((tab) => (
              <Tab item={tab.item} key={tab.item}>
                <span
                  style={{fontWeight: selectedTab === tab.item ? 600 : 400}}
                >
                  {tab.label}
                </span>
              </Tab>
            ))}
          </TabList>
          <TabPanel item="transactions">
            <RecentTransactions
              data={memoizedTableData}
              schema={tableSchema()}
              onPageNavigation={setPageParamValue}
              onPageSizeUpdate={setPageSizeParamValue}
              {...defaultTableOptions}
            />
          </TabPanel>

          <TabPanel item="manage-services">
            <Formik
              initialValues={initialFormState}
              onSubmit={handleFormSubmit}
            >
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
          </TabPanel>
          <TabPanel item="manage-credentials">
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
          </TabPanel>
        </Tabs>
      </section>
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
