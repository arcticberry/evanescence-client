import React, {useEffect, useRef, useState} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import cx from 'classnames'
import {Formik} from 'formik'
import {Done, Edit, Close} from '@material-ui/icons'
import {Tabs, TabList, Tab, TabPanel} from '@zendeskgarden/react-tabs'
import {Tooltip} from '@zendeskgarden/react-tooltips'

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
  const [applicationNameStatus, setApplicationNameStatus] = useState(
    'NOT_EDITING',
  )
  const applicationNameInputEl = useRef(null)

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
    if (applicationNameInputEl.current && applicationNameStatus === 'EDITING') {
      applicationNameInputEl.current.focus()
      applicationNameInputEl.current.select()
    }
  }, [applicationNameInputEl, applicationNameStatus])

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

  const isEditingAppName = applicationNameStatus === 'EDITING'

  return (
    <>
      <section className="h-32">
        <CalloutCard variant="mu">
          <div className="px-4 md:px-16 lg:px-24 pb-8 flex flex-col md:flex-row items-center justify-between text-gray-100">
            <div className="mb-2 text-xl font-bold flex items-center w-full md:w-1/3">
              <section className={`mr-6 ${isEditingAppName ? 'w-full' : ''}`}>
                {isEditingAppName ? (
                  <input
                    ref={applicationNameInputEl}
                    className="bg-gray-500 bg-opacity-20 border border-brand-primary rounded-2 min-w-full w-full outline-none px-4 py-2"
                    defaultValue={data.payload.label}
                  />
                ) : (
                  <span className="d-block">{data.payload.label}</span>
                )}
              </section>

              <div
                className={cx(['opacity-0'], {
                  'opacity-100': applicationNameStatus === 'NOT_EDITING',
                })}
              >
                <Tooltip content="Edit application name">
                  <button
                    size="small"
                    aria-label="edit"
                    className="bg-brand-tertiary bg-opacity-50 w-12 h-12 flex items-center justify-center rounded-full"
                    onClick={() => {
                      setApplicationNameStatus('EDITING')
                    }}
                  >
                    <Edit fontSize={'8px'} />
                  </button>
                </Tooltip>
              </div>
              {isEditingAppName ? (
                <>
                  <span className="mr-2">
                    <Tooltip content="Save">
                      <button
                        size="small"
                        aria-label="edit"
                        className="bg-green-400 bg-opacity-50 w-12 h-12 flex items-center justify-center rounded-full"
                      >
                        <Done fontSize={'8px'} />
                      </button>
                    </Tooltip>
                  </span>
                  <Tooltip content="Cancel">
                    <button
                      size="small"
                      aria-label="cancel"
                      className="w-12 h-12 flex items-center justify-center rounded-full"
                      onClick={() => {
                        setApplicationNameStatus('NOT_EDITING')
                      }}
                    >
                      <Close fontSize={'8px'} />
                    </button>
                  </Tooltip>
                </>
              ) : null}
            </div>
            <section className="hidden md:inline-block">
              <Link to="/dashboard/applications">
                <Button>Switch application</Button>
              </Link>
            </section>
          </div>
        </CalloutCard>
      </section>
      <section className="py-12 px-4 lg:px-24">
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
  connect(mapStateToProps, mapDispatchToProps)(ViewApplication),
)
