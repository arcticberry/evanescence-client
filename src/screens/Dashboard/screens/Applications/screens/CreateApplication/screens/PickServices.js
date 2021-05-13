import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FieldArray, useFormikContext } from 'formik';
import classNames from 'classnames';

import { ChevronRight, ChevronLeft, Star } from '@material-ui/icons';
import { Field, Label, Checkbox } from '@zendeskgarden/react-forms';
import { Accordion } from '@zendeskgarden/react-accordions';
import { Button } from '@zendeskgarden/react-buttons';
import Steps from 'components/Steps';
import SectionTitle from 'components/SectionTitle';
import AuthenticatedHoc from 'HOC/WithAuthenticated';

import '../../../application.css';
import { toast } from 'react-toastify';

const getServicesWithVendors = (services) =>
	Object.keys(services).filter((serviceKey) => services[serviceKey].vendors.length);

const VendorsList = ({ service, selectedVendors, vendors }) => {
	return (
		<FieldArray
			name={`services.${service.id}`}
			render={(arrayHelpers) => (
				<section className="grid lg:grid-cols-3 grid-cols-2 gap-6 py-4 px-8">
					{vendors.map((vendor, key) => {
						const vendorSelected = selectedVendors.includes(vendor.id);
						const onVendorChange = (e) => {
							e.preventDefault();

							if (vendorSelected) {
								arrayHelpers.remove(selectedVendors.indexOf(vendor.id));
							} else {
								arrayHelpers.push(vendor.id);
							}
						};

						return (
							<div
								key={key}
								onClick={onVendorChange}
								className={classNames(['rounded-sm p-4 cursor-pointer'], {
									'border-brand-primary border-2': vendorSelected,
								})}
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
						);
					})}
				</section>
			)}
		/>
	);
};

const ServicesList = ({ selectedServices, servicesWithVendors, services, vendors }) => {
	return (
		<Accordion level={4} isExpandable>
			{servicesWithVendors.map((serviceKey, idx) => {
				const { id, label, vendors: serviceVendors } = services[serviceKey];
				const vendorsList = serviceVendors.map((vendorId) => vendors[vendorId]);
				const selectedVendors = selectedServices.hasOwnProperty(id) ? selectedServices[id] : [];

				return (
					<Accordion.Section key={idx}>
						<Accordion.Header>
							<Accordion.Label>
								<Star /> <span>{label}</span>
							</Accordion.Label>
						</Accordion.Header>
						<Accordion.Panel>
							<p className="mb-3 text-gray-500 text-sm">
								Allows you collect payments through any of the vendors you add below
							</p>
							<VendorsList
								service={services[serviceKey]}
								selectedVendors={selectedVendors}
								vendors={vendorsList}
								onVendorChange={1}
							/>
						</Accordion.Panel>
					</Accordion.Section>
				);
			})}
		</Accordion>
	);
};

const PickServices = ({ history, crumbs, services, vendors }) => {
	const { values, setFieldValue } = useFormikContext();

	useEffect(() => {
		if (!values.name.length) {
			history.push('/dashboard/applications/create');
			toast.info('Please add a name');
		}
	}, [values.name, history]);

	useEffect(() => {
		const servicesWithVendors = getServicesWithVendors(services);
		const servicesKeys = Object.keys(services);
		// Preselect all vendors by reducing the services list
		if (servicesKeys.length) {
			let servicesUpdate = servicesWithVendors.reduce((acc, id) => {
				return {
					...acc,
					[id]: services[id].vendors,
				};
			}, {});

			setFieldValue('services', servicesUpdate);
		}
	}, [services, setFieldValue]);

	return (
		<div className="app-creation-shell">
			<section className="mb-16">
				<SectionTitle title="Access the wealth of services." message="Pick as many services as you wish." />
			</section>

			<div className="flex w-full justify-around mb-16">
				<div className="mx-auto md:w-9/12 lg:w-1/2">
					<Steps steps={crumbs} />
				</div>
			</div>

			<div className="flex w-full justify-around mb-16">
				<section>
					<ServicesList
						servicesWithVendors={getServicesWithVendors(services)}
						selectedServices={values.services}
						services={services}
						vendors={vendors}
					/>

					<div className="py-6 flex justify-between">
						<Link
							to="/dashboard/applications/create"
							className="border-gray-200 border-2 py-2 px-8 text-brand-tertiary"
						>
							<ChevronLeft />
							Back
						</Link>
						<Button type="submit" isPrimary>
							<span className="font-bold">Create application</span>
							<ChevronRight />
						</Button>
					</div>
				</section>
			</div>
		</div>
	);
};

const mapStateToProps = ({ service }) => ({
	services: service.services?.entities?.services || {},
	vendors: service.services?.entities?.vendors || {},
});

const mapDispatchToProps = {};
export default AuthenticatedHoc(connect(mapStateToProps, mapDispatchToProps)(PickServices));
