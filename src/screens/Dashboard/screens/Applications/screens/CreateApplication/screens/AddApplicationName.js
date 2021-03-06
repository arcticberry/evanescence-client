import React from 'react'
import {Link} from 'react-router-dom'
import {useFormikContext} from 'formik'
import {ChevronRight, ChevronLeft} from '@material-ui/icons'
import Steps from 'components/Steps'
import Button from 'components/Button'
import SectionTitle from 'components/SectionTitle'
import {Input} from 'components/Form'
import {generateName} from 'utils/index'
import '../../../applications.css'

const AddApplicationName = ({crumbs}) => {
  const {setFieldValue} = useFormikContext()

  return (
    <div className="container mx-auto mt-8">
      <section className="mb-16">
        <SectionTitle
          title="It starts with a name."
          message="A simple name is always a nice start."
        />
      </section>

      <div className="flex w-full justify-around mb-10">
        <div className="mx-auto w-11/12 md:w-9/12 lg:w-1/2">
          <Steps steps={crumbs} />
        </div>
      </div>

      <div className="row py-2 flex justify-around items-center">
        <div className="w-full md:w-9/12 lg:w-1/2 mt-4">
          <section className="bg-white shadow-lg rounded-md mb-4 p-8">
            <label className="flex items-center justify-between mb-2">
              <span className="text-gray-500 font-bold text-sm">Name</span>
              <button
                type="button"
                className="text-sm text-brand-primary"
                onClick={() => setFieldValue('name', generateName())}
              >
                Generate magic name
              </button>
            </label>

            <Input name="name" />
            <div className="py-6 flex justify-between">
              <Link
                to="/dashboard/applications"
                className="border-gray-200 border-2 py-2 px-8 text-brand-tertiary"
              >
                <ChevronLeft />
                Back
              </Link>
              <Link to="/dashboard/applications/create/pick-services">
                <Button variant="primary">
                  <span className="font-bold">Pick services</span>
                  <ChevronRight />
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default AddApplicationName
