import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book';

class SearchBook extends Component {

  static propTypes = {
    onChangeShelf: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    shelfs: PropTypes.array.isRequired,
    searchBooks: PropTypes.array.isRequired,
    query: PropTypes.string.isRequired
  }

  updateQuery = (e) => {
    if(this.props.onUpdate){
      this.props.onUpdate(e.target.value);
    }
  }

  render() {
    const { shelfs, searchBooks, onChangeShelf, query } = this.props;

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
              <span>We found {searchBooks.length} results from '{query}'</span>
            </div>
          )}
          <ol className="books-grid">
            {searchBooks.map((book) => (
              <li key={book.id}>
                <Book
                  info={book}
                  onChangeShelf={onChangeShelf}
                  options={shelfs}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBook;
