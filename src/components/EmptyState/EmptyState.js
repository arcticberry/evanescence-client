import React from "react";
import styles from "./EmptyState.module.scss";
import SectionTitle from "components/SectionTitle";

const EmptyState = ({ artwork, title, message, children, action }) => {
  return (
    <section className={styles.EmptyState}>
      <div className={styles.EmptyState__Inner}>
        <div className={styles.EmptyState__Art}>{artwork ? artwork : null}</div>
        <article className="mb-4">
          <SectionTitle title={title} message={message} />
        </article>
        {children}
      </div>
    </section>
  );
};

export default EmptyState;
