import React, { useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";

import { Formik, Form } from "formik";

import routes from "./routes";
import AuthenticatedHoc from "HOC/WithAuthenticated";
// import "./application.css";
import { fetchServices } from "services/application/service.slice";
import { createApplication } from "services/application/application.slice";

import { RenderRoutes } from "components/AppRouter";
import { ServiceList } from "components/Services";
import { VendorSecretsForm } from "components/Vendor";
import Breadcrumb from "components/Breadcrumb";
import SectionTitle from "components/SectionTitle";
import Steps from "components/Steps";

const NotFound = lazy(() => import("screens/NotFound"));

const CreateApplication = ({
  crumbs,
  fetchServices,
  services,
  createApplication,
  history,
}) => {
  const servicesLoaded =
    "entities" in services ? services.entities.services : {};
  const vendorsLoaded = "entities" in services ? services.entities.vendors : {};

  const [selectedVendors, setSelectedVendors] = React.useState({});

  const [vendorSecrets, setVendorSecrets] = React.useState({});

  const [step, setStep] = React.useState(0);

  const [applicationName, setApplicationName] = React.useState("");

  React.useEffect(() => {
    if (!services.hasOwnProperty("entities")) {
      fetchServices();
    } else {
      setSelectedVendors({
        ...Object.keys(servicesLoaded).reduce(
          (serviceMap, service) => ({
            ...serviceMap,
            [servicesLoaded[service].id]: [...servicesLoaded[service].vendors],
          }),
          {}
        ),
      });
    }
  }, [services]);

  const retrieveSelectedVendors = () => {
    const selectedVendorIds = [
      ...new Set(
        Object.values(selectedVendors).reduce(
          (flat, currentVendors) => [...flat, ...currentVendors],
          []
        )
      ),
    ];

    return selectedVendorIds.map(
      (selectedVendorId) => vendorsLoaded[selectedVendorId]
    );
  };

  const handleInputChange = ({ target }) => {
    setApplicationName(target.value);
  };

  const handleSubmit = () => {
    const services = Object.keys(selectedVendors)
      .filter((selectedVendorId) => selectedVendors[selectedVendorId].length)
      .map((selectedVendorId) => ({
        service_id: Number(selectedVendorId),
        vendors: selectedVendors[selectedVendorId],
      }));
    const secrets = Object.keys(vendorSecrets).map(
      (vendorId) => vendorSecrets[vendorId]
    );

    const payload = {
      services,
      vendor_secrets: secrets,
      label: applicationName,
    };

    createApplication(payload, history);
  };

  const updateVendorSecret = (vendorSecret) => {
    setVendorSecrets({
      ...vendorSecrets,
      [vendorSecret.vendor_id]: vendorSecret,
    });
  };

  const formValues = {
    applicationName: "",
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 my-3">
            <Breadcrumb items={crumbs} />
          </div>
        </div>
      </div>
      <Formik initialValues={formValues}>
        <BrowserRouter>
          <Suspense fallback={() => <>Loading...</>}>
            <Switch>
              <RenderRoutes routes={routes} />
              <Redirect to="/dashboard" />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </Formik>

      {/* <div className="row mt-2 py-5 justify-content-around align-items-center">
        <div className="col-lg-6">
          <section className="mb-5">
            <SectionTitle
              title="It starts with a name."
              message="A simple name is always a nice start."
            />
          </section>

          <Steps steps={crumbs} />

          <div className="card col-md-12 d-none  ml-5 mt-3">
            <div className="card-body h-100">
              {step == 0 && (
                <div className=" input-container">
                  <hr />
                  <div className="form-group mt-4">
                    <label className=" text-muted input-label">
                      Application Name
                    </label>
                    <input
                      type="text"
                      name="applicationName"
                      value={applicationName}
                      onChange={handleInputChange}
                      className="form-control col-12"
                      data-toggle="input-mask"
                      data-mask-format="00/00/0000"
                    />
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className=" input-container pb-3">
                  <h3 className="m-0 font-weight-normal mb-2 bold cta-box-title info">
                    Add application services
                  </h3>
                  <p className="text-muted mt-3">
                    Select the services you would like to use for this
                    application
                  </p>
                  <hr />
                  <ServiceList
                    className="mb-2"
                    services={servicesLoaded}
                    vendors={vendorsLoaded}
                    selectedVendors={selectedVendors}
                    setSelectedVendors={setSelectedVendors}
                  />
                </div>
              )}

              {step === 2 && (
                <div className=" input-container">
                  <h3 className="m-0 font-weight-normal mb-2 bold cta-box-title mt-2 info">
                    Selected vendors for your application.
                  </h3>
                  <p className="text-muted mt-3">
                    Add your keys if you prefer using your existing keys. Your
                    keys are encrypted and safe with us.
                  </p>

                  <hr />
                  <div className="form-group mt-3">
                    <VendorSecretsForm
                      updateVendorSecret={updateVendorSecret}
                      vendorSecrets={vendorSecrets}
                      vendors={retrieveSelectedVendors()}
                    />
                  </div>
                </div>
              )}

              <div className="h-50 mt-2">
                <div
                  className={`row  ${
                    step == 0
                      ? "justify-content-end"
                      : "justify-content-between"
                  }`}
                >
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setStep(step - 1);
                      }}
                      className="btn btn-primary wizard-btn"
                    >
                      Previous
                    </button>
                  )}
                  {step < 2 && (
                    <button
                      type="button"
                      onClick={() => {
                        setStep(step + 1);
                      }}
                      disabled={!applicationName.length}
                      className="btn btn-primary wizard-btn"
                    >
                      Next
                    </button>
                  )}

                  {step === 2 && (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="btn btn-primary wizard-btn"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

const mapStateToProps = ({ service }) => {
  return {
    services: service.services,
  };
};

const mapDispatchToProps = { fetchServices, createApplication };

export default AuthenticatedHoc(
  connect(mapStateToProps, mapDispatchToProps)(CreateApplication)
);
