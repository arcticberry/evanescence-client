export default Object.freeze({
  LOGIN: '/auth/login',

  CREATE_USER: '/auth/register',
  RESET_PASSWORD: '/auth/reset-password',
  REQUEST_PASSWORD_RESET: '/auth/forgot-password',

  CREATE_APPLICATION: '/applications',
  UPDATE_APPLICATION: (id) => `/applications/${id}`,
  APPLICATION_CREDENTIALS: (id) => `/applications/${id}/credentials`,
})
