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
    query: {
      placeholder: 'e.g. water',
      search: ''
    },
    searching: false,
  }

  /**
   * Submit Form Handler
   * @param event
   */
  submitHandler = (event) => {
    event.preventDefault()

    let search = this.searchInput.current.value.trim()

    if (search !== '') {
      this.searchHandler(search)
      this.setState({
        query: {
          search: search
        },
        searching: true
      })
    }
  }

  /**
   * Search Handler
   * @param search
   */
  searchHandler = (search) => {
    unsplash.get('/photos/random', {
      params: {
        'query': search
      }
    })
      .then(response => {
        this.setState((prevState) => {
          return {
            errors: [],
            history: [...new Set([...prevState.history, search])], // Only add unique queries
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
   * @param search
   * @returns {Function}
   */
  historyHandler = (search) => () => {
    this.searchInput.current.value = search
    this.setState({
      query: {
        search: search
      },
      searching: true
    }, () => {
      this.searchHandler(search)
    })
  }

  /**
   * Remove an item from the history
   * @param search
   * @returns {Function}
   */
  removeHistoryHandler = (search) => () => {
    this.setState((prevState) => ({
      history: prevState.history.filter(previousQuery =>
        previousQuery !== search
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
      query: {
        search: ''
      }
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
            placeholder={this.state.placeholder}
            query={this.state.query.search}
            setSearchInputRef={this.searchInput}
            submitHandler={this.submitHandler}
          />
          <History
            history={this.state.history}
            historyHandler={this.historyHandler}
            removeHistoryHandler={this.removeHistoryHandler}
          />
          <Error errors={this.state.errors} />
        </section>

        <section className="App-section App-section--full">
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
