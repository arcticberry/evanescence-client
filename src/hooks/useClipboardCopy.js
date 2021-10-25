import React from 'react'

const useClipboardCopy = ({text, notifyTimeout = 2500}) => {
  const [copyStatus, setCopyStatus] = React.useState('inactive')

  const copy = React.useCallback(() => {
    navigator.clipboard.writeText(text).then(
      () => setCopyStatus('copied'),
      () => setCopyStatus('failed'),
    )
  }, [text])

  React.useEffect(() => {
    if (copyStatus === 'inactive') return

    const timeoutToInactive = setTimeout(
      () => setCopyStatus('inactive'),
      notifyTimeout,
    )

    return () => clearTimeout(timeoutToInactive)
  }, [copyStatus, notifyTimeout])

  return [copyStatus, copy]
}

export default useClipboardCopy
