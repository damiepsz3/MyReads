import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import ChangeCase from 'change-case';

class Shelf extends Component {
  static propTypes = {
    shelfTitle: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  render () {
    const shelfTitle = this.props.shelfTitle;
    const { books, onChangeShelf } = this.props;

    let categoryBooks;
    categoryBooks = books.filter((b) =>  b.shelf === shelfTitle )

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ChangeCase.sentenceCase(shelfTitle)}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {categoryBooks.map((book) => (
              <li key={book.id}>
                <Book  info={book} onChangeShelf={onChangeShelf} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Shelf;
