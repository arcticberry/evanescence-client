import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import AuthenticatedHoc from "../../../../../HOC/WithAuthenticated";
import {
  fetchApplication,
  controlAppServiceActivation,
} from "../../../../../services/application/application.slice";
const ApplicationDetail = ({
  fetchApplication,
  application,
  controlAppServiceActivation,
  match,
  history,
}) => {
  const textAreaRef = useRef();
  const [copySuccess, setCopySuccess] = useState("");

  const [apiKeys, setApiKeys] = useState({
    live_api_key: false,
    live_secret_key: false,
    test_api_key: false,
    test_secret_key: false,
  });

  const copyToClipboard = (event) => {
    console.log(textAreaRef.current.select());
    document.execCommand("copy");

    event.target.focus();
    setCopySuccess("Copied");
  };

  const handleKeyVisibility = (event) => {
    const id = event.target.id;

    setApiKeys({
      ...apiKeys,
      [id]: !apiKeys[id],
    });
  };

  useEffect(() => {
    fetchApplication(history, match);
  }, []);

  const handleServiceActivation = async (event, applicationId, serviceId) => {
    await controlAppServiceActivation(applicationId, serviceId, {
      is_active: event.target.checked,
    });
    await fetchApplication(history, match);
  };

  return (
    <div className="row ">
      <div className="col-md-12">
        <div className="card">
          <div className="card-body">
            <div className="row justify-content-between">
              <h3>Test App</h3>
              <div className="col-md-2">
                <div className="d-flex justify-content-end align-items-center ">
                  <span className="badge badge-success">Live</span>
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-xl-3 col-lg-6">
                <div className="card widget-flat">
                  <div className="card-body">
                    <div className="float-right">
                      <i className="mdi mdi-currency-btc widget-icon bg-danger rounded-circle text-white"></i>
                    </div>
                    <h5
                      className="text-muted font-weight-normal mt-0"
                      title="Revenue"
                    >
                      Revenue
                    </h5>
                    <h3 className="mt-3 mb-3">$6,254</h3>
                    <p className="mb-0 text-muted">
                      <span className="badge badge-info mr-1">
                        <i className="mdi mdi-arrow-down-bold"></i> 7.00%
                      </span>
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6">
                <div className="card widget-flat bg-success text-white">
                  <div className="card-body">
                    <div className="float-right">
                      <i className="mdi mdi-account-multiple widget-icon bg-white text-success"></i>
                    </div>
                    <h6 className="text-uppercase mt-0" title="Customers">
                      Customers
                    </h6>
                    <h3 className="mt-3 mb-3">36,254</h3>
                    <p className="mb-0">
                      <span className="badge badge-light-lighten mr-1">
                        <i className="mdi mdi-arrow-up-bold"></i> 5.27%
                      </span>
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className=" col-md-6">
                <div className="row">
                  <div className="col-md-12"></div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Api Key</label>
                      <div
                        className="d-flex  pr-2"
                        style={{ border: "1px solid #eee" }}
                      >
                        <input
                          style={{ border: "none" }}
                          type={apiKeys.live_api_key ? "text" : "password"}
                          name="live_api_key"
                          className={`form-control apikey ${
                            apiKeys.live_api_key
                              ? "api_key_font"
                              : "api_key_hidden_font"
                          }  `}
                          ref={textAreaRef}
                          readOnly={application.api_key}
                          value={application.api_key}
                        />
                        <span
                          id="live_api_key"
                          className="uil-eye"
                          onClick={handleKeyVisibility}
                        ></span>

                        <span
                          onClick={copyToClipboard}
                          className="uil-copy"
                        ></span>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Api Secret</label>
                      <div
                        className="d-flex pr-2"
                        style={{ border: "1px solid #eee" }}
                      >
                        <input
                          style={{ border: "none" }}
                          type={apiKeys.live_api_secret ? "text" : "password"}
                          id="example-readonly"
                          className={`form-control apikey ${
                            apiKeys.live_api_secret
                              ? "api_key_font"
                              : "api_key_hidden_font"
                          }  `}
                          readOnly={application.live_api_secret}
                          value={application.api_secret}
                        />
                        {apiKeys.live_api_secret ? (
                          <span
                            id="live_api_secret"
                            onClick={handleKeyVisibility}
                            className=" uil-eye-slash"
                          ></span>
                        ) : (
                          <span
                            id="live_api_secret"
                            onClick={handleKeyVisibility}
                            className=" uil-eye"
                          ></span>
                        )}

                        <span className="uil-copy "></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <div className="dropdown float-right">
                      <a
                        href="#"
                        className="dropdown-toggle arrow-none card-drop"
                        data-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="mdi mdi-dots-vertical"></i>
                      </a>
                      <div className="dropdown-menu dropdown-menu-right">
                        <a href="javascript:void(0);" className="dropdown-item">
                          Settings
                        </a>

                        <a href="javascript:void(0);" className="dropdown-item">
                          Action
                        </a>
                      </div>
                    </div>
                    <h4 className="header-title mb-3">Transactions</h4>

                    <div
                      data-simplebar="init"
                      style={{ maxHeight: "320px", overflowX: "hidden" }}
                    >
                      <div
                        className="simplebar-wrapper"
                        style={{ margin: "0px" }}
                      >
                        <div className="simplebar-height-auto-observer-wrapper">
                          <div className="simplebar-height-auto-observer"></div>
                        </div>
                        <div className="simplebar-mask">
                          <div
                            className="simplebar-offset"
                            style={{ right: "0px", bottom: "0px" }}
                          >
                            <div
                              className="simplebar-content-wrapper"
                              style={{
                                height: "auto",
                                overflow: "hidden scroll",
                              }}
                            >
                              <div
                                className="simplebar-content"
                                style={{ padding: "0px" }}
                              >
                                <div className="row py-1 align-items-center">
                                  <div className="col-auto">
                                    <i className="mdi mdi-arrow-collapse-up text-danger font-18"></i>
                                  </div>
                                  <div className="col pl-0">
                                    <a
                                      href="javascript:void(0);"
                                      className="text-body"
                                    >
                                      Purchased Hyper Admin Template
                                    </a>
                                    <p className="mb-0 text-muted">
                                      <small>Today</small>
                                    </p>
                                  </div>
                                  <div className="col-auto">
                                    <span className="text-danger font-weight-bold pr-2">
                                      -$489.30
                                    </span>
                                  </div>
                                </div>
                                <div className="row py-1 align-items-center">
                                  <div className="col-auto">
                                    <i className="mdi mdi-arrow-collapse-down text-success font-18"></i>
                                  </div>
                                  <div className="col pl-0">
                                    <a
                                      href="javascript:void(0);"
                                      className="text-body"
                                    >
                                      Payment received Bootstrap Marketplace
                                    </a>
                                    <p className="mb-0 text-muted">
                                      <small>Yesterday</small>
                                    </p>
                                  </div>
                                  <div className="col-auto">
                                    <span className="text-success font-weight-bold pr-2">
                                      +$1578.54
                                    </span>
                                  </div>
                                </div>
                                <div className="row py-1 align-items-center">
                                  <div className="col-auto">
                                    <i className="mdi mdi-arrow-collapse-down text-success font-18"></i>
                                  </div>
                                  <div className="col pl-0">
                                    <a
                                      href="javascript:void(0);"
                                      className="text-body"
                                    >
                                      Freelance work - Shane
                                    </a>
                                    <p className="mb-0 text-muted">
                                      <small>16 Sep 2018</small>
                                    </p>
                                  </div>
                                  <div className="col-auto">
                                    <span className="text-success font-weight-bold pr-2">
                                      +$247.5
                                    </span>
                                  </div>
                                </div>
                                <div className="row py-1 align-items-center">
                                  <div className="col-auto">
                                    <i className="mdi mdi-arrow-collapse-up text-danger font-18"></i>
                                  </div>
                                  <div className="col pl-0">
                                    <a
                                      href="javascript:void(0);"
                                      className="text-body"
                                    >
                                      Hire new developer for work
                                    </a>
                                    <p className="mb-0 text-muted">
                                      <small>09 Sep 2018</small>
                                    </p>
                                  </div>
                                  <div className="col-auto">
                                    <span className="text-danger font-weight-bold pr-2">
                                      -$185.14
                                    </span>
                                  </div>
                                </div>
                                <div className="row py-1 align-items-center">
                                  <div className="col-auto">
                                    <i className="mdi mdi-arrow-collapse-down text-success font-18"></i>
                                  </div>
                                  <div className="col pl-0">
                                    <a
                                      href="javascript:void(0);"
                                      className="text-body"
                                    >
                                      Money received from paypal
                                    </a>
                                    <p className="mb-0 text-muted">
                                      <small>28 Aug 2018</small>
                                    </p>
                                  </div>
                                  <div className="col-auto">
                                    <span className="text-success font-weight-bold pr-2">
                                      +$684.45
                                    </span>
                                  </div>
                                </div>
                                <div className="row py-1 align-items-center">
                                  <div className="col-auto">
                                    <i className="mdi mdi-arrow-collapse-up text-danger font-18"></i>
                                  </div>
                                  <div className="col pl-0">
                                    <a
                                      href="javascript:void(0);"
                                      className="text-body"
                                    >
                                      Zairo landing purchased
                                    </a>
                                    <p className="mb-0 text-muted">
                                      <small>17 Aug 2018</small>
                                    </p>
                                  </div>
                                  <div className="col-auto">
                                    <span className="text-danger font-weight-bold pr-2">
                                      -$21.00
                                    </span>
                                  </div>
                                </div>
                                <div className="row py-1 align-items-center">
                                  <div className="col-auto">
                                    <i className="mdi mdi-arrow-collapse-up text-danger font-18"></i>
                                  </div>
                                  <div className="col pl-0">
                                    <a
                                      href="javascript:void(0);"
                                      className="text-body"
                                    >
                                      Purchased Ubold admin template
                                    </a>
                                    <p className="mb-0 text-muted">
                                      <small>17 Aug 2018</small>
                                    </p>
                                  </div>
                                  <div className="col-auto">
                                    <span className="text-danger font-weight-bold pr-2">
                                      -$32.89
                                    </span>
                                  </div>
                                </div>
                                <div className="row py-1 align-items-center">
                                  <div className="col-auto">
                                    <i className="mdi mdi-arrow-collapse-down text-success font-18"></i>
                                  </div>
                                  <div className="col pl-0">
                                    <a
                                      href="javascript:void(0);"
                                      className="text-body"
                                    >
                                      Interest received
                                    </a>
                                    <p className="mb-0 text-muted">
                                      <small>09 Sep 2018</small>
                                    </p>
                                  </div>
                                  <div className="col-auto">
                                    <span className="text-success font-weight-bold pr-2">
                                      +$784.55
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="simplebar-placeholder"
                          style={{ width: "auto", height: "495px" }}
                        ></div>
                      </div>
                      <div
                        className="simplebar-track simplebar-horizontal"
                        style={{ visibility: "hidden" }}
                      >
                        <div
                          className="simplebar-scrollbar"
                          style={{ width: "0px", display: "none" }}
                        ></div>
                      </div>
                      <div
                        className="simplebar-track simplebar-vertical"
                        style={{ visibility: "visible" }}
                      >
                        <div
                          className="simplebar-scrollbar"
                          style={{
                            height: "206px",
                            transform: "translate3d(0px, 114px, 0px)",
                            display: "block",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="card " style={{ minHeight: "410px" }}>
                  <div className="card-body">
                    <h4 className="header-title ">Application Vendors</h4>
                    <p>View all vendors activated for this application</p>
                    <div className="col">
                      {application?.vendors
                        ? application.vendors.map((vendor, index) => {
                            return (
                              <div key={index} className="mt-2">
                                <div className="row ">
                                  <div className="col-9 p-0">
                                    <div className=" vendor-card d-block mb-2 vendor">
                                      <div
                                        style={{ width: "80%", margin: "auto" }}
                                      >
                                        <img
                                          style={{
                                            width: "100%",
                                          }}
                                          className="card-img-top p-1"
                                          src={`${vendor.brand_url}`}
                                          alt="project image cap"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-3">
                                    <span className="edit-btn dripicons-document-edit "></span>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        : null}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-5">
                <div className="card" style={{ minHeight: "410px" }}>
                  <div className="card-body">
                    <h4 className="header-title ">Application Services</h4>
                    <p>View all services activated for this application</p>
                    <ul className="list-group">
                      {application?.application_services
                        ? application.application_services.map(
                            (service, index) => {
                              return (
                                <li
                                  key={index}
                                  className="list-group-item d-flex justify-content-between align-items-center"
                                  aria-disabled="true"
                                >
                                  <div>
                                    <i className="uil-google-drive-alt mr-1"></i>{" "}
                                    {service.service.label}
                                  </div>
                                  <div>
                                    <input
                                      type="checkbox"
                                      id={`switch${index}`}
                                      onChange={(event) =>
                                        handleServiceActivation(
                                          event,
                                          service.application_id,
                                          service.service_id
                                        )
                                      }
                                      checked={+service.is_active}
                                      data-switch="bool"
                                    />
                                    <label
                                      className="mb-0"
                                      htmlFor={`switch${index}`}
                                      data-on-label="On"
                                      data-off-label="Off"
                                    ></label>
                                  </div>
                                </li>
                              );
                            }
                          )
                        : null}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ application }) => ({
  application: application.application,
});

const mapDispatchToProps = { fetchApplication, controlAppServiceActivation };

export default AuthenticatedHoc(
  connect(mapStateToProps, mapDispatchToProps)(ApplicationDetail)
);
