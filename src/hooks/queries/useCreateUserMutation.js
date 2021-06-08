import {useMutation} from 'react-query'
import api from 'services/api'
import e from 'constants/endpoints'

export default function useCreateUserQuery() {
  const request = (payload) => api.post(e.REGISTER, payload)
  const {mutate, ...mutationState} = useMutation(request)

  return [mutate, mutationState]
}
