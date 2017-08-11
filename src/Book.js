import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChangeCase from 'change-case';

class Book extends Component {
  static propTypes = {
    info: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  handleChange = (e) => {
    e.preventDefault();
    if(this.props.onChangeShelf){
      this.props.onChangeShelf(this.props.info, e.target.value)
    }
  }

  render () {
    const { info } = this.props;
    const shelf = info.shelf || 'none';
    const image = (info.imageLinks ? info.imageLinks.thumbnail : '');
    const authors = info.authors || [];
    const style = {
      width: 128,
      height: 193,
      backgroundImage: `url(${image})`
    }

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={style}></div>
          <div className="book-shelf-changer">
            <select onChange={this.handleChange} value={shelf}>
              <option disabled>Move to...</option>
              <option value="currentlyReading">{ChangeCase.sentenceCase('currentlyReading')}</option>
              <option value="wantToRead">{ChangeCase.sentenceCase('wantToRead')}</option>
              <option value="read">{ChangeCase.sentenceCase('read')}</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{info.title}</div>
        {authors.map((author, index) => (
          <div key={index} className="book-authors">{author}</div>
        ))}
      </div>
    )
  }
}

export default Book;
