import React from 'react'
import r from 'constants/routes'

const useDefaultApplication = (defaultApplication) => {
  const applicationPath = r.VIEW_APPLICATION.path.replace(
    /:id/,
    defaultApplication,
  )
}

export default useDefaultApplication
