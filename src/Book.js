import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    info: PropTypes.object.isRequired
  }

  render () {
    const { info } = this.props;
    const style = {
      width: 128,
      height: 193,
      backgroundImage: `url(${info.imageLinks.thumbnail})`
    }

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={style}></div>
          <div className="book-shelf-changer">
            <select>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{info.title}</div>
      {info.authors.map((author, index) => (
        <div key={index} className="book-authors">{author}</div>
      ))}
      </div>
    )
  }
}

export default Book;
