import React, { lazy } from "react";
import { Redirect } from "react-router-dom";

const Applications = lazy(() =>
  import("screens/Dashboard/screens/Applications")
);
const CreateApplication = lazy(() =>
  import("screens/Dashboard/screens/Applications/screens/CreateApplication")
);

export default [
  {
    path: "/dashboard",
    label: "Dashboard",
    Component: () => <Redirect to={`/dashboard/applications`} />,
  },
  {
    path: "/dashboard/applications",
    label: "Applications",
    Component: Applications,
  },
  {
    path: "/dashboard/applications/create",
    label: "Create Application",
    Component: CreateApplication,
    exact: false,
  },
];
