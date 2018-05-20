import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

class Bookshelf extends React.Component {
    render() {
        console.log("this.props.booksArray: ");
        console.log(typeof this.props.booksArray);
        return (
            <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.title}</h2>
            <div className="bookshelf-books">
            <ol className="books-grid">
                    {this.props.booksArray.map( book => (
                        <li><Book onCategoryChange={this.props.onCategoryChange} shelf={book.shelf} key={book.id} id={book.id} bookTitle={book.title} bookAuthor={book.authors[0]} bookImage={book.imageLinks.thumbnail} /></li>
                    ))}
            </ol>
            </div>
        </div>
        );
    }
}

Bookshelf.propTypes = {
    bookTitle: PropTypes.string.isRequired,
    bookAuthor: PropTypes.string.isRequired,
    bookImage: PropTypes.string.isRequired,
};

export default Bookshelf;