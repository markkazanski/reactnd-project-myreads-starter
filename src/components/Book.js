import React from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from '../BooksAPI';

//bookTitle="" bookAuthor="" bookImage=""

class Book extends React.Component { 

    onCategoryChange = (event) =>{
        console.log(event.target.value);
        console.log(this.props.id);
        BooksAPI.update({id: this.props.id}, event.target.value)
            .then(
                x => console.log(x)
            );
    }

    render() {
        return ( 
            <div className="book">
                <p>{this.props.shelf}</p>
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.bookImage})` }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={e => this.onCategoryChange(e)}>
                        <option value="none" disabled>Move to...</option>
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