import React, {useCallback, useEffect} from 'react'
import {useFormikContext} from 'formik'
import {Spinner} from '@zendeskgarden/react-loaders'
import {Accordion} from '@zendeskgarden/react-accordions'
import {normalize} from 'normalizr'

import ErrorLoading from 'components/ErrorLoading'
import Button from 'components/Button'

import {useDashboard} from 'hooks/useDashboard'
import useMetaQuery from 'hooks/queries/useMetaQuery'
import useApplicationsQuery from 'hooks/queries/useApplicationsQuery'

import useShowToast from 'hooks/useShowToast'

import CredentialListing from 'screens/Dashboard/screens/Applications/components/CredentialListing'
import ManageCredentialsLoader from './ManageCredentialsLoader'

import {applicationCredentialsSchema} from 'schema/application.schema'

const ManageCredentials = ({applicationId, handleReset}) => {
  const {values, setFieldValue} = useFormikContext()
  const [dashboardState] = useDashboard()
  const showToast = useShowToast()
  const {isLoading, isError, data: credentialsConfig} = useMetaQuery(
    'vendors/form-rules',
  )
  const {
    isLoading: isLoadingApplicationCredentials,
    isError: errorLoadingApplicationCredentials,
    isSuccess: successLoadingApplicationCredentials,
    data: applicationCredentials,
    refetch,
  } = useApplicationsQuery(`${applicationId}/credentials`)

  useEffect(() => {
    if (dashboardState.successFullyUpdatedApplicationCredentials.status) {
      showToast({
        type: 'success',
        title: 'Successfully updated credentials',
        message:
          dashboardState.successFullyUpdatedApplicationCredentials.message,
      })
      refetch()
      handleReset()
    }
  }, [
    refetch,
    showToast,
    handleReset,
    dashboardState.successFullyUpdatedApplicationCredentials,
  ])

  useEffect(() => {
    if (dashboardState.errorUpdatingApplicationCredentials.status) {
      showToast({
        type: 'error',
        title: 'Error updating application credentials',
        message: dashboardState.errorUpdatingApplicationCredentials,
      })
    }
  }, [
    showToast,
    handleReset,
    dashboardState.errorUpdatingApplicationCredentials,
  ])

  const getCredentials = useCallback(() => {
    if (successLoadingApplicationCredentials) {
      return normalize(applicationCredentials, [applicationCredentialsSchema])
    }
  }, [applicationCredentials, successLoadingApplicationCredentials])

  if (isLoading || isLoadingApplicationCredentials)
    return (
      <div className="w-full flex items-center justify-center">
        <ManageCredentialsLoader />
      </div>
    )

  if (isError || errorLoadingApplicationCredentials)
    return (
      <ErrorLoading
        title="Oops..."
        message="Something unexpected happened. Please retry."
      />
    )

  const credentials = getCredentials()

  const handleCredentialChange = (field, value) => {
    setFieldValue(field, value)
    setFieldValue('dirty', true)
  }

  return (
    <>
      <div className="py-12 px-4 flex justify-between">
        <section className="">
          <h1 className="text-xl font-bold text-brand-tertiary mb-1">
            Manage vendor credentials
          </h1>
          <p className="text-sm text-gray-400">
            Gain better control over your integrations
          </p>
        </section>
        <Button
          variant="primary"
          type="submit"
          disabled={
            !values.dirty || dashboardState.isUpdatingApplicationCredentials
          }
        >
          {dashboardState.isUpdatingApplicationCredentials ? (
            <>
              <Spinner delayMS={0} size={16} />
              <span className="font-bold ml-1">Saving...</span>
            </>
          ) : (
            <b>Save changes</b>
          )}
        </Button>
      </div>

      <div className="mx-auto overflow-auto">
        <Accordion level={4} isExpandable>
          {Object.keys(credentialsConfig).map((credentialProvider, idx) => {
            return (
              <CredentialListing
                key={idx}
                provider={credentialProvider}
                config={credentialsConfig[credentialProvider]}
                credentials={
                  credentials.entities.applicationCredentials[
                    credentialProvider
                  ]
                }
                credentialValues={values}
                handleCredentialChange={handleCredentialChange}
              />
            )
          })}
        </Accordion>
      </div>
    </>
  )
}

export default ManageCredentials
