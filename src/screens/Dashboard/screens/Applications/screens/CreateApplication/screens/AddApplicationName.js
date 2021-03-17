import React from "react";
import { Link } from "react-router-dom";
import { Field } from "formik";
import Steps from "components/Steps";
import SectionTitle from "components/SectionTitle";

const AddApplicationName = ({ crumbs }) => {
  return (
    <>
      <section className="mb-5">
        <SectionTitle
          title="It starts with a name."
          message="A simple name is always a nice start."
        />
      </section>

      <div className="row justify-content-around align-items-center">
        <div className="col-lg-8 offset-2">
          <Steps steps={crumbs} />
        </div>
      </div>

      <div className="row py-2 justify-content-around align-items-center">
        <div className="col-lg-8">
          <section className="card py-4">
            <div className="input-container">
              <div className="form-group col-lg-6 mx-auto mt-4">
                <label className="font-weight-bold d-flex align-items-center text-muted input-label justify-content-space-between">
                  <span>App name</span>
                  <button className="btn btn-sm btn-link">
                    Magic name generator
                  </button>
                </label>

                <Field
                  type="text"
                  name="applicationName"
                  //   value={applicationName}
                  //   onChange={handleInputChange}
                  className="form-control col-12"
                />
                <div className="py-3 d-flex justify-content-space-between">
                  <Link
                    to="/dashboard/applications"
                    className="btn btn-sm btn-outline font-weight-bold"
                  >
                    <i className="mdi mdi-chevron-left"></i>
                    Back
                  </Link>
                  <Link
                    to="/dashboard/applications/create/pick-services"
                    className="btn btn-sm btn-primary font-weight-bold"
                  >
                    Pick services
                    <i className="mdi mdi-chevron-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AddApplicationName;
