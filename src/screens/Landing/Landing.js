import React from "react";
import styles from "./Landing.module.scss";
import { Link } from "react-router-dom";
import Logo from "components/Logo";
import { ReactComponent as Gauntlet } from "assets/gauntlet.svg";

const LandingPage = () => {
  const { REACT_APP_NAME } = process.env;
  return (
    <>
      <nav class="navbar navbar-expand-lg py-lg-3 navbar-dark">
        <div class="container">
          <a href="index.html" class="navbar-brand mr-lg-5">
            <Logo color={styles.logoColor} />
          </a>

          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="mdi mdi-menu"></i>
          </button>

          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav mr-auto align-items-center">
              <li class="nav-item mx-lg-1">
                <a class="nav-link active" href="#">
                  {REACT_APP_NAME}
                </a>
              </li>
              <li class="nav-item mx-lg-1">
                <a class="nav-link" href="#">
                  Features
                </a>
              </li>
              <li class="nav-item mx-lg-1">
                <a class="nav-link" href="#faq">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
            <ul class="navbar-nav ml-auto align-items-center">
              <li class="nav-item mr-0">
                <Link to="/login" class="nav-link d-lg-none">
                  Login
                </Link>
                <Link
                  to="/login"
                  class="btn btn-md btn-link font-weight-bold border-primary btn-rounded d-none d-lg-inline-flex"
                >
                  Sign in <i class="mdi mdi-chevron-right mr-2"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <section className={styles.hero__section}>
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-6">
              <div class="">
                <h1 class="text-primary font-weight-semibold mb-4 mt-3 hero-title">
                  Stressless payment integrations now easier with{" "}
                  {REACT_APP_NAME}.
                </h1>

                <p class="mb-4 text-light">
                  {REACT_APP_NAME} is the simplest way to collect payments using
                  solutions you already know and love.
                </p>

                <a
                  href="#"
                  target="_blank"
                  class="btn btn-md btn-rounded btn-primary text-secondary font-weight-bold"
                >
                  Start now <i class="mdi mdi-chevron-right ml-2"></i>
                </a>
              </div>
            </div>
            <div class="col-md-5 offset-md-1">
              <div class="text-md-right mt-3 mt-md-0">
                <Gauntlet />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="py-5">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="text-center">
                <i class="mdi mdi-heart-multiple-outline h2 text-muted"></i>
                <h3>
                  Ease of <span class="text-danger">thought</span>
                </h3>
              </div>
            </div>
          </div>
          <div class="row my-5 py-5 align-items-center">
            <div class="col-lg-5">
              <img
                src="assets/images/features-1.svg"
                class="img-fluid"
                alt=""
              />
            </div>
            <div class="col-lg-5 offset-lg-2">
              <h3 className="text-secondary">
                One tap to{" "}
                <span className="text-secondary">
                  switch any payment provider
                </span>
              </h3>
              <p class="mt-4 text-muted">
                You don't have to setup an account for each provider. With{" "}
                {REACT_APP_NAME}, you can manage your payment providers from one
                super-friendly dashboard.
              </p>

              <a href="#" class="btn btn-light btn-rounded mt-3">
                Learn more <i class="mdi mdi-arrow-right ml-1"></i>
              </a>
            </div>
          </div>

          <div class="row py-5 align-items-center my-6">
            <div class="col-lg-5">
              <h3 class="text-secondary">Connecting Payments</h3>
              <p class="text-muted mt-4">
                {REACT_APP_NAME} brings you the power of Paystack, Flutterwave
                and more. <br />
                Whenever we add support for a new provider, you can seamlessly
                integrate. Sounds like magic.
              </p>

              <a href="#" class="btn btn-light btn-rounded mt-3">
                Sign up <i class="mdi mdi-arrow-right ml-1"></i>
              </a>
            </div>
            <div class="col-lg-5 offset-lg-1">
              <img
                src="assets/images/features-2.svg"
                class="img-fluid"
                alt=""
              />
            </div>
          </div>

          <div class="row my-5 py-5 align-items-center">
            <div class="col-lg-5">
              <img
                src="assets/images/features-1.svg"
                class="img-fluid"
                alt=""
              />
            </div>
            <div class="col-lg-4 offset-lg-2">
              <h3 class="">Take Control</h3>
              <p class="mt-3 text-muted">
                Already got existing integrations? You can still bring them over
                with you. Just point us to it and you're good to go!
              </p>

              <a href="#" class="btn btn-light btn-rounded mt-3">
                Learn more <i class="mdi mdi-arrow-right ml-1"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section class="py-5" id="faq">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 mb-5">
              <div class="text-center">
                <h1 class="mt-0">
                  <i class="mdi mdi-frequently-asked-questions text-primary"></i>
                </h1>
                <h3>
                  Frequently Asked <span class="text-secondary">Questions</span>
                </h3>
                <p class="text-muted mt-2">
                  A lot of customers ask us these questions.
                  <br />
                  Got more questions? You can contact us.
                </p>

                <button type="button" class="btn btn-info btn-sm mt-2 ml-1">
                  <i class="mdi mdi-twitter mr-1"></i> Send us a tweet
                </button>
              </div>
            </div>
          </div>

          <div class="row mt-5">
            <div class="col-lg-5 mb-5 offset-lg-1">
              <div>
                <div class="faq-question-q-box mr-3">Q.</div>
                <h4 className={`h5 faq-question text-body`}>
                  Can I use {REACT_APP_NAME} with my current setup?
                </h4>
                <p class="faq-answer mb-5 py-2 text-muted">
                  Yup, the marketplace license allows you to use this theme in
                  any end products. For more information on licenses, please
                  refere{" "}
                  <a
                    href="https://themes.getbootstrap.com/licenses/"
                    target="_blank"
                  >
                    here
                  </a>
                  .
                </p>
              </div>

              <div>
                <div class="faq-question-q-box mr-3">Q.</div>
                <h4 class="h5 text-brand">Do you provide support?</h4>
                <p class="faq-answer mb-5 py-2 text-muted">
                  Use our dedicated support email (support@coderthemes.com) to
                  send your issues or feedback. We are here to help anytime.
                </p>
              </div>
            </div>
            <div class="col-lg-5 mb-5 offset-lg-1">
              <div>
                <div class="faq-question-q-box mr-3">Q.</div>
                <h4 className={`h5 faq-question text-body`}>
                  Can I use {REACT_APP_NAME} with my current setup?
                </h4>
                <p class="faq-answer mb-5 py-2 text-muted">
                  Yup, the marketplace license allows you to use this theme in
                  any end products. For more information on licenses, please
                  refere{" "}
                  <a
                    href="https://themes.getbootstrap.com/licenses/"
                    target="_blank"
                  >
                    here
                  </a>
                  .
                </p>
              </div>

              <div>
                <div class="faq-question-q-box mr-3">Q.</div>
                <h4 class="h5 faq-question text-body">
                  Do you provide support?
                </h4>
                <p class="faq-answer mb-5 py-2 text-muted">
                  Use our dedicated support email (support@coderthemes.com) to
                  send your issues or feedback. We are here to help anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer class="bg-secondary py-5">
        <div class="container py-5">
          <div class="row">
            <div class="col-lg-10">
              <img src="assets/images/payreflect.svg" alt="" height={40} />
              <p class="text-primary mt-4">
                {REACT_APP_NAME} makes it easier to collect payments <br />{" "}
                using processors you already integrate.
              </p>

              <ul class="social-list mt-5 list-inline mt-3">
                <li class="list-inline-item text-center">
                  <a
                    href="javascript: void(0);"
                    class="social-list-item border-info text-info"
                  >
                    <i class="mdi mdi-twitter"></i>
                  </a>
                </li>
              </ul>
            </div>

            <div class="col-lg-2 mt-3 mt-lg-0">
              <ul class="list-unstyled pl-0 mb-0 mt-3">
                <li class="mt-2">
                  <a href="javascript: void(0);" class="text-white-50">
                    About Us
                  </a>
                </li>
                <li class="mt-2">
                  <a href="javascript: void(0);" class="text-white-50">
                    Documentation
                  </a>
                </li>
                <li class="mt-2">
                  <a href="javascript: void(0);" class="text-white-50">
                    Blog
                  </a>
                </li>
              </ul>
              <div class="my-5">
                <p class="text-white-50 mt-4 mb-0">
                  {`© 2020 ${REACT_APP_NAME}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
