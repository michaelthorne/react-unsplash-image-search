import React from 'react'
import './Loader.css'

const Loader = (props) => {
  let classes = ['Loader']

  if (props.show) {
    classes.push('is-visible')
  }

  return (
    <div className={classes.join(' ')}>Searching…</div>
  )
}

export default Loader