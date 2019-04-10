import React from 'react'

import './Error.css'

const Error = (props) => {
  let error

  if (props.errors.length > 0) {
    error = (
      <div className="Error">
        {props.errors}
      </div>
    )
    return error
  }

  return null
}

export default Error