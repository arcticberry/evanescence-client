import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Tabs, TabList, Tab, TabPanel} from '@zendeskgarden/react-tabs'

import r from 'constants/routes'
import LoadingState from 'components/LoadingState'
import ErrorLoading from 'components/ErrorLoading'
// import ApplicationServices from './screens/ApplicationServices/ApplicationServices'
// import ApplicationCredentials from './screens/ApplicationCredentials'

import AuthenticatedHoc from 'HOC/WithAuthenticated'

import {useDashboard} from 'hooks/useDashboard'
import useTranslator from 'hooks/useTranslator'
import useMutationNotifications from 'hooks/useMutationNotifications'
import useApplicationsQuery from 'hooks/queries/useApplicationsQuery'
import useUpdateApplicationMutation from 'hooks/queries/useUpdateApplicationMutation'

import {setSelectedApplication} from 'services/application/application.slice'
import {replaceParams} from 'utils'

const createTabRoutes = (tabRoutes) => {
  return tabRoutes.map((tabRoute) => {
    const segments = tabRoute.path.split('/')
    const item = segments[segments.length - 1]

    return {
      ...tabRoute,
      item,
    }
  })
}

const tabRoutes = createTabRoutes([
  r.APPLICATION_SERVICES,
  r.APPLICATION_CREDENTIALS,
  r.APPLICATION_NOTIFICATIONS,
])

const ApplicationSettings = (props) => {
  const {match, history} = props
  const {id, setting} = match.params
  const [selectedTab, setSelectedTab] = useState(setting)

  const [, setApplicationLive] = useState(false)
  const {isLoading: isLoadingApplication, isError, data} = useApplicationsQuery(
    id,
  )

  // Declare application mutation update and handle state changes
  const [, applicationUpdateState] = useUpdateApplicationMutation(id)
  useMutationNotifications({
    ...applicationUpdateState,
    entity: 'application',
    actionType: 'update',
  })

  const [, setDashboardState] = useDashboard()
  const {t} = useTranslator()

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
    if (data) {
      setApplicationLive(data.payload.isLive)
    }
  }, [data])

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

  const doSelectTab = (tab) => {
    setSelectedTab(tab)
    history.push(replaceParams(r.APPLICATION_SETTINGS.path, {id, setting: tab}))
  }

  return (
    <>
      <section className="py-12 px-4 lg:px-24">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-500 mb-1">
            {t('application.settings.title')}
          </h1>
        </div>

        <Tabs selectedItem={selectedTab} onChange={doSelectTab}>
          <TabList className="overflow-scroll">
            {tabRoutes.map((tab) => {
              return (
                <Tab item={tab.item} key={tab.item}>
                  <span
                    style={{fontWeight: selectedTab === tab.item ? 600 : 400}}
                  >
                    {tab.label}
                  </span>
                </Tab>
              )
            })}
          </TabList>

          {tabRoutes.map(({item, component: Component}) => (
            <TabPanel item={item} key={item}>
              <Component {...props} />
            </TabPanel>
          ))}
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
  connect(mapStateToProps, mapDispatchToProps)(ApplicationSettings),
)
