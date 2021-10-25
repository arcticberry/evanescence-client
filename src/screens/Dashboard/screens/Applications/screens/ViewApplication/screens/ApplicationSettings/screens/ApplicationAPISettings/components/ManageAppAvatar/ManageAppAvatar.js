import React from 'react'
import {useDropzone} from 'react-dropzone'
import {Field, Input, FileUpload} from '@zendeskgarden/react-forms'
import {Image as UploadIcon} from '@material-ui/icons'
import LazyImage from 'components/LazyImage'

const ManageAppAvatar = ({url}) => {
  const onDrop = React.useCallback((acceptedFiles) => {
    alert(`${acceptedFiles.length} files accepted for upload`)
  }, [])

  const defaultDropzone = useDropzone({
    accept: ['image/jpeg', 'image/png', 'image/gif'],
    onDrop,
  })

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-16 py-8">
        <div className="flex">
          <div className="mr-8">
            <h2 className="font-bold text-brand-tertiary mb-1">Company Logo</h2>
            <p className="text-sm text-gray-400">
              Upload your company logo (visible to the public)
            </p>
          </div>
        </div>
        <div className="col-end-4 col-span-2 flex mb-2 text-gray-400">
          <div className="w-8/12 mr-4">
            <LazyImage src="//logo.clearbit.com/airbnb.com?size=150" />
          </div>

          <Field>
            <FileUpload
              {...defaultDropzone.getRootProps()}
              isDragging={defaultDropzone.isDragActive}
            >
              <div className="text-gray-400">
                <UploadIcon />
                {defaultDropzone.isDragActive ? (
                  <span>Drop files here</span>
                ) : (
                  <div>
                    <b>Click to replace</b> or drag and drop PNG, JPG or GIF
                    (max. 800 x 400px)
                  </div>
                )}
              </div>
              <Input {...defaultDropzone.getInputProps()} />
            </FileUpload>
          </Field>
        </div>
      </section>
    </>
  )
}

export default ManageAppAvatar
