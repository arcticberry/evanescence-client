import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'

import Card from 'components/Card'
import Button from 'components/Button'
import '../../../applications.css'
import ClipboardCopy from 'components/Form/ClipboardCopy'

const AppCreationSuccess = ({location, history}) => {
  let {applicationPublicKey, applicationSecretKey, applicationId} =
    location.state || {}

  let [publicKey] = useState(applicationPublicKey || '')
  let [secretKey] = useState(applicationSecretKey || '')

  useEffect(() => {
    if (!applicationId) {
      history.push('/dashboard/applications/create/pick-services')
      toast.info('Please pick services')
    }
  }, [applicationId, history])

  return (
    <div className="container h-screen mx-auto">
      <section className="mb-16 sm:pt-8 relative">
        <Card.Callout
          variant="gamma"
          renderCenter={() => (
            <div className="py-16 flex flex-col items-center">
              <section className="mb-8 flex flex-col items-center">
                <h1 className="text-3xl font-bold text-white mb-3">
                  You just got keys!
                </h1>
                <p className="text-center w-9/12 md:text-lg md:w-full text-gray-100">
                  These keys will only be revealed once. Please copy and keep
                  them safe.
                </p>
              </section>
              <div className="px-8 md:px-16 py-12 w-full bg-brand-tertiary bg-opacity-20 shadow-lg mb-8">
                <section className="mb-4">
                  <label
                    htmlFor="applicationPublicKey"
                    className="text-gray-200 block font-bold mb-3"
                  >
                    Public Key
                  </label>
                  <ClipboardCopy
                    name="applicationPublicKey"
                    text={publicKey}
                    id="applicationPublicKey"
                  />
                </section>
                <section className="mb-4">
                  <label
                    htmlFor="applicationSecretKey"
                    className="text-gray-200 block font-bold mb-3"
                  >
                    Secret Key
                  </label>
                  <ClipboardCopy
                    name="applicationSecretKey"
                    text={secretKey}
                    id="applicationSecretKey"
                  />
                </section>
              </div>
              <Link to={`/dashboard/applications/${applicationId}`}>
                <Button>
                  <span className="font-bold text-sm">Visit application</span>
                </Button>
              </Link>
            </div>
          )}
        ></Card.Callout>
      </section>
    </div>
  )
}

export default AppCreationSuccess
