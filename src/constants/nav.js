import {
  Dashboard as DashboardIcon,
  VpnKey as CredentialsIcon,
  Apps as AppsIcon,
  Tune as SettingsIcon,
} from '@material-ui/icons'
import r from './routes'

const nav = {
  '': [
    {
      label: 'Overview',
      icon: DashboardIcon,
      isCurrent: true,
      path: r.DASHBOARD.path,
    },
    {
      label: 'Apps',
      icon: AppsIcon,
      path: r.APPLICATIONS_LIST.path,
    },
  ],
}

export const settings = [
  {
    label: 'Credentials',
    icon: CredentialsIcon,
    path: ({appId}) => r.APPLICATION_CREDENTIALS.path.replace(/:id/, appId),
  },
  {
    label: 'Services',
    icon: SettingsIcon,
    path: ({appId}) => r.APPLICATION_SERVICES.path.replace(/:id/, appId),
  },
]

export default Object.freeze(nav)
