import React from 'react'
import Loader from '../Loader/Loader'

import './Photo.css'

const Photo = (props) => {
  let image = null

  if (props.searching) {
    image = <Loader />
  }

  if (props.photo) {
    image = (
      <img src={props.photo.data.urls.regular} alt="" />
    )
  }
  return (
    <div className="Photo">
      {image}
    </div>
  )
}

export default Photo