import React, {useEffect} from 'react'
import {useState} from 'react'
import LoadingState from './LoadingState'

const LazyImage = ({src, ...rest}) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const image = new Image()

    image.src = src
    image.onload = () => {
      setImageLoaded(true)
    }
  }, [src])

  return (
    <>
      {imageLoaded ? (
        <img alt={''} src={src} {...rest} />
      ) : (
        <LoadingState useContainer={false} variant="ring" />
      )}
    </>
  )
}

export default LazyImage
