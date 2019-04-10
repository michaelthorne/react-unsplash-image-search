import React from 'react'
import { ReactComponent as CloseIcon } from '../../images/icons/close.svg'
import './Tag.css'

const Tag = (props) => {
  return (
    <div className="Tag">
      <button
        className="Tag-title"
        onClick={props.historyHandler(props.title)}
        tabIndex="0"
      >{props.title}</button>
      <button
        className="Tag-remove"
        onClick={props.removeHistoryHandler(props.title)}>
        <CloseIcon height="8" width="8" />
      </button>
    </div>
  )
}

export default Tag