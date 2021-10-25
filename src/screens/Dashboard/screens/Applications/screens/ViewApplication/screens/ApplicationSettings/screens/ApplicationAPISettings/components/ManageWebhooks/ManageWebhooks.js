import React, {useState} from 'react'
import {useFormikContext} from 'formik'
// import {Accordion} from '@zendeskgarden/react-accordions'
import {Spinner} from '@zendeskgarden/react-loaders'
// import {SettingsInputAntennaTwoTone as WebhookIcon} from '@material-ui/icons'

import {Input} from 'components/Form'
import Button from 'components/Button'

import {useDashboard} from 'hooks/useDashboard'

const ManageWebhooks = ({url}) => {
  const {
    values: {dirty},
    setFieldValue,
  } = useFormikContext()
  const [webhookURL, setWebhookURL] = useState(url)
  const [dashboardState] = useDashboard()

  const doWebhookChange = (value) => {
    setWebhookURL(value)
    setFieldValue('url', value)
    setFieldValue('dirty', true)
  }

  return (
    <>
      <div className="flex justify-between hidden">
        <Button
          variant="primary"
          type="submit"
          disabled={!dirty || dashboardState.isUpdatingApplicationWebhook}
        >
          {dashboardState.isUpdatingApplicationWebhook ? (
            <>
              <Spinner delayMS={0} size={16} />
              <span className="font-bold ml-1">Saving...</span>
            </>
          ) : (
            <b>Save changes</b>
          )}
        </Button>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-16 py-8">
        <div className="flex">
          <div className="mr-8">
            <h2 className="font-bold text-brand-tertiary mb-1">
              Manage webhooks
            </h2>
            <p className="text-sm text-gray-400">
              Know about changes on transactions by your users.
            </p>
          </div>
        </div>
        <div className="col-end-4 col-span-2 mb-2">
          <Input
            name="url"
            label="URL"
            onChange={(e) => doWebhookChange(e.target.value)}
            value={webhookURL}
          />
        </div>
      </section>
    </>
  )
}

export default ManageWebhooks
