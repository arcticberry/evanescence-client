import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import { SideBar } from "../screens/Dashboard/components/Sidebar";
import TopBar from "../components/Topbar";
import Footer from "../components/Footer";
import Home from "../screens/Dashboard/Dashboard";
import Application from "../screens/Dashboard/screens/Applications";
import ApplicationDetail from "../screens/Dashboard/screens/Applications/screens/ApplicationDetail";
import Login from "../screens/Login";
import Register from "../screens/Register";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "../screens/Landing/index";
import { fetchMetaData } from "../services/core/core.slice";
import AllApplication from "../screens/Dashboard/screens/Applications/Applications";

function App({ fetchMetaData }) {
  useEffect(() => {
    fetchMetaData();
  }, []);
  
  return (
      <Router>
        <Route component={LandingPage} exact path="/" />
        <Switch>
          <>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route path="/dashboard">
              <Route component={SideBar} path="/account" />
              <Route component={TopBar} path="/account" />

              <div className="content-page">
                <div className="content">
                  <Route exact path="/dashboard" component={Home} />
                  <Route
                    exact
                    path="/dashboard/create-application"
                    component={Application}
                  />
                  <Route
                    exact
                    path="/dashboard/applications"
                    component={AllApplication}
                  />
                  <Route
                    exact
                    path="/applications/:application_id"
                    component={ApplicationDetail}
                  />
                </div>
              </div>
            </Route>
          </>
        </Switch>
        <Route component={Footer} exact path="/dashboard" />
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClickgit
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
  );
}

const mapDispatchToProps = (dispatch) => ({
  fetchMetaData: bindActionCreators(fetchMetaData, dispatch),
});
export default connect(null, mapDispatchToProps)(App);
