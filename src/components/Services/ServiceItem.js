import React, { useState } from "react";

function ServiceItem({
  vendors,
  service,
  selectedVendors,
  onVendorToggle,
  onServiceToggle,
}) {
  const [opened, setOpened] = useState(false);
  const serviceId = `customCheck-${service.id}`;

  return (
    <div className="card mb-2" onClick={() => setOpened(!opened)}>
      <div className="card-header" id="headingFour">
        <div className="m-0">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              name={service.id}
              id={serviceId}
              checked={selectedVendors.length}
              disabled={!vendors.length}
              onChange={() => onServiceToggle(service)}
            />
            <label className="custom-control-label" htmlFor={serviceId}>
              {service.label}
            </label>
            <i
              className={`mdi mdi-chevron-${
                opened ? "right" : "down"
              } accordion-arrow`}
            ></i>
          </div>
        </div>
      </div>

      <div
        id="collapseFour"
        className={`collapse ${opened ? `show` : ``}`}
        aria-labelledby="headingFour"
        data-parent="#custom-accordion-one"
      >
        <div className="card-body">
          <div className="ml-2">
            {vendors.map((vendor, index) => {
              const vendorKey = `${serviceId}-${vendor.id}`;
              return (
                <div className="custom-control custom-checkbox" key={index}>
                  <input
                    type="checkbox"
                    name={`${vendor.id}`}
                    className="custom-control-input"
                    checked={selectedVendors.includes(vendor.id)}
                    onChange={() => onVendorToggle({ service, vendor })}
                    id={vendorKey}
                  />
                  <label className="custom-control-label" htmlFor={vendorKey}>
                    <span className="mr-2">
                      <img style={{ width: "8em   " }} src={vendor.brand_url} />
                    </span>
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ServiceItem;
