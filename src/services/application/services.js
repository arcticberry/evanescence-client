import {schema} from 'normalizr'

export const vendorSchema = new schema.Entity(
  'vendors',
  {},
  {idAttribute: '_id'},
)

const service = new schema.Entity('services', {
  vendors: [vendorSchema],
})

export default [service]
