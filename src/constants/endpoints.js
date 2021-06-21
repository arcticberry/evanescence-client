export default Object.freeze({
  LOGIN: '/auth/login',
  CREATE_USER: '/auth/register',
  CREATE_APPLICATION: '/applications',
  UPDATE_APPLICATION: (id) => `/applications/${id}`,
})
