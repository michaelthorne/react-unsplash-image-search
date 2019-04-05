import React, { Component } from 'react'

import './SearchForm.css'

class SearchForm extends Component {
  state = {
    query: ''
  }

  changeHandler = e => {
    this.setState({ query: e.target.value })
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

        <button type="submit">Search</button>
      </form>
    )
  }
}

export default SearchForm