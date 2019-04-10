import React from 'react'
import './Search.css'
import { ReactComponent as SearchIcon } from '../../images/icons/search.svg'

const Search = (props) => {
  return (
    <form onSubmit={props.submitHandler} className="Search">
      <label
        className="Search-label"
        htmlFor="query">
        <input
          id="query"
          name="query"
          placeholder={props.placeholder}
          type="text"
          className="Search-input"
          defaultValue={props.query}
          ref={props.setSearchInputRef}
        />
      </label>

      <button
        className="Search-button"
        type="submit">
        <SearchIcon height="24" width="24" />
      </button>
    </form>
  )
}

export default Search