import React from 'react'
import {Skeleton} from '@zendeskgarden/react-loaders'

const ApplicationsLoader = () => {
  return (
    <div className={'w-full'}>
      <section className="w-full mb-5">
        <Skeleton height="100px" />
      </section>

      <div className="container mt-5 inline-block md:flex">
        <section className="w-full lg:w-1/3 mr-2">
          <Skeleton height="200px" />
        </section>
        <section className="w-full lg:w-1/3 mr-2">
          <Skeleton height="200px" />
        </section>
        <section className="w-full lg:w-1/3">
          <Skeleton height="200px" />
        </section>
      </div>
    </div>
  )
}

export default ApplicationsLoader
