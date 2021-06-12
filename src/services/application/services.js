import {schema} from 'normalizr'

export const vendorSchema = new schema.Entity('vendors', {idAttribute: 'name'})

const service = new schema.Entity('services', {
  vendors: [vendorSchema],
})

export default [service]
