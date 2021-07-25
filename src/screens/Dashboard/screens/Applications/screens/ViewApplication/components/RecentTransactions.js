import React from 'react'
import Table from 'components/Table'

const RecentTransactions = ({
  schema,
  data,
  onPageNavigation,
  onPageSizeUpdate,
  defaultTableOptions,
}) => {
  return (
    <>
      <div className="">
        <section className="">
          <h1 className="text-xl font-semibold text-brand-tertiary mb-1">
            Recent transactions
          </h1>
          <p className="text-sm text-gray-400">
            A short breakdown of all records for this app
          </p>
        </section>
      </div>
      <div className="overflow-auto">
        <Table
          columns={schema}
          data={data}
          onPageNavigation={onPageNavigation}
          onPageSizeUpdate={onPageSizeUpdate}
          {...defaultTableOptions}
        />
      </div>
    </>
  )
}

export default RecentTransactions
