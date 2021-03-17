import * as React from "react";
import { Link, withRouter } from "react-router-dom";
import Logo, { LogoHaloed } from "components/Logo";
import styles from "./sidebar.scss";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-heading py-5">
        <a href={"/"}>
          <div className="w-25">
            <LogoHaloed collapsed color={"#fff"} />
          </div>
        </a>
      </div>
      <ul className="list-group list-group-flush">
        <Link
          to="/dashboard"
          className="list-group-item active d-flex align-items-center"
        >
          <i className="icon mdi mdi-desktop-mac-dashboard"></i>
          <span>Dashboard</span>
        </Link>

        <Link
          to="/dashboard/transactions"
          className="list-group-item d-flex align-items-center"
        >
          <i className="icon uil-document"></i>
          <span> API Docs </span>
        </Link>
      </ul>

      <div className="list-group-bottom">
        <Link
          to="/dashboard/transactions"
          className="list-group-item text-primary"
        >
          <i className="icon uil-user"></i>
          <span className="">Manage account </span>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
