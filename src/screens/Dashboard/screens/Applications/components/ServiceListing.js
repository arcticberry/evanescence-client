import React from 'react'

import CheckboxRound from 'components/CheckboxRound'

import {Accordion} from '@zendeskgarden/react-accordions'
import 'screens/Dashboard/screens/Applications/applications.css'

const ServiceListing = ({checked, children, onChange, label}) => {
  return (
    <div className="bg-white shadow-md rounded-md mb-4">
      <Accordion.Section>
        <Accordion.Header>
          <Accordion.Label>
            <section className="flex items-center">
              <span>
                <CheckboxRound
                  id={label}
                  checked={checked}
                  onChange={onChange}
                />
              </span>
              <div className="pl-3">
                <span className="font-bold text-sm">{label}</span>
                <p className="text-gray-400 mt-1 text-xs">
                  Allows you collect payments through any of the vendors you add
                  below
                </p>
              </div>
            </section>
          </Accordion.Label>
        </Accordion.Header>
        <Accordion.Panel>{children}</Accordion.Panel>
      </Accordion.Section>
    </div>
  )
}

export default ServiceListing
