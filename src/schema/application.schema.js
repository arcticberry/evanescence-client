import {schema} from 'normalizr'

import serviceSchema from './services.schema'

const applicationSchema = new schema.Entity(
  'application',
  {
    services: [serviceSchema],
  },
  {idAttribute: '_id'},
)

const applicationsSchema = new schema.Entity('applications')

export {applicationSchema, applicationsSchema}
