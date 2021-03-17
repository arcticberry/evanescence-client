import React, { lazy } from "react";
import { Redirect } from "react-router-dom";

const AddApplicationName = lazy(() =>
  import(
    "screens/Dashboard/screens/Applications/screens/CreateApplication/screens/AddApplicationName"
  )
);

const PickServices = lazy(() =>
  import(
    "screens/Dashboard/screens/Applications/screens/CreateApplication/screens/PickServices"
  )
);

export default [
  {
    path: "/dashboard/applications/create",
    label: "Create",
    Component: AddApplicationName,
  },
  {
    path: "/dashboard/applications/create/pick-services",
    label: "Pick services",
    exact: true,
    Component: PickServices,
  },
  {
    path: "/dashboard/applications/create/add-keys",
    label: "Add keys",
    exact: true,
    Component: AddApplicationName,
  },
];
