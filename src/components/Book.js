import React from 'react';
import PropTypes from 'prop-types';

//bookTitle="" bookAuthor="" bookImage=""

class Book extends React.Component { 

    render() {
        return ( 
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.bookImage})` }}></div>
                    <div className="book-shelf-changer">
                        <select value={this.props.shelf || "none"} onChange={e => this.props.onCategoryChange(this.props.id, e.target.value)}>
                        <option disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.bookTitle}</div>
                <div className="book-authors">{this.props.bookAuthor}</div>
            </div>
        );
    }
}

Book.propTypes = {
    bookTitle: PropTypes.string.isRequired,
    bookAuthor: PropTypes.string.isRequired,
    bookImage: PropTypes.string.isRequired
}

export default Book;