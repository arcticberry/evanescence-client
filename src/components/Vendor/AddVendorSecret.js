import React from "react";

const AddVendorSecret = ({ vendor, secret, handleSecretChange }) => {
  return (
    <div className="form-inline form-group mb-4">
      <label className="col-4">
        <span className="mr-2">
          <img src={vendor.brand_url} style={{ width: "8em" }} />
        </span>
      </label>
      <input
        type="text"
        name={`vendor-${vendor.id}`}
        onChange={handleSecretChange}
        value={secret}
        className="form-control col-8"
      />
    </div>
  );
};

export default AddVendorSecret;
