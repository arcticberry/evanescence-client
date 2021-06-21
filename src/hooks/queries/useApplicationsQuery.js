import {useCallback} from 'react'

import {useQuery} from 'react-query'
import {normalize} from 'normalizr'
import {applicationSchema} from 'schema/application.schema'
import api from 'services/api'

const transformApplications = (payload) => {
  if (Array.isArray(payload)) return payload
  const application = normalize(payload, applicationSchema)

  return application
}

const getApplications = async (queryParams = '') => {
  const {data} = await api.getAll(`/applications/${queryParams}`)
  return data
}

export default function useApplications(queryParams = '') {
  return useQuery(
    ['applications', queryParams],
    () => getApplications(queryParams),
    {
      select: useCallback(transformApplications, []),
    },
  )
}
