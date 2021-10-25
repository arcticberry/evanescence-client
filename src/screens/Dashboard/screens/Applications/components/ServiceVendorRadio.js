import React from 'react'
import {Label, Radio} from '@zendeskgarden/react-forms'

import Icon from 'components/Icon'

const ServiceVendorRadio = ({name, label, checked, onChange}) => {
  return (
    <Radio checked={checked} onChange={onChange}>
      <Label>
        <span className="flex items-center font-bold text-sm text-brand-tertiary">
          <Icon name={`vendors/${name}`} className="mr-1 sm:mr-2" />

          {label}
        </span>
      </Label>
    </Radio>
  )
}

export default ServiceVendorRadio
