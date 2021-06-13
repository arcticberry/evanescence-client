import React from 'react'
import {FieldArray} from 'formik'
import classNames from 'classnames'

import {Field, Label, Checkbox} from '@zendeskgarden/react-forms'

export default function ServiceVendors({service, selectedVendors, vendors}) {
  return (
    <FieldArray
      name={`services.${service.id}`}
      render={(arrayHelpers) => (
        <section className="grid lg:grid-cols-3 grid-cols-2 gap-6 py-4 px-8">
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
                  ['rounded-md p-3 border-2 cursor-pointer'],
                  {
                    'border-brand-primary': vendorSelected,
                  },
                )}
              >
                <Field key={key}>
                  <Checkbox checked={vendorSelected} onChange={onVendorChange}>
                    <Label>
                      <img src={vendor.brand_url} alt="" />
                      {vendor.label}
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
