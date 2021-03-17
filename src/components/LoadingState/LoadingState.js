import React from "react";
import styles from "./LoadingState.module.scss";

const LoadingState = ({ title }) => {
  return (
    <section className={styles.container}>
      <section className={styles.ripple}>
        <div />
        <div />
      </section>
    </section>
  );
};

export default LoadingState;
