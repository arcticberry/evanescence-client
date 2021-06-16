import React from 'react'
import {Link} from 'react-router-dom'
import Card from 'components/Card'
import Button from 'components/Button'
import '../../../applications.css'
import ClipboardCopy from 'components/Form/ClipboardCopy'

const AppCreationSuccess = () => {
  return (
    <div className="container h-screen mx-auto">
      <section className="mb-16 sm:pt-24 relative">
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
                    htmlFor="secret-key"
                    className="text-gray-200 block font-bold mb-3"
                  >
                    Secret Key
                  </label>
                  <ClipboardCopy
                    name="secret-key"
                    text="ffjhskskfjks"
                    id="secret-key"
                  />
                </section>
              </div>
              <Link to="/dashboard/applications">
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
