import React, { Component } from 'react'

import './SearchForm.css'

import { ReactComponent as SearchIcon } from '../../images/icons/search.svg'

class SearchForm extends Component {
  changeHandler = e => {
    let query = e.target.value.trim()
    if (e.target.value !== '') {
      this.setState({ query: query })
    }
  }

  submitHandler = e => {
    e.preventDefault()
    this.props.onSubmit(this.state.query)
  }

  render () {
    return (
      <form onSubmit={this.submitHandler} className="SearchForm">
        <label htmlFor="query">
          <input
            id="query"
            name="query"
            type="text"
            onChange={this.changeHandler}
            placeholder="e.g. water" />
        </label>

        <button type="submit">
          <SearchIcon height="24" width="24" />
        </button>
      </form>
    )
  }
}

export default SearchForm