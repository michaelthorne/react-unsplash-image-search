import React from 'react'
import './Photo.css'
import Loader from '../Loader/Loader'

const Photo = (props) => {
  let loader = null
  let photo = null

  if (props.searching) {
    loader = <Loader show={props.searching} />
  }

  if (props.photo) {
    photo = (
      <div className="Photo">
        <a
          className="Photo-link"
          href={props.photo.data.links.html}
          target="_blank" rel="noopener noreferrer">
          <img
            className="Photo-image"
            src={props.photo.data.urls.regular} alt={props.photo.data.description}
          />
        </a>
      </div>
    )
  }

  return (
    <React.Fragment>
      {loader}
      {photo}
    </React.Fragment>
  )
}

export default Photo