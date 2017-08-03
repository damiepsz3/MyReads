import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelf from './BookShelf';
import SearchBook from './SearchBook';

class App extends React.Component {
  state = {
    books: [],
    searchBooks: [],
    shelfs: [],
    query: ''
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
    });
  }

  updateBooks = (query) => {
    this.setState({ query:  query })
      BooksAPI.search(this.state.query, 5)
      .then((searchBooks) => {if(searchBooks !== undefined)
        if(!searchBooks.error) {
          this.setState({ searchBooks });
        } else {
          this.setState({ searchBooks: [] });
        }
      })
      .catch((error) => {
        console.log('Something went wrong')
        this.setState({ searchBooks: [] });
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
    const { shelfs, books, searchBooks, query } = this.state;
    return (
      <div className="app">
          <Route exact path="/search" render={( {history} ) => (
            <SearchBook
              query={query}
              onUpdate={this.updateBooks}
              onChangeShelf={this.addABook}
              shelfs={shelfs}
              searchBooks={searchBooks}/>
         )}/>


        <Route exact path="/" render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                  {shelfs.map((cat, index) => (
                    <div key={index}>
                      <BookShelf
                        shelfTitle={cat}
                        shelfs={shelfs}
                        books={books}
                        onChangeShelf={this.onMoveShelf}/>
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
