import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Shelf from './Shelf';
import SearchBook from './SearchBook';

class App extends React.Component {
  state = {
    books: [],
    query: ''
  }

  componentDidMount() {
    BooksAPI.getAll().then((results) => {
      const books = new Set();
      results.forEach((book) => books.add(book));
      this.setState({ books: Array.from(books) })
    })
  }



  onMoveShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((resp) => {
      this.setState(state => (
        { books: state.books.map((b) => {
          if(b.id === book.id)
          (b.shelf = shelf);
          return b;
        })
      }
    ));
  })
}


updateBooks = (query) => {
  this.setState({ query:  query })
  BooksAPI.search(this.state.query, 20)
  .then((searchResults) => {
    this.setState({ books: this.state.books.concat(searchResults) })
  })
}

addABook = (book, shelf) => {
  BooksAPI.update(book, shelf).then((resp) => {
    this.setState(state => {
      book.shelf = shelf;
      return { books: state.books.concat([book]) }
    })
  });
}




render() {
  const { books, query } = this.state;
  return (
    <div className="app">
      <Route exact path="/search" render={( {history} ) => (
        <SearchBook
          query={query}
          onUpdate={this.updateBooks}
          onChangeShelf={this.addABook}
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
