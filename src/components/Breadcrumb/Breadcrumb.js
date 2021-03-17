import React from "react";
import { Link } from "react-router-dom";
import styles from "./Breadcrumb.module.scss";

function Breadcrumb({ items }) {
  return (
    <ol className="breadcrumb">
      {items.map(({ label, href, active }, idx) => {
        const activeClass = active ? "active" : "";

        return (
          <li
            className={`breadcrumb-item ${activeClass} ${styles.Breadcrumb__Item}`}
          >
            {active ? (
              <a className={styles.Breadcrumb__Link_active}>{label}</a>
            ) : (
              <Link to={href} className={styles.Breadcrumb__Link}>
                {label}
              </Link>
            )}
          </li>
        );
      })}
    </ol>
  );
}

Breadcrumb.defaultProps = {
  items: [],
};

export default Breadcrumb;
