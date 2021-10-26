import React from 'react'
import WebhooksList from './components/WebhooksList'
import useParamSearch from 'hooks/useParamSearch'
import makeData from 'utils/makeData'
import tableSchema from './tableSchema'

function Webhooks() {
  const [getPageParamValue, setPageParamValue] = useParamSearch('page')
  const [getPageSizeParamValue, setPageSizeParamValue] = useParamSearch(
    'pageSize',
  )

  const memoizedTableData = React.useMemo(() => makeData(100), [])

  const pageParamValue = getPageParamValue()
  const pageSizeParamValue = getPageSizeParamValue()

  const defaultTableOptions = {
    ...(pageParamValue && {defaultPageIndex: Number(pageParamValue - 1)}),
    ...(pageSizeParamValue && {defaultPageSize: Number(pageSizeParamValue)}),
  }

  return (
    <section className="py-12 px-4 lg:px-24">
      <WebhooksList
        data={memoizedTableData}
        schema={tableSchema()}
        onPageNavigation={setPageParamValue}
        onPageSizeUpdate={setPageSizeParamValue}
        {...defaultTableOptions}
      />
    </section>
  )
}

export default Webhooks
