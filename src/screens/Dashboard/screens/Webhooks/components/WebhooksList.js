import React from 'react'
import Table from 'components/Table'
import useTranslator from 'hooks/useTranslator'

function WebhooksList({
  schema,
  data,
  onPageNavigation,
  onPageSizeUpdate,
  defaultTableOptions,
}) {
  const {t} = useTranslator()

  return (
    <>
      <div className="mb-6">
        <section className="">
          <h1 className="text-xl font-semibold text-brand-tertiary mb-1">
            {t('webhooks.list.title')}
          </h1>
          <p className="text-sm text-gray-400">{t('webhooks.list.subtext')}</p>
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

WebhooksList.defaultProps = {
  data: []
}

export default WebhooksList
