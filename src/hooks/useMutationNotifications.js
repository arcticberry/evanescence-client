import {useEffect, useState} from 'react'
import useShowToast from 'hooks/useShowToast'
import {capFirst} from 'utils'

function useMutationNotifications({
  isError,
  isSuccess,
  actionType = 'create',
  entity,
  data,
  error,
}) {
  const [notificationConfig, setNotificationConfig] = useState(null)
  const showToast = useShowToast()

  useEffect(() => {
    if (isError) {
      setNotificationConfig({
        type: 'error',
        title: `${entity} could not be ${actionType}d`,
        message: error.response.data.message,
      })
    }
  }, [isError, setNotificationConfig, entity, actionType, error])

  useEffect(() => {
    if (isSuccess) {
      setNotificationConfig({
        type: 'success',
        title: `${entity} successfully ${actionType}d`,
        message: data.message,
      })
    }
  }, [isSuccess, setNotificationConfig, entity, actionType, data])

  useEffect(() => {
    if (notificationConfig) {
      const {type, title, message} = notificationConfig
      showToast({type, title: capFirst(title), message: capFirst(message)})
    }
  }, [notificationConfig, showToast])
}

export default useMutationNotifications
