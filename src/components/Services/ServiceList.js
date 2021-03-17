import React from "react";
import ServiceItem from "./ServiceItem";

const ServiceList = ({
  services,
  vendors,
  selectedVendors,
  setSelectedVendors,
}) => {
  return (
    <div className="accordion custom-accordion " id="custom-accordion-one">
      {Object.keys(services).map((key, index) => {
        const currentService = services[key];
        const currentServiceId = currentService.id.toString();
        return (
          <ServiceItem
            selectedVendors={
              currentServiceId in selectedVendors
                ? selectedVendors[currentServiceId]
                : []
            }
            service={currentService}
            vendors={currentService.vendors.map((vendor) => vendors[vendor])}
            onVendorToggle={({ service, vendor }) => {
              const currentVendors = selectedVendors[service.id];
              if (currentVendors.includes(vendor.id)) {
                setSelectedVendors({
                  ...selectedVendors,
                  [service.id]: currentVendors.filter((c) => c !== vendor.id),
                });
              } else {
                setSelectedVendors({
                  ...selectedVendors,
                  [service.id]: [...currentVendors, vendor.id],
                });
              }
            }}
            onServiceToggle={(service) => {
              const currentVendors = selectedVendors[service.id];

              if (currentVendors.length) {
                setSelectedVendors({
                  ...selectedVendors,
                  [service.id]: [],
                });
              } else {
                setSelectedVendors({
                  ...selectedVendors,
                  [service.id]: [...Object.keys(vendors).map(Number)],
                });
              }
            }}
            index={index}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default ServiceList;
