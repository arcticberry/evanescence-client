import React from 'react'
import {Accordion} from '@zendeskgarden/react-accordions'
import {Done} from '@material-ui/icons'
import Icon from 'components/Icon'
import {PasswordInput} from 'components/Form'
import {capFirst} from 'utils'

import 'screens/Dashboard/screens/Applications/applications.css'
import {theme} from 'config/theme'

const CredentialListing = ({
  provider,
  config,
  credentials,
  handleCredentialChange,
  credentialValues,
}) => {
  return (
    <div className="bg-white shadow-md rounded-md mb-4">
      <Accordion.Section>
        <Accordion.Header>
          <Accordion.Label>
            <section className="flex items-center relative">
              <Icon name={`vendors/${provider}`} className="mr-1 sm:mr-2 w-8" />

              <div className="pl-3 mr-6">
                <span className="font-bold text-sm">{`${
                  credentials.isSubmitted ? 'Update' : 'Add'
                } ${capFirst(provider)} keys`}</span>
              </div>
              {credentials.isSubmitted ? (
                <div className="absolute right-6 rounded-full flex items-center justify-center w-7 h-7 bg-gray-100">
                  <Done
                    fontSize={'small'}
                    htmlColor={theme.palette.grey['400']}
                  />
                </div>
              ) : null}
            </section>
          </Accordion.Label>
        </Accordion.Header>
        <Accordion.Panel className="bg-gray-100">
          {Object.keys(config).map((field, idx) => {
            const fieldName = `${provider}-${field}`

            return (
              <div className="mb-2" key={idx}>
                <PasswordInput
                  label={capFirst(config[field].label)}
                  id={fieldName}
                  onChange={(e) =>
                    handleCredentialChange(fieldName, e.target.value)
                  }
                  value={credentialValues[fieldName] || ''}
                />
              </div>
            )
          })}
        </Accordion.Panel>
      </Accordion.Section>
    </div>
  )
}

export default CredentialListing
