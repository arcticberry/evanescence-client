import React from 'react'
import CheckboxRound from 'components/CheckboxRound'

import {Accordion} from '@zendeskgarden/react-accordions'
import 'screens/Dashboard/screens/Applications/applications.css'

import ServiceVendors from './ServiceVendors'

export default function ServicesList({selectedServices, services, vendors}) {
  const [expandedSections, setExpandedSections] = React.useState([0, 1])

  React.useEffect(() => {
    const expandedSections = Array.from({
      length: Object.keys(services).length,
    }).map((_, idx) => idx)
    setExpandedSections(expandedSections)
  }, [setExpandedSections, services])

  const onAccordionChange = (index) => {
    const expandedSectionUpdates = expandedSections.includes(index)
      ? expandedSections.filter((sectionIdx) => index !== sectionIdx)
      : [...expandedSections, index]

    setExpandedSections(expandedSectionUpdates)
  }

  return (
    <Accordion
      expandedSections={expandedSections}
      onChange={onAccordionChange}
      level={4}
      isExpandable
    >
      {Object.keys(services).map((serviceKey, idx) => {
        const {id, label, vendors: serviceVendors} = services[serviceKey]
        const vendorsList = serviceVendors.map((vendorId) => vendors[vendorId])
        const selectedVendors = selectedServices.hasOwnProperty(id)
          ? selectedServices[id]
          : []

        return (
          <div className="bg-white shadow-md rounded-md mb-4" key={idx}>
            <Accordion.Section>
              <Accordion.Header>
                <Accordion.Label>
                  <section className="flex items-center">
                    <span onBlick={(e) => e.preventDefault()}>
                      <CheckboxRound checked={selectedVendors.length} />
                    </span>
                    <div className="pl-2">
                      <span>{label}</span>
                      <p className="text-gray-400 mt-1 text-xs">
                        Allows you collect payments through any of the vendors
                        you add below
                      </p>
                    </div>
                  </section>
                </Accordion.Label>
              </Accordion.Header>
              <Accordion.Panel>
                <ServiceVendors
                  service={services[serviceKey]}
                  selectedVendors={selectedVendors}
                  vendors={vendorsList}
                  onVendorChange={1}
                />
              </Accordion.Panel>
            </Accordion.Section>
          </div>
        )
      })}
    </Accordion>
  )
}
