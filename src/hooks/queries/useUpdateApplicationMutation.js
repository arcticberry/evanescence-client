import {useMutation} from 'react-query'
import api from 'services/api'
import e from 'constants/endpoints'

export default function useUpdateApplicationMutation(applicationId) {
  const request = (payload) =>
    api.patch(e.UPDATE_APPLICATION(applicationId), payload)

  const {mutate, ...mutationState} = useMutation(request)

  return [mutate, mutationState]
}
