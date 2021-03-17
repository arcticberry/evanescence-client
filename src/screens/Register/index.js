import React, { useState } from "react";
import { connect } from "react-redux";
import { Field, Form, Formik, withFormik } from "formik";
import "./index.css";
import { createUser, signupWithGoogle } from "services/register/register.slice";
import { register } from "../../serviceWorker";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import RegistrationSchema from "./register.schema";

const Register = ({
  isCreatingUser,
  metaData,
  createUser,
  history,
  signupWithGoogle,
}) => {
  let [currentStep, setCurrentStep] = useState(0);
  const isOnLastStep = currentStep === 1;

  const registrationDetails = {
    email: "",
    confirmPassword: "",
    password: "",
    businessName: "",
    phone: "",
    countryId: 1,
  };

  const handleSubmit = (values) => {
    createUser(values, history);
  };

  const handleSignupWithGoogle = () => {
    signupWithGoogle(history);
  };

  return (
    <div className="auth-fluid">
      <div className="auth-fluid auth-fluid-right text-center">
        <div className="auth-user-testimonial">
          <h2 className="mb-3">I love the color!</h2>
          <p className="lead">
            <i className="mdi mdi-format-quote-open"></i> It's a elegent
            templete. I love it very much! .{" "}
            <i className="mdi mdi-format-quote-close"></i>
          </p>
          <p>- Hyper Admin User</p>
        </div>
      </div>
      <div className="auth-fluid-form-box" style={{ maxWidth: "70%" }}>
        <div className="align-items-center d-flex h-100">
          <div className="card-body card-body-form">
            <Formik
              initialValues={registrationDetails}
              onSubmit={handleSubmit}
              validationSchema={RegistrationSchema}
            >
              {({ errors, touched, setFieldValue, validateForm }) => {
                return (
                  <Form action="#">
                    <h4 className="mt-0">Free Sign Up</h4>
                    <p className="text-muted mb-4">
                      Don't have an account? Create your account, it takes less
                      than a minute
                    </p>
                    <a
                      onClick={() => handleSignupWithGoogle()}
                      className="btn btn-block btn-primary mb-3"
                    >
                      Login With Google
                    </a>
                    <ul className="nav nav-pills nav-justified form-wizard-header mb-3">
                      <li
                        className="nav-item"
                        onClick={() => setCurrentStep(0)}
                      >
                        <a
                          data-toggle="tab"
                          className={`${
                            currentStep == 0
                              ? "nav-link rounded-0 pt-2 pb-2 active"
                              : "nav-link rounded-0 pt-2 pb-2"
                          }`}
                        >
                          <i className="mdi mdi-account-circle mr-1"></i>
                          <span className="d-none d-sm-inline">
                            Business Info.
                          </span>
                        </a>
                      </li>
                      <li
                        className="nav-item"
                        onClick={() => setCurrentStep(1)}
                      >
                        <a
                          data-toggle="tab"
                          className={`${
                            currentStep == 1
                              ? "nav-link rounded-0 pt-2 pb-2 active"
                              : "nav-link rounded-0 pt-2 pb-2"
                          }`}
                        >
                          <i className="mdi mdi-face-profile mr-1"></i>
                          <span className="d-none d-sm-inline">Password</span>
                        </a>
                      </li>
                    </ul>
                    <div
                      id="bar"
                      className="progress mb-3"
                      style={{ height: "7px" }}
                    >
                      <div
                        className="bar progress-bar progress-bar-striped progress-bar-animated bg-success"
                        style={{ width: `${50 * (currentStep + 1)}%` }}
                      ></div>
                    </div>
                    <div className={currentStep === 0 ? "d-block" : "d-none"}>
                      <div className="form-group">
                        <label htmlFor="fullname">Business Name</label>
                        <Field
                          className="form-control"
                          type="text"
                          name="businessName"
                          placeholder="Enter your Business Name"
                        />
                        {errors.businessName && touched.businessName ? (
                          <div className="invalid-feedback">
                            {errors.businessName}
                          </div>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <label htmlFor="emailaddress">Email address</label>
                        <Field
                          className="form-control"
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                        />
                        {errors.email && touched.email ? (
                          <div className="invalid-feedback">{errors.email}</div>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <label>Telephone</label>
                        <div className="d-flex">
                          <select
                            name="countryId"
                            required
                            onChange={(e) =>
                              setFieldValue("countryId", e.target.value)
                            }
                            className="form-control custom-select col-md-3 border-right-radius"
                          >
                            {metaData.length
                              ? metaData[0].countries.map((country, keys) => (
                                  <option key={country.id} value={country.id}>
                                    {country.phone_code}
                                  </option>
                                ))
                              : null}
                          </select>
                          ;
                          <Field
                            type="tel"
                            name="phone"
                            className="form-control border-left-radius"
                            data-toggle="input-mask"
                            placeholder="Enter your Telephone Number"
                            data-mask-format="0000-0000"
                          />
                        </div>
                        {errors.phone && touched.phone ? (
                          <div className="invalid-feedback">{errors.phone}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className={currentStep === 1 ? "d-block" : "d-none"}>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Field
                          className="form-control"
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Enter your password"
                        />
                        {errors.password && touched.password ? (
                          <div className="invalid-feedback">
                            {errors.password}
                          </div>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Confirm Password</label>
                        <Field
                          className="form-control"
                          type="password"
                          name="confirmPassword"
                          placeholder="Confim your password"
                        />
                        {errors.confirmPassword && touched.confirmPassword ? (
                          <div className="invalid-feedback">
                            {errors.confirmPassword}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="checkbox-signup"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="checkbox-signup"
                        >
                          I accept{" "}
                          <a href="#" className="text-muted">
                            Terms and Conditions
                          </a>
                        </label>
                      </div>
                    </div>
                    <div className="form-group mb-0 text-center">
                      {isOnLastStep ? (
                        <button
                          type="submit"
                          disabled={isCreatingUser}
                          className={"btn btn-primary pull-right"}
                        >
                          {isCreatingUser ? (
                            <span
                              className="spinner-border spinner-border-sm mr-1"
                              role="status"
                              aria-hidden="true"
                            ></span>
                          ) : null}
                          {isCreatingUser ? "Submitting" : "Submit"}
                        </button>
                      ) : (
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentStep(currentStep + 1);
                          }}
                          className={`btn btn-dark pull-right`}
                        >
                          {"Next"}
                        </a>
                      )}
                    </div>
                  </Form>
                );
              }}
            </Formik>
            <footer className="footer footer-alt">
              <p className="text-muted">
                Already have account?{" "}
                <Link to="/" className="text-muted ml-1">
                  <b>Log In</b>
                </Link>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ register, app }) => {
  return {
    isCreatingUser: register.isCreatingUser,
    metaData: app.metaData,
  };
};

const mapDispatchToProps = (dispatch) => ({
  createUser: bindActionCreators(createUser, dispatch),
  signupWithGoogle: bindActionCreators(signupWithGoogle, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
