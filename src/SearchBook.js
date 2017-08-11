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
      query: ''
  }

  updateBooks = (query) => {
    this.setState({ query })
    BooksAPI.search(query, 20)
    .then((results) => {
      if(results && !results.error){
        this.setState({ results } )

      } else {
        this.setState({ results: [] });
      }
    })
  }

  render() {
    const { books, onChangeShelf } = this.props;
    const { query, results } = this.state;

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
            {tempResults.map((book) => (
              <li key={book.id}>
                <Book
                  info={book}
                  onChangeShelf={onChangeShelf}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBook;
