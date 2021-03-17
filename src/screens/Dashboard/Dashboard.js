import React, { Suspense, lazy } from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";

import AuthenticatedHoc from "HOC/WithAuthenticated";
import SideBar from "screens/Dashboard/components/Sidebar";
import "./dashboard.scss";
import routes from "./routes";
import { RenderRoutes } from "components/AppRouter";
import { generateCrumbsForRoute } from "utils";

const Dashboard = () => {
  let { path, url } = useRouteMatch();

  const Applications = lazy(() =>
    import("screens/Dashboard/screens/Applications")
  );
  const CreateApplication = lazy(() =>
    import("screens/Dashboard/screens/Applications/screens/CreateApplication")
  );
  const NotFound = lazy(() => import("screens/NotFound"));

  return (
    <div className="d-flex dashboard-wrapper h-100" id="wrapper">
      <SideBar />
      <section className="h-100" id="page-content-wrapper">
        <BrowserRouter>
          <Suspense fallback={() => <>Loading...</>}>
            <Switch>
              <RenderRoutes routes={routes} />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </BrowserRouter>
        {/* <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box">
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="#">Evanescence</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="#">Dashboard</a>
                    </li>
                    <li className="breadcrumb-item active">Projects</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </section>
    </div>
  );
};

export default AuthenticatedHoc(Dashboard);
// export default Dashboard;
