import React from "react";
import { Link } from "react-router-dom";
import styles from "./Steps.module.scss";

import classNames from "classnames/bind";

let cx = classNames.bind(styles);

function Steps({ steps }) {
  return (
    <div className={styles.Steps__Wrapper}>
      <ol className={styles.Steps}>
        {steps.map(({ label, href, active }, idx) => {
          const isLastStep = idx === steps.length - 1;
          const stepWidth = 100 / (steps.length - 1);

          let stepClasses = cx({
            Step: true,
            Step__Last: isLastStep,
            Step__Current: active,
          });

          return (
            <li className={stepClasses}>
              <div className={styles.Step__Milestone}>
                <i className="mdi mdi-check" />
              </div>
              {active ? (
                <span className={styles.Step__Label}>{label}</span>
              ) : (
                <Link to={href} className={styles.Step__Label}>
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

Steps.defaultProps = {
  steps: [],
};

export default Steps;
