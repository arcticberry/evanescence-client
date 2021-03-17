import React from "react";
import { Field, Form, Formik, FormikProps } from "formik";
import { Link } from "react-router-dom";
import Logo from "components/Logo";
import { loginUser } from "services/login/login.slice";
import { connect } from "react-redux";
import "./login.css";

const Login = ({ loginUser, history }) => {
  const loginDetails = {
    uid: "",
    password: "",
  };

  const handleFormSubmission = async (values) => {
    await loginUser(values, history);
  };
  return (
    <div className="account-pages height-full">
      <div className="container-fluid height-full">
        <div className="row justify-content-center height-full">
          <div className="col-md-6">
            <div className="mt-5">
              <a href="index.html">
                <span>
                  <Logo />
                </span>
              </a>
            </div>
            <div className="row align-items-center h-100">
              <div className="w-75">
                <div className="card-body p-4">
                  <div>
                    <h4 className="text-dark-50 mt-0 font-weight-bold">
                      Log In
                    </h4>
                  </div>
                  <Formik
                    initialValues={loginDetails}
                    onSubmit={async (values) => handleFormSubmission(values)}
                  >
                    <Form action="#">
                      <div className="form-group">
                        <label htmlFor="emailaddress">Email</label>
                        <Field
                          className="form-control"
                          type="email"
                          id="emailaddress"
                          required=""
                          name="uid"
                          placeholder="Enter your email"
                        />
                      </div>

                      <div className="form-group">
                        <a
                          href="pages-recoverpw.html"
                          className="float-right text-blue"
                        >
                          <small>Forgot your password?</small>
                        </a>
                        <label htmlFor="password">Password</label>
                        <div className="input-group input-group-merge">
                          <Field
                            name="password"
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Enter your password"
                          />
                          <div
                            className="input-group-append"
                            data-password="false"
                          >
                            <div className="input-group-text">
                              <span className="password-eye"></span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="form-group mb-0 text-center w-100">
                        <button className="btn btn-primary w-100" type="submit">
                          Log In
                        </button>
                      </div>
                    </Form>
                  </Formik>
                </div>
                <div className="col-md-12 mt-3">
                  <div className="col-12 text-center">
                    <p className="text-muted text-left">
                      Don't have an account?{" "}
                      <Link to="/register" className="text-blue ml-1">
                        <b>Sign Up</b>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 bg-color"></div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = { loginUser };

export default connect(null, mapDispatchToProps)(Login);
