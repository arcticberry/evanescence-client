import React from "react";
import { connect } from "react-redux";

const TopBar = ({ profile }) => {
  return (
    <div className="navbar-custom pr-0">
      <ul className="list-unstyled topbar-right-menu float-right mb-0">
        <li className="dropdown notification-list d-lg-none">
          <a
            className="nav-link dropdown-toggle arrow-none"
            data-toggle="dropdown"
            href="#"
            role="button"
            aria-haspopup="false"
            aria-expanded="false"
          >
            <i className="dripicons-search noti-icon"></i>
          </a>
          <div className="dropdown-menu dropdown-menu-animated dropdown-lg p-0">
            <form className="p-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search ..."
                aria-label="Recipient's username"
              />
            </form>
          </div>
        </li>

        <li className="dropdown notification-list">
          <a
            className="nav-link dropdown-toggle arrow-none"
            data-toggle="dropdown"
            href="#"
            role="button"
            aria-haspopup="false"
            aria-expanded="false"
          >
            <i className="dripicons-bell noti-icon"></i>
            <span className="noti-icon-badge"></span>
          </a>
        </li>

        <li className="notification-list">
          <a className="nav-link right-bar-toggle" href="#;">
            <i className="dripicons-gear noti-icon"></i>
          </a>
        </li>

        <li className="dropdown notification-list">
          <a
            className="nav-link dropdown-toggle nav-user arrow-none mr-0"
            data-toggle="dropdown"
            href="#"
            role="button"
            aria-haspopup="false"
            aria-expanded="false"
          >
            <span className="account-user-avatar">
              <img
                src="/assets/images/users/avatar-1.jpg"
                alt="user-image"
                className="rounded-circle"
              />
            </span>
            <span>
              <span className="account-user-name">{profile.profile.email}</span>
              {/* <span className="account-position">Founder</span> */}
            </span>
          </a>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(TopBar);
