import React from 'react'
import Tag from '../../components/Tag/Tag'
import './History.css'

const History = (props) => {
  let history = ''

  if (props.history.length > 0) {
    history = (
      <div className="History">
        <ul className="History-list">
          <li className="History-item">Previous:</li>
          {props.history.map((query, index) => (
            <li
              className="History-item"
              key={index}>
              <Tag
                historyHandler={props.historyHandler}
                removeHistoryHandler={props.removeHistoryHandler}
                title={query}
              />
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return history
}

export default History