import React from 'react'

import './SearchForm.css'

import { ReactComponent as SearchIcon } from '../../images/icons/search.svg'

const SearchForm = (props) => {
  return (
    <form onSubmit={props.submitHandler} className="SearchForm">
      <label htmlFor="query">
        <input
          id="query"
          name="query"
          type="text"
          onChange={props.inputChangeHandler}
          value={props.query}
          placeholder="e.g. water" />
      </label>

      <button type="submit">
        <SearchIcon height="24" width="24" />
      </button>
    </form>
  )
}

export default SearchForm