import {useMutation} from 'react-query'
import api from 'services/api'
import e from 'constants/endpoints'

export default function usePasswordReset() {
  const resetPasswordRequest = (payload) => api.post(e.RESET_PASSWORD, payload)
  const {mutate, ...mutationState} = useMutation(resetPasswordRequest)

  return [mutate, mutationState]
}
