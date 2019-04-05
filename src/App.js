import React, { Component } from 'react';

import Search from './components/Search/Search'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-header__title">Image Search</h1>
        </header>
        <section>
          <Search />
        </section>
      </div>
    );
  }
}

export default App;
