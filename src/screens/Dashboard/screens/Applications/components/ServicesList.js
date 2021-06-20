import React from 'react'

import {Accordion} from '@zendeskgarden/react-accordions'
import 'screens/Dashboard/screens/Applications/applications.css'

export default function ServicesList({expandedSections, children}) {
  // const onAccordionChange = (index) => {
  //   const expandedSectionUpdates = expandedSections.includes(index)
  //     ? expandedSections.filter((sectionIdx) => index !== sectionIdx)
  //     : [...expandedSections, index]

  //   setExpandedSections(expandedSectionUpdates)
  // }

  return (
    <Accordion
      expandedSections={expandedSections}
      // onChange={onAccordionChange}
      level={4}
      isExpandable
    >
      {children}
    </Accordion>
  )
}
