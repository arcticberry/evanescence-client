import React from "react";
import { Link } from "react-router-dom";
import { Field } from "formik";

import CheckboxRound from "components/CheckboxRound";
import Steps from "components/Steps";
import SectionTitle from "components/SectionTitle";
import CheckboxCard from "components/CheckboxCard";
import Logo from "components/Logo";

const PickServices = ({ crumbs }) => {
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
              <div className="form-group col-lg-10 mx-auto mt-4">
                <section className="d-flex">
                  <div className="mr-4">
                    <CheckboxRound id="make-payment" />
                  </div>
                  <div className="w-100">
                    <h5 className="h6">Make Payment</h5>
                    <p className="text-muted small">
                      Allows you collect payments through any of the vendors you
                      add below
                    </p>

                    <section className="col-md-6">
                      <CheckboxCard label={"paystack"}>
                        <Logo />
                      </CheckboxCard>
                    </section>
                  </div>
                </section>

                <div className="py-3 d-flex justify-content-space-between">
                  <Link
                    to="/dashboard/applications/create"
                    className="btn btn-sm btn-outline font-weight-bold"
                  >
                    <i className="mdi mdi-chevron-left"></i>
                    Back
                  </Link>
                  <Link
                    to="/dashboard/applications/create/add-keys"
                    className="btn btn-sm btn-primary font-weight-bold"
                  >
                    Add keys
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

export default PickServices;
