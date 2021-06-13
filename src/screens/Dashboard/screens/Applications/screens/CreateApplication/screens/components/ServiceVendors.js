import React from 'react'
import {FieldArray} from 'formik'
import classNames from 'classnames'
import Icon from 'components/Icon'

import {Field, Label, Checkbox} from '@zendeskgarden/react-forms'

export default function ServiceVendors({service, selectedVendors, vendors}) {
  return (
    <FieldArray
      name={`services.${service.id}`}
      render={(arrayHelpers) => (
        <section className="grid lg:grid-cols-3 grid-cols-2 gap-2 sm:gap-6 pt-4 sm:px-8">
          {vendors.map((vendor, key) => {
            const vendorSelected = selectedVendors.includes(vendor._id)
            const onVendorChange = (e) => {
              e.preventDefault()

              if (vendorSelected) {
                arrayHelpers.remove(selectedVendors.indexOf(vendor._id))
              } else {
                arrayHelpers.push(vendor._id)
              }
            }

            return (
              <div
                key={key}
                onClick={onVendorChange}
                className={classNames(
                  [
                    'rounded-md p-3 border-2 hover:border-brand-primary cursor-pointer',
                  ],
                  {
                    'border-brand-primary': vendorSelected,
                  },
                )}
              >
                <Field key={key}>
                  <Checkbox checked={vendorSelected} onChange={onVendorChange}>
                    <Label>
                      <span className="flex items-center font-bold text-sm text-brand-tertiary">
                        <Icon
                          name={`vendors/${vendor.name}`}
                          className="mr-1 sm:mr-2"
                        />

                        {vendor.label}
                      </span>
                    </Label>
                  </Checkbox>
                </Field>
              </div>
            )
          })}
        </section>
      )}
    />
  )
}
