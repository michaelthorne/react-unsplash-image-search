import React, { Component } from 'react'
import unsplash from './api/unsplash'
import Error from './components/Error/Error'
import History from './components/History/History'
import Photo from './components/Photo/Photo'
import Search from './components/Search/Search'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.searchInput = React.createRef()
  }

  state = {
    errors: [],
    history: [],
    photo: null,
    query: '',
    searching: false,
  }

  /**
   * Submit Form Handler
   * @param event
   */
  submitHandler = (event) => {
    event.preventDefault()

    let query = this.searchInput.current.value

    if (query !== '') {
      this.searchHandler(query)
      this.setState({
        query: query,
        searching: true
      })
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
            errors: [],
            history: [...new Set([...prevState.history, query])], // Only add unique queries
            photo: response,
            searching: false,
          }
        })
      })
      .catch(error => {
        // TODO: implement proper error handling
        this.setState({
          errors: JSON.parse(error.response.request.response).errors,
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
    this.searchInput.current.value = ''
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
            setRef={this.searchInput}
            submitHandler={this.submitHandler}
            query={this.state.query}
          />
          <History
            history={this.state.history}
            historyHandler={this.historyHandler}
            removeHistoryHandler={this.removeHistoryHandler}
          />
        </section>

        <section className="App-section">
          <Error errors={this.state.errors} />
          <Photo
            photo={this.state.photo}
            searching={this.state.searching}
          />
        </section>
      </main>
    )
  }
}

export default App
