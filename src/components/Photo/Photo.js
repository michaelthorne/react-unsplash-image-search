import React from 'react'
import './Photo.css'
import Loader from '../Loader/Loader'

const Photo = (props) => {
  let image = null

  if (props.photo) {
    image = (
      <img
        className="Photo-image"
        src={props.photo.data.urls.regular} alt={props.photo.data.description} />
    )
  }

  return (
    <React.Fragment>
      <Loader show={props.searching} />
      <div className="Photo">
        {image}
      </div>
    </React.Fragment>
  )
}

export default Photo