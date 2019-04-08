import React, { Component } from 'react'

import unsplash from './api/unsplash'
import SearchForm from './components/SearchForm/SearchForm'
import SearchTerms from './components/SearchTerms/SearchTerms'
import Photo from './components/Photo/Photo'

import './App.css'

class App extends Component {
  state = {
    photo: null,
    searchTerms: [],
    searching: false,
  }

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

  searchTermsHandler = (searchTerm) => () => {
    this.searchHandler(searchTerm)
  }

  render () {
    return (
      <main className="App">
        <section className="App-section">
          <h1 className="App-title">Search for an image on Unsplash.</h1>
        </section>

        <section className="App-section">
          <SearchForm onSubmit={this.searchHandler} query={this.state.query} />
        </section>

        <section className="App-section">
          <Photo photo={this.state.photo} searching={this.state.searching} />
        </section>

        <section className="App-section">
          <SearchTerms searchTerms={this.state.searchTerms} searchTermsHandler={this.searchTermsHandler} />
        </section>
      </main>
    )
  }
}

export default App
