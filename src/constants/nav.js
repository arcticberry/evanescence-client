import {
  Dashboard as DashboardIcon,
  VpnKey as CredentialsIcon,
  Apps as AppsIcon,
  SettingsEthernet as APISettingsIcon,
  Tune as SettingsIcon,
  PowerTwoTone as WebhookIcon,
} from '@material-ui/icons'
import {replaceParams} from 'utils'
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
    {
      label: r.WEBHOOKS.label,
      icon: WebhookIcon,
      path: r.WEBHOOKS.path,
    },
  ],
}

export const settings = [
  {
    label: 'Services',
    icon: SettingsIcon,
    path: ({appId}) => replaceParams(r.APPLICATION_SERVICES.path, {id: appId}),
  },
  {
    label: 'Credentials',
    icon: CredentialsIcon,
    path: ({appId}) =>
      replaceParams(r.APPLICATION_CREDENTIALS.path, {id: appId}),
  },
  {
    label: 'API settings',
    icon: APISettingsIcon,
    path: ({appId}) =>
      replaceParams(r.APPLICATION_API_SETTINGS.path, {id: appId}),
  },
]

export default Object.freeze(nav)
