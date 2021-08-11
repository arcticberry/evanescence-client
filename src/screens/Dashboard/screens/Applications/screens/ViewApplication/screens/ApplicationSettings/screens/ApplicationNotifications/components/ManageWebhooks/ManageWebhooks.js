import React, {useState} from 'react'
import {useFormikContext} from 'formik'
import {Accordion} from '@zendeskgarden/react-accordions'
import {Spinner} from '@zendeskgarden/react-loaders'
import {SettingsInputAntennaTwoTone as WebhookIcon} from '@material-ui/icons'

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
      <div className="flex justify-between">
        <section className="">
          <h1 className="text-xl font-bold text-brand-tertiary mb-1">
            Manage webhooks
          </h1>
        </section>
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

      <div className="mx-auto pt-8 overflow-auto">
        <Accordion level={4} isExpandable>
          <div className="bg-white shadow-md rounded-md mb-4">
            <Accordion.Section>
              <Accordion.Header>
                <Accordion.Label>
                  <section className="flex items-center relative">
                    <WebhookIcon className="mr-1 sm:mr-2 w-8" />

                    <div className="pl-3 mr-6">
                      <span className="font-bold text-sm">Update Webhook</span>
                    </div>
                  </section>
                </Accordion.Label>
              </Accordion.Header>
              <Accordion.Panel className="bg-gray-100">
                <div className="mb-2">
                  <Input
                    name="url"
                    label="URL"
                    onChange={(e) => doWebhookChange(e.target.value)}
                    value={webhookURL}
                  />
                </div>
              </Accordion.Panel>
            </Accordion.Section>
          </div>
        </Accordion>
      </div>
    </>
  )
}

export default ManageWebhooks
