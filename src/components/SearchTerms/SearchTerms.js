import React from 'react'

import './SearchesTerms.css'

import { ReactComponent as CloseIcon } from '../../images/icons/close.svg'

const SearchTerms = (props) => {
  let searchTerms = ''

  if (props.searchTerms.length > 0) {
    searchTerms = (
      <div className="SearchTerms">
        <ul className="SearchTerms-list">
          {props.searchTerms.map((searchTerm, index) => (
            <li key={index}>
              <div
                className="SearchTerms-search">
                <span
                  onClick={props.searchTermsHandler(searchTerm)}>{searchTerm}</span>
                <button
                  className="SearchTerms-remove"
                  onClick={props.removeSearchTermHandler(searchTerm)}>
                  <CloseIcon height="5" width="5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return searchTerms
}

export default SearchTerms