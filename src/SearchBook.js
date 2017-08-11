import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

class SearchBook extends Component {
  static propTypes = {
    onChangeShelf: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
  }

  state = {
      results: [],
      query: '',
      searching: null
  }

  componentDidMount () {
    this.timer = null;
  }

  updateBooks = (query) => {
    this.setState({ query,
                    searching: (query.length > 0 ? true : false) })
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      BooksAPI.search(query, 20)
      .then((results) => {
          this.setState({ results: (results && !results.error ? results : []),
                          searching: false } )
      })
      .catch((message) => console.log(`There was an error, message: ${message}`))
    }, 500)
  }

  render() {
    const { books, onChangeShelf } = this.props;
    const { query, results, searching } = this.state;
    const tempResults = results.map(r => {
      books.forEach(b => {
        if(b.id === r.id)
        r.shelf = b.shelf;
      })
      return r;
    })

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onInput={(e) => this.updateBooks(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {query.length > 0 && (
            <div className="showing-results">
              <span>We found {tempResults.length} results from '{query}'</span>
            </div>
          )}
          <ol className="books-grid">
            {searching ? (
                <div className="showing-results">
                  <span>Loading...</span>
                </div>
              ) : (
                tempResults.map((book) => (
                  <li key={book.id}>
                    <Book
                      info={book}
                      onChangeShelf={onChangeShelf}
                    />
                  </li>))
              )
            }
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBook;
