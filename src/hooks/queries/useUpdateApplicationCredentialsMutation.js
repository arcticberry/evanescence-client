import {useMutation} from 'react-query'
import api from 'services/api'
import e from 'constants/endpoints'

export default function useUpdateApplicationCredentialsMutation(applicationId) {
  const request = (payload) =>
    api.post(e.APPLICATION_CREDENTIALS(applicationId), payload)

  const {mutate, ...mutationState} = useMutation(request)

  return [mutate, mutationState]
}
