import React from "react";
import AddVendorSecret from "./AddVendorSecret";

const VendorSecretsForm = ({ vendors, vendorSecrets, updateVendorSecret }) => {
  console.log({ vendors });
  return (
    <div>
      {vendors.map((vendor, index) => {
        return (
          <AddVendorSecret
            vendor={vendor}
            secret={
              vendorSecrets.hasOwnProperty(vendor.id)
                ? vendorSecrets[vendor.id].secret
                : ""
            }
            handleSecretChange={(event) => {
              updateVendorSecret({
                vendor_id: vendor.id,
                secret: event.target.value,
                label: vendor.label,
              });
            }}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default VendorSecretsForm;
