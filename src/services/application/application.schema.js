import { schema } from 'normalizr';

const vendor = new schema.Entity('vendors');
export const service = new schema.Entity('service');
const applicationService = new schema.Entity('application_service');

const applicationSchema = new schema.Entity('application', {
	vendors: [vendor],
	application_services: [applicationService],
});

const applicationsSchema = new schema.Entity('applications');

export { applicationSchema, applicationsSchema };
