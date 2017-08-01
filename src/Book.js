import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ChangeCase from 'change-case'

class Book extends Component {
  static propTypes = {
    info: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired
  }

  handleChange = (e) => {
    e.preventDefault();
    if(this.props.onChangeShelf){
      this.props.onChangeShelf(this.props.info, e.target.value)
    }
  }

  render () {
    const { info } = this.props;
    const opts = this.props.options;
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
            <select onChange={this.handleChange} value={info.shelf}>
              <option value="none" disabled>Move to...</option>
              {opts.map((option, index) => (
                <option key={index} value={option}>{ChangeCase.sentenceCase(option)}</option>
              ))}
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
