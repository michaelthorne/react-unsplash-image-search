import React, { Component } from 'react'

import unsplash from './api/unsplash'
import SearchForm from './components/SearchForm/SearchForm'
import SearchTerms from './components/SearchTerms/SearchTerms'
import Photo from './components/Photo/Photo'

import './App.css'

class App extends Component {
  state = {
    photo: null,
    query: '',
    searchTerms: [],
    searching: false,
  }

  /**
   * Input Change Handler
   * @param event
   */
  inputChangeHandler = (event) => {
    let query = event.target.value.trim()

    if (event.target.value !== '') {
      this.setState({ query: query })
    }
  }

  /**
   * Submit Form Handler
   * @param event
   */
  submitHandler = (event) => {
    event.preventDefault()

    if (this.state.query !== '') {
      this.searchHandler(this.state.query)
    }
  }

  /**
   * Search Handler
   * @param query
   */
  searchHandler = (query) => {
    unsplash.get('/photos/random', {
      params: {
        'query': query
      }
    })
      .then(response => {
        console.log(response)

        this.setState((prevState) => {
          return {
            photo: response,
            searchTerms: [...new Set([...prevState.searchTerms, query])], // Only add unique search terms
          }
        })
      })
      .catch(error => {
        // TODO: add proper error handling
        console.log(error.response)

        this.setState((prevState) => {
          return {
            photo: null,
            searching: !!prevState.searching,
          }
        })
      })
  }

  /**
   * Search Terms
   * @param searchTerm
   * @returns {Function}
   */
  searchTermsHandler = (searchTerm) => (event) => {
    this.setState({ query: searchTerm }, () => {
      this.searchHandler(searchTerm)
    })
  }

  /**
   * Remove a Search Term
   * @param searchTerm
   * @returns {Function}
   */
  removeSearchTermHandler = (searchTerm) => () => {
    this.setState((prevState) => ({
      searchTerms: prevState.searchTerms.filter(el =>
        el !== searchTerm
      )
    }))
  }

  render () {
    return (
      <main className="App">
        <section className="App-section">
          <h1 className="App-title">Search for an image on Unsplash.</h1>
        </section>

        <section className="App-section">
          <SearchForm
            submitHandler={this.submitHandler}
            inputChangeHandler={this.inputChangeHandler}
            query={this.state.query} />
        </section>

        <section className="App-section">
          <SearchTerms
            searchTerms={this.state.searchTerms}
            searchTermsHandler={this.searchTermsHandler}
            removeSearchTermHandler={this.removeSearchTermHandler} />
        </section>

        <section className="App-section">
          <Photo
            photo={this.state.photo}
            searching={this.state.searching} />
        </section>
      </main>
    )
  }
}

export default App
