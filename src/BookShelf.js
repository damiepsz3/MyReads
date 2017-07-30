import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {
  static propTypes = {
    shelf: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired
  }

  render () {
    const shelf = this.props.shelf;
    const { books } = this.props;

    let categoryBooks;
    categoryBooks = books.filter((b) =>  b.shelf === shelf )

    return (
      <div className="bookshelf">
          <h2 className="bookshelf-title">{shelf}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {categoryBooks.map((book) => (
                <li>
                  <Book key={book.id} info={book} />
                </li>
              ))}
            </ol>
          </div>
      </div>
    )
  }
}

export default BookShelf;
