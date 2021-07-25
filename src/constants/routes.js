import {lazy} from 'react'

const LandingPage = lazy(() => import('screens/Landing'))
const Login = lazy(() => import('screens/Login'))
const Register = lazy(() => import('screens/Register'))
const PasswordReset = lazy(() => import('screens/PasswordReset'))
const AccountConfirmation = lazy(() => import('screens/AccountConfirmation'))
const Dashboard = lazy(() => import('screens/Dashboard/Dashboard'))

// Dashboard Application routes
const AddApplicationName = lazy(() =>
  import(
    'screens/Dashboard/screens/Applications/screens/CreateApplication/screens/AddApplicationName'
  ),
)
const PickServices = lazy(() =>
  import(
    'screens/Dashboard/screens/Applications/screens/CreateApplication/screens/PickServices'
  ),
)
const AppCreationSuccess = lazy(() =>
  import(
    'screens/Dashboard/screens/Applications/screens/CreateApplication/screens/AppCreationSuccess'
  ),
)
const Applications = lazy(() =>
  import('screens/Dashboard/screens/Applications'),
)
const ViewApplication = lazy(() =>
  import(
    'screens/Dashboard/screens/Applications/screens/ViewApplication/index'
  ),
)
const ApplicationCredentials = lazy(() =>
  import(
    'screens/Dashboard/screens/Applications/screens/ViewApplication/index'
  ),
)
const CreateApplication = lazy(() =>
  import('screens/Dashboard/screens/Applications/screens/CreateApplication'),
)

const APPLICATIONS_LIST_PATH = '/dashboard/applications'
const DASHBOARD_PATH = '/dashboard'

const routes = {
  LANDING: {
    label: 'Welcome',
    path: '/',
    component: LandingPage,
    exact: true,
  },
  LOGIN: {
    label: 'Login',
    path: '/login',
    component: Login,
    exact: true,
  },
  ACCOUNT_CONFIRMATION: {
    label: 'Confirm Account',
    path: '/confirm',
    component: AccountConfirmation,
    exact: true,
  },
  REGISTER: {
    label: 'Register',
    path: '/register',
    component: Register,
    exact: true,
  },
  PASSWORD_RESET: {
    label: 'Password Reset',
    path: '/password/reset/:token?',
    component: PasswordReset,
    exact: true,
  },
  DASHBOARD: {
    label: 'Dashboard',
    path: DASHBOARD_PATH,
    component: Dashboard,
    exact: false,
  },
  APPLICATIONS_LIST: {
    path: APPLICATIONS_LIST_PATH,
    label: 'Applications',
    exact: true,
    component: Applications,
  },
  CREATE_APPLICATION: {
    path: '/dashboard/applications/create',
    label: 'Create Application',
    component: CreateApplication,
    exact: false,
  },
  VIEW_APPLICATION: {
    path: '/dashboard/applications/:id',
    label: 'Overview',
    component: ViewApplication,
    exact: true,
  },
  APPLICATION_CREDENTIALS: {
    path: '/dashboard/applications/:id/settings/credentials',
    label: 'Credentials',
    component: ApplicationCredentials,
    exact: true,
  },

  ADD_APPLICATION_NAME: {
    label: 'Create App',
    path: '/dashboard/applications/create',
    component: AddApplicationName,
    exact: true,
  },
  PICK_APPLICATION_SERVICES: {
    path: '/dashboard/applications/create/pick-services',
    label: 'Pick services',
    exact: true,
    component: PickServices,
  },
  APP_CREATION_SUCCESS: {
    path: '/dashboard/applications/create/success',
    label: 'Success',
    component: AppCreationSuccess,
  },
}

export default Object.freeze(routes)
