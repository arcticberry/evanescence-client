import React from "react";
import CheckboxRound from "components/CheckboxRound";
import styles from "./CheckboxCard.module.scss";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

const CheckboxCard = ({ checked, children, label }) => {
  return (
    <div className={cx({ CheckboxCard: true, CheckboxCard__checked: checked })}>
      <section className="d-flex justify-content-end p-3">
        <CheckboxRound checked={checked} />
      </section>
      <div className="d-flex flex-column align-items-center justify-content-center">
        {children}
        <p className="py-2">{label}</p>
      </div>
    </div>
  );
};

CheckboxCard.defaultProps = {};

export default CheckboxCard;
