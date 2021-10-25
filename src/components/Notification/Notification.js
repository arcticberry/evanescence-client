import React from 'react'
import {
  Notification as ZendeskNotification,
  Title,
  Close,
} from '@zendeskgarden/react-notifications'

const Notification = ({title, message, type, onClose}) => {
  return (
    <ZendeskNotification type={type} style={{maxWidth: 450}}>
      <Title>{title}</Title>
      {message}
      <Close aria-label="Close" onClick={onClose} />
    </ZendeskNotification>
  )
}

Notification.defaultProps = {
  type: 'success',
}

export default Notification
