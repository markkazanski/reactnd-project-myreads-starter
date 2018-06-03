import React from 'react';
import PropTypes from 'prop-types';

//bookTitle="" bookAuthor="" bookImage=""

const Book = (props) => { 

    const bookCoverStyle = { width: 128, height: 193, backgroundImage: `url(${props.bookImage})` };

    return ( 
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={bookCoverStyle}></div>
                <div className="book-shelf-changer">
                    <select value={props.shelf || "none"} onChange={e => props.onCategoryChange(props.id, e.target.value)}>
                    <option disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{props.bookTitle}</div>
            <div className="book-authors">{props.bookAuthor}</div>
        </div>
    )
}

Book.propTypes = {
    bookTitle: PropTypes.string.isRequired,
    bookAuthor: PropTypes.string.isRequired,
    bookImage: PropTypes.string.isRequired
}

export default Book;