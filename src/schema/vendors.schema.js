import {schema} from 'normalizr'

export const vendorSchema = new schema.Entity(
  'vendors',
  {},
  {idAttribute: '_id'},
)
