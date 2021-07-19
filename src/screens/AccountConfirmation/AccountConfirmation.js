import React from 'react'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import {ReactComponent as ResetPasswordIllustration} from 'assets/reset-password.svg'
import {ReactComponent as ErrorOccurredIllustration} from 'assets/error-occurred.svg'

import Button from 'components/Button'
import EmptyState from 'components/EmptyState'
import LoadingState from 'components/LoadingState'

import useParamSearch from 'hooks/useParamSearch'
import useAccountConfirmationMutation from 'hooks/queries/useAccountConfirmationMutation'

const AccountConfirmation = () => {
  const [getTokenParam] = useParamSearch('token')
  const token = getTokenParam()
  const [
    doAccountConfirmation,
    accountConfirmationState,
  ] = useAccountConfirmationMutation()

  React.useEffect(() => {
    doAccountConfirmation({token})
  }, [doAccountConfirmation, token])

  React.useEffect(() => {
    if (accountConfirmationState.isError) {
      toast.error(accountConfirmationState.error.response.data.message)
    }
  }, [accountConfirmationState.isError, accountConfirmationState.error])

  if (accountConfirmationState.isLoading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoadingState />
      </div>
    )

  return accountConfirmationState.isError ? (
    <EmptyState
      artwork={<ErrorOccurredIllustration />}
      title="Ooops.."
      message="An error occurred confirming your account."
    >
      <Link to="/">
        <Button>Go home</Button>
      </Link>
    </EmptyState>
  ) : (
    <EmptyState
      artwork={<ResetPasswordIllustration />}
      title="Account confirmed"
      message="Your account has been confirmed and you can proceed to the dashboard."
    >
      <Link to="/login">
        <Button>Back to login</Button>
      </Link>
    </EmptyState>
  )
}

export default AccountConfirmation
