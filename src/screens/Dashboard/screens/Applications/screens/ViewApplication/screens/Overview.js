import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Formik} from 'formik'
import {GraphicEq as GoLive} from '@material-ui/icons'
import {Tabs, TabList, Tab, TabPanel} from '@zendeskgarden/react-tabs'
import {Field, Label, Toggle} from '@zendeskgarden/react-forms'

import LoadingState from 'components/LoadingState'
import ErrorLoading from 'components/ErrorLoading'
import ManageServices from '../components/ManageServices'
import ManageCredentials from '../components/ManageCredentials/ManageCredentials'
import RecentTransactions from '../components/RecentTransactions'

import AuthenticatedHoc from 'HOC/WithAuthenticated'

import {useDashboard} from 'hooks/useDashboard'
import useMutationNotifications from 'hooks/useMutationNotifications'
import useParamSearch from 'hooks/useParamSearch'
import useApplicationsQuery from 'hooks/queries/useApplicationsQuery'
import useUpdateApplicationMutation from 'hooks/queries/useUpdateApplicationMutation'
import useUpdateApplicationCredentialsMutation from 'hooks/queries/useUpdateApplicationCredentialsMutation'

import makeData from 'utils/makeData'
import tableSchema from '../tableSchema'
import {setSelectedApplication} from 'services/application/application.slice'
import '../../../applications.css'
import {brand} from 'config/palette'

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

const Overview = ({match}) => {
  const [selectedTab, setSelectedTab] = useState(tabsList[0].item)
  const [applicationLive, setApplicationLive] = useState(false)
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

  const [
    doUpdateApplicationCredentials,
    applicationCredentialsUpdateState,
  ] = useUpdateApplicationCredentialsMutation(match.params.id)
  useMutationNotifications({
    ...applicationCredentialsUpdateState,
    entity: 'application credentials',
    actionType: 'update',
  })

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
    if (data) {
      setApplicationLive(data.payload.isLive)
    }
  }, [data])

  useEffect(() => {
    if (applicationCredentialsUpdateState.isError) {
      setDashboardState({
        errorUpdatingApplicationCredentials: {
          status: applicationCredentialsUpdateState.isError,
          message:
            applicationCredentialsUpdateState.error.response.data.message,
        },
      })
    }
  }, [
    applicationCredentialsUpdateState.isError,
    applicationCredentialsUpdateState.error,
    setDashboardState,
  ])

  useEffect(() => {
    if (applicationCredentialsUpdateState.isSuccess) {
      setDashboardState({
        successFullyUpdatedApplicationCredentials: {
          status: applicationCredentialsUpdateState.isSuccess,
          message: applicationCredentialsUpdateState.data.message,
        },
      })
    }
  }, [
    applicationCredentialsUpdateState.isSuccess,
    applicationCredentialsUpdateState.data,
    setDashboardState,
  ])

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

    const validKeys = Object.keys(payload).filter(
      (key) => Object.keys(payload[key]).length,
    )
    const validPayload = validKeys.reduce(
      (acc, curr) => ({
        ...acc,
        [curr]: payload[curr],
      }),
      {},
    )

    doUpdateApplicationCredentials(validPayload)
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

  const toggleApplicationLive = () => {
    setApplicationLive(!applicationLive)
    doUpdateApplication({
      isLive: !applicationLive,
    })
  }

  return (
    <>
      <section className="py-12 px-4 lg:px-24">
        <section className="mb-6 flex justify-between">
          <div>
            <GoLive htmlColor={brand['brand-primary']} />
            <span className="ml-3">
              {applicationLive ? 'Live mode' : 'Test mode'}
            </span>
          </div>

          <div>
            <Field>
              <Toggle
                onChange={toggleApplicationLive}
                checked={applicationLive}
              >
                <Label>{applicationLive ? 'Switch to test' : 'Go live'}</Label>
              </Toggle>
            </Field>
          </div>
        </section>

        <Tabs selectedItem={selectedTab} onChange={setSelectedTab}>
          <TabList className="overflow-scroll">
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
  connect(mapStateToProps, mapDispatchToProps)(Overview),
)
