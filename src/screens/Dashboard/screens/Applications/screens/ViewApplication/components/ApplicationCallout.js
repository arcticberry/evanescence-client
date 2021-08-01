import React, {useEffect, useRef, useState} from 'react'

import {Link} from 'react-router-dom'
import cx from 'classnames'
import {Done, Edit, Close} from '@material-ui/icons'
import {Spinner} from '@zendeskgarden/react-loaders'

import Button from 'components/Button'
import CalloutCard from 'components/Card/CalloutCard'

import useUpdateApplicationMutation from 'hooks/queries/useUpdateApplicationMutation'
import useMutationNotifications from 'hooks/useMutationNotifications'

const ApplicationCallout = ({application}) => {
  const [applicationName, setApplicationName] = useState(null)
  const [applicationNameStatus, setApplicationNameStatus] = useState(
    'NOT_EDITING',
  )
  const [
    doUpdateApplication,
    applicationUpdateState,
  ] = useUpdateApplicationMutation(application.id)
  useMutationNotifications({
    ...applicationUpdateState,
    entity: 'application',
    actionType: 'update',
  })

  const applicationNameInputEl = useRef(null)

  useEffect(() => {
    if (application) {
      setApplicationName(application.label)
    }
  }, [application])

  useEffect(() => {
    if (applicationNameInputEl.current) {
      if (applicationNameStatus === 'EDITING') {
        applicationNameInputEl.current.focus()
        applicationNameInputEl.current.select()
      }
    }
  }, [applicationNameInputEl, applicationNameStatus])

  const isEditingAppName = applicationNameStatus === 'EDITING'

  const onSaveApplicationName = () => {
    const {value} = applicationNameInputEl.current
    doUpdateApplication({
      label: value,
    })
    setApplicationName(value)
    setApplicationNameStatus('NOT-EDITING')
  }

  return (
    <CalloutCard variant="phi">
      <div className="px-4 md:px-16 lg:px-24 pb-8 flex flex-col md:flex-row items-center justify-between text-gray-100">
        <div className="mb-2 text-xl font-bold flex items-center relative w-full md:w-1/2">
          <section className={`mr-6 ${isEditingAppName ? 'w-full' : ''}`}>
            {isEditingAppName ? (
              <input
                ref={applicationNameInputEl}
                className={`bg-gray-500 bg-opacity-20 border border-brand-primary rounded-2 min-w-full w-full outline-none px-4 py-2`}
                defaultValue={applicationName}
              />
            ) : !applicationName ? (
              <Spinner delayMS={0} size={32} />
            ) : (
              <span className={'d-block'}>{applicationName}</span>
            )}
          </section>

          <div
            className={cx(['h-12', 'w-16', 'relative', 'overflow-hidden'], {})}
          >
            <div
              className={cx(['absolute', 'transform'], {
                'translate-y-full': isEditingAppName,
                'opacity-0': isEditingAppName,
              })}
            >
              <button
                size="small"
                aria-label="edit"
                className="bg-brand-tertiary bg-opacity-50 w-12 h-12 flex items-center justify-center rounded-full"
                onClick={() => {
                  setApplicationNameStatus('EDITING')
                }}
              >
                <Edit fontSize={'small'} />
              </button>
            </div>
            <div
              className={cx(['absolute', 'transform', 'transition-transform'], {
                'translate-y-full': !isEditingAppName,
                'opacity-0': !isEditingAppName,
              })}
            >
              <button
                size="small"
                aria-label="cancel"
                className="w-11 h-12 flex items-center justify-center rounded-full"
                onClick={() => {
                  setApplicationNameStatus('NOT_EDITING')
                }}
              >
                <Close fontSize={'small'} />
              </button>
            </div>
          </div>
          <div
            className={cx(['transform', 'transition-transform'], {
              'translate-y-full': !isEditingAppName,
              'opacity-0': !isEditingAppName,
            })}
          >
            <button
              onClick={onSaveApplicationName}
              size="small"
              aria-label="edit"
              className="bg-red-400 bg-opacity-100 w-12 h-12 flex items-center justify-center rounded-full"
            >
              <Done fontSize={'small'} />
            </button>
          </div>
        </div>
        {!isEditingAppName ? (
          <section className="hidden md:inline-block">
            <Link to="/dashboard/applications">
              <Button>Switch application</Button>
            </Link>
          </section>
        ) : null}
      </div>
    </CalloutCard>
  )
}

export default ApplicationCallout
