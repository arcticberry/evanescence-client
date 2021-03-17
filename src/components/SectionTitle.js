import React from "react";

const SectionTitle = ({ title, message }) => {
  return (
    <div className="text-center">
      <h3 className="h2">{title}</h3>
      <p className="text-muted">{message}</p>
    </div>
  );
};

export default SectionTitle;
