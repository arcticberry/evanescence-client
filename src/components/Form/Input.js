import React from "react";
import { Field } from "formik";

import { InputGroup, Input } from "@zendeskgarden/react-forms";
import { Label } from "./";

const BaseInput = ({ name, label, rules, ...props }) => {
  const handleChange = () => {};

  return (
    <>
      <Label label={label} name={name} />
      <Field name={name} validate={handleChange}>
        {({ field }) => (
          <InputGroup>
            <Input {...field} id={name} {...props} />
          </InputGroup>
        )}
      </Field>
    </>
  );
};

BaseInput.propTypes = {};
BaseInput.defaultProps = {
  type: "text",
};

export default BaseInput;
