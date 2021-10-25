import React, {useCallback} from 'react'

import {useToast} from '@zendeskgarden/react-notifications'
import Notification from 'components/Notification/Notification'

const useShowToast = () => {
  const {addToast} = useToast()

  const showToast = useCallback(
    ({type, title, message}) => {
      addToast(({close}) => (
        <Notification
          title={title}
          type={type}
          message={message}
          onClose={close}
        />
      ))
    },
    [addToast],
  )

  return showToast
}

export default useShowToast
