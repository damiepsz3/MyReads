import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book';

class SearchBook extends Component {

  static propTypes = {
    onChangeShelf: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired,
    query: PropTypes.string.isRequired
  }

  updateQuery = (e) => {
    if(this.props.onUpdate){
      this.props.onUpdate(e.target.value);
    }
  }

  render() {
    const { books, onChangeShelf, query } = this.props;

    cons showingContacts =
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
              onInput={this.updateQuery}
            />
          </div>
        </div>
        <div className="search-books-results">
          {query.length > 0 && (
            <div className="showing-results">
              <span>We found {books.length} results from '{query}'</span>
            </div>
          )}
          <ol className="books-grid">
            {books.map((book) => (
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
