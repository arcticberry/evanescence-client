import React from 'react'
import Table from 'components/Table'
import useTranslator from 'hooks/useTranslator'

const RecentTransactions = ({
  schema,
  data,
  onPageNavigation,
  onPageSizeUpdate,
  defaultTableOptions,
}) => {
  const {t} = useTranslator()

  return (
    <>
      <div className="">
        <section className="">
          <h1 className="text-xl font-semibold text-brand-tertiary mb-1">
            {t('transactions.recent.title')}
          </h1>
          <p className="text-sm text-gray-400">
            {t('transactions.recent.subtext')}
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
