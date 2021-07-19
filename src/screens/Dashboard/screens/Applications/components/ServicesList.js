import React from 'react'

import {Accordion} from '@zendeskgarden/react-accordions'
import 'screens/Dashboard/screens/Applications/applications.css'

export default function ServicesList({expandedSections, children}) {
  return (
    <Accordion expandedSections={expandedSections} level={4} isExpandable>
      {children}
    </Accordion>
  )
}
