import React from 'react'

const Label = ({label, name, icon}) =>
  label ? (
    <label htmlFor={name} className="text-gray-500 mb-2 inline-block">
      {icon ? icon : null}
      {label}
    </label>
  ) : null

export default Label
