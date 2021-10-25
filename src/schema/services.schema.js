import {schema} from 'normalizr'
import {vendorSchema} from './vendors.schema'

export const serviceManagement = new schema.Entity('services', {
  vendors: [vendorSchema],
})

const service = new schema.Entity(
  'services',
  {
    vendors: [vendorSchema],
  },
  {idAttribute: '_id'},
)

export default service
