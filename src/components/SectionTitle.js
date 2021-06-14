import React from 'react'

const SectionTitle = ({title, message}) => {
  return (
    <div className="text-center">
      <h3 className="text-3xl font-semibold my-4">{title}</h3>
      <p className="text-gray-400">{message}</p>
    </div>
  )
}

export default SectionTitle
