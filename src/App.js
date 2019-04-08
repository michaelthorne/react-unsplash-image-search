import React, { Component } from 'react'

import unsplash from './api/unsplash'
import SearchForm from './components/SearchForm/SearchForm'
import SearchTerms from './components/SearchTerms/SearchTerms'
import Loader from './components/Loader/Loader'

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
        this.setState({ photo: response })
      })
      .catch(error => {
        // TODO: add proper error handling
        console.log(error.response)
      })
      .then(() => {
        this.setState((prevState) => {
          return {
            photo: null,
            searching: !!prevState.searching,
            searchTerms: [...new Set([...prevState.searchTerms, query])], // Only add unique search terms
          }
        })
      })
  }

  render () {
    let photo = null
    let searchTerms = null

    if (this.state.searching) {
      photo = <Loader />
    }

    if (this.state.photo) {
      photo = (
        <img src={this.state.photo.data.urls.small} alt="" />
      )
    }

    if (this.state.searchTerms.length > 0) {
      searchTerms = (
        <section className="App-section">
          <h2>Your previous search terms:</h2>
          <SearchTerms searchTerms={this.state.searchTerms} />
        </section>
      )
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-header__title">Search for an image</h1>
        </header>
        <section className="App-section">
          <SearchForm onSubmit={this.searchHandler} />
        </section>
        {searchTerms}
        <section className="App-section">
          {photo}
        </section>
      </div>
    )
  }
}

export default App
