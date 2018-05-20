import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

class Bookshelf extends React.Component {
    render() {
        //console.log("this.props.booksArray: ");
        //console.log(typeof this.props.booksArray);
        return (
            <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.title}</h2>
            <div className="bookshelf-books">
            <ol className="books-grid">
                    {this.props.booksArray.map( book => (
                        <li key={book.id + "-li"}><Book onCategoryChange={this.props.onCategoryChange} shelf={book.shelf} key={book.id} id={book.id} bookTitle={(book.title || "...")} bookAuthor={ (book.authors ? book.authors[0] : "...") } bookImage={ (book.imageLinks ? book.imageLinks.thumbnail : "") } /></li>
                    ))}
            </ol>
            </div>
        </div>
        );
    }
}

Bookshelf.propTypes = {
    title: PropTypes.string.isRequired,
    booksArray: PropTypes.array.isRequired,
    onCategoryChange: PropTypes.func.isRequired,
};

export default Bookshelf;