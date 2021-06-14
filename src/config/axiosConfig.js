// in HTTP.js
import axios from 'axios'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import {getStoredAuthToken} from 'utils/authToken'

// create a new axios instance
export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
})

instance.interceptors.request.use((config) => {
  const token = getStoredAuthToken()

  if (token && !config.headers.hasOwnProperty('Authorization')) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

instance.interceptors.request.use((config) => {
  Nprogress.start()

  return config
})

instance.interceptors.response.use(
  (response) => {
    Nprogress.done()
    return response
  },
  function (error) {
    Nprogress.done()
    if (
      !error.response ||
      !error.response.data ||
      !error.response.data.message
    ) {
      error = {
        response: {
          data: {
            message: 'Unable to complete request',
          },
        },
      }
    }
    throw error
  },
)
