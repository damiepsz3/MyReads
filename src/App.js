import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Shelf from './Shelf';
import SearchBook from './SearchBook';

class App extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    })
  }

  onMoveShelf = (book, shelf) => {
      BooksAPI.update(book, shelf).then((resp) => {});
      book.shelf = shelf;
      this.setState(prevState => ({ books: prevState.books.filter(b => b.id !== book.id).concat(book)}));
  }

render() {
  const { books } = this.state;
  return (
    <div className="app">
      <Route exact path="/search" render={( {history} ) => (
        <SearchBook
          onChangeShelf={this.onMoveShelf}
          books={books}/>
        )} />


        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <Shelf shelfTitle='currentlyReading' books={books} onChangeShelf={this.onMoveShelf}/>
              <Shelf shelfTitle='wantToRead' books={books} onChangeShelf={this.onMoveShelf}/>
              <Shelf shelfTitle='read' books={books} onChangeShelf={this.onMoveShelf}/>
            </div>

            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}
export default App
