import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Shelf from './Shelf';
import SearchBook from './SearchBook';

class App extends Component {
  state = {
    books: [],
    query: ''
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    })
  }



  onMoveShelf = (book, shelf) => {
      BooksAPI.update(book, shelf).then((resp) => {})
      this.setState(prevState => (
        { books: prevState.books.map((b) => {
          if(b.id === book.id)
          (b.shelf = shelf);
          return b;
        })
      }
    ));
  }


  updateBooks = (query) => {
    this.setState({ query:  query })
    BooksAPI.search(this.state.query, 20)
    .then((searchResults) => {
      if(searchResults !== undefined && !searchResults.error){
        this.setState(prevState => {
          const bookIds = prevState.books.map(b => b.id);
          return { books: prevState.books.concat(searchResults.filter( result => !bookIds.includes(result.id))) }
        })
      }
    })
  }





render() {
  const { books, query } = this.state;
  return (
    <div className="app">
      <Route exact path="/search" render={( {history} ) => (
        <SearchBook
          query={query}
          onUpdate={this.updateBooks}
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
