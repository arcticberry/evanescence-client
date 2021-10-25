import React from 'react'
import {Link} from 'react-router-dom'

import {ReactComponent as ErrorOccurredIllustration} from 'assets/error-occurred.svg'
import EmptyState from 'components/EmptyState'

const ErrorLoading = ({title = 'Something unexpected happened', message}) => {
  return (
    <div className="h-screen">
      <EmptyState
        artwork={<ErrorOccurredIllustration />}
        title={title}
        message={message}
      >
        <Link
          to="/dashboard/applications"
          className="btn btn-primary btn-md font-weight-bold px-4"
        >
          Retry
          <i className="ml-1 mdi mdi-reload" />
        </Link>
      </EmptyState>
    </div>
  )
}

export default ErrorLoading
