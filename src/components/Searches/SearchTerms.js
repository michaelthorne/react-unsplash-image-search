import React from 'react'

import './SearchesTerms.css'

const SearchTerms = (props) => {
  return (
    <ul className="Searches">
      {props.searchTerms.map((searchTerm, index) => (
        <li key={index}>{searchTerm}</li>
      ))}
    </ul>
  )
}

export default SearchTerms