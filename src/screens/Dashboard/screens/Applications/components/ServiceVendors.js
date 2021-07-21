import React from 'react'
import {FieldArray} from 'formik'

export default function ServiceVendors({serviceId, children}) {
  return (
    <FieldArray
      name={`services.${serviceId}`}
      render={(arrayHelpers) => (
        <section className="grid lg:grid-cols-3 grid-cols-2 gap-2 sm:gap-6 pt-4 sm:px-8">
          {children(arrayHelpers)}
        </section>
      )}
    />
  )
}
