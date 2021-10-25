import React from 'react'

import {InputGroup, Input} from '@zendeskgarden/react-forms'

import useClipboardCopy from 'hooks/useClipboardCopy'

const ClipboardCopy = ({copyStatusTexts = {}, text, ...props}) => {
  const [copyStatus, doCopy] = useClipboardCopy({
    text,
    notifyTimeout: 2500,
  })
  copyStatusTexts = {
    inactive: 'Copy',
    failed: 'Copy failed',
    copied: 'Copied',
    ...copyStatusTexts,
  }

  return (
    <>
      <InputGroup>
        <Input value={text} onChange={() => {}} {...props} />
        {text.length ? (
          <button
            className="h-12 bg-white text-brand-primary font-bold px-8 uppercase tracking-wider"
            type="button"
            onClick={doCopy}
          >
            {copyStatusTexts[copyStatus] || copyStatus}
          </button>
        ) : null}
      </InputGroup>
    </>
  )
}

ClipboardCopy.propTypes = {}

export default ClipboardCopy
