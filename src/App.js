import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelf from './BookShelf';
import SearchBook from './SearchBook';

class App extends React.Component {
  state = {
    books: [],
    shelfs: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
        let shelfs = new Set();
        books.map((book) => (
          shelfs.add(book.shelf)
        ))
        this.setState({ books })
        this.setState({ shelfs: Array.from(shelfs) })
    })
  }

  onChangeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((resp) => {
      this.setState({ books: this.state.books.map((b) =>
        {
             if(b.id === book.id)
              (b.shelf = shelf);
             return b;
        })
      })
    })
  }

  render() {
    return (
      <div className="app">
          <Route exact path="/search" render={( {history} ) => (
            <SearchBook />
         )}/>


        <Route exact path="/" render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">

                  {this.state.shelfs.map((cat, index) => (
                    <div key={index}>
                      <BookShelf shelfTitle={cat} shelfs={this.state.shelfs} books={this.state.books} onChangeShelf={this.onChangeShelf}/>
                    </div>
                  ))}
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
        )} />
      </div>
    )
  }
}
export default App
