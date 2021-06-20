import {schema} from 'normalizr'
import {vendorSchema} from './vendors.schema'

const service = new schema.Entity(
  'services',
  {
    vendors: [vendorSchema],
  },
  {idAttribute: '_id'},
)

export default service
