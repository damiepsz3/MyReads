import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'

class App extends React.Component {
  state = {
    books: [],
    categorys: [],
    showSearchPage: true
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
        let categorys = new Set();
        books.map((book) => (
          categorys.add(book.shelf)
        ))
        this.setState({ books })
        this.setState({ categorys: Array.from(categorys) })
    })
  }

  onChangeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((resp) => {
      this.setState({ books: this.state.books.map((b) => {
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
            <div className="search-books">
              <div className="search-books-bar">
                <Link className="close-search" to="/">
                  <a>Close</a>
                </Link>
                <div className="search-books-input-wrapper">
                  {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                  */}
                  <input type="text" placeholder="Search by title or author"/>

                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid"></ol>
              </div>
            </div>
         )}/>


        <Route exact path="/" render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">

                  {this.state.categorys.map((cat, index) => (
                    <div key={index}>
                      <BookShelf shelfTitle={cat} shelfs={this.state.categorys} books={this.state.books} onChangeShelf={this.onChangeShelf}/>
                    </div>
                  ))}
              </div>
              <Link className="open-search" to="/search">
                <a>Add a book</a>
              </Link>
            </div>
        )} />
      </div>
    )
  }
}
{/* <div className="open-search">
  <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
</div> */}
export default App
