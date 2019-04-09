import React, { Component } from 'react'
import unsplash from './api/unsplash'
import History from './components/History/History'
import Photo from './components/Photo/Photo'
import Search from './components/Search/Search'
import './App.css'

class App extends Component {
  state = {
    history: [],
    photo: null,
    query: '',
    searching: false,
  }

  /**
   * Input Change Handler
   * @param event
   */
  inputChangeHandler = (event) => {
    this.setState({ query: event.target.value.trim() })
  }

  /**
   * Submit Form Handler
   * @param event
   */
  submitHandler = (event) => {
    event.preventDefault()

    if (this.state.query !== '') {
      this.searchHandler(this.state.query)
      this.setState({ searching: true })
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
        this.setState((prevState) => {
          return {
            history: [...new Set([...prevState.history, query])], // Only add unique queries,
            photo: response,
            searching: false,
          }
        })
      })
      .catch(error => {
        // TODO: add proper error handling
        console.log(error.response)

        this.setState({
          photo: null,
          searching: false,
        })
      })
  }

  /**
   * Search for an item from the history
   * @param query
   * @returns {Function}
   */
  historyHandler = (query) => () => {
    this.setState({
      query: query,
      searching: true
    }, () => {
      this.searchHandler(query)
    })
  }

  /**
   * Remove an item from the history
   * @param query
   * @returns {Function}
   */
  removeHistoryHandler = (query) => () => {
    this.setState((prevState) => ({
      history: prevState.history.filter(previousQuery =>
        previousQuery !== query
      )
    }), () => {
      if (this.state.history.length === 0) {
        this.clearSearch()
      }
    })
  }

  /**
   * Clear Search
   */
  clearSearch = () => {
    this.setState({
      photo: null,
      query: ''
    })
  }

  render () {
    return (
      <main className="App">
        <section className="App-section">
          <h1 className="App-title">Search for an image on Unsplash.</h1>
        </section>

        <section className="App-section">
          <Search
            submitHandler={this.submitHandler}
            inputChangeHandler={this.inputChangeHandler}
            query={this.state.query} />

          <History
            history={this.state.history}
            historyHandler={this.historyHandler}
            removeHistoryHandler={this.removeHistoryHandler} />
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
