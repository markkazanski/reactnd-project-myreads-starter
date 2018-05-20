import React from 'react';
import { Link } from 'react-router-dom'; 
import Bookshelf from './Bookshelf';
import PropTypes from 'prop-types';

class Homepage extends React.Component {
    render(){
        return(
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                <Bookshelf key="bookshelf-current" onCategoryChange={this.props.onCategoryChange} title="Currently Reading" booksArray={this.props.books.filter(x => x.shelf === "currentlyReading")} />
                <Bookshelf key="bookshelf-want" onCategoryChange={this.props.onCategoryChange} title="Want to Read" booksArray={this.props.books.filter(x => x.shelf === "wantToRead")} />
                <Bookshelf key="bookshelf-read" onCategoryChange={this.props.onCategoryChange} title="Read" booksArray={this.props.books.filter(x => x.shelf === "read")} />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
        )
    }
}

Homepage.propTypes = {
    onCategoryChange: PropTypes.func,
    books: PropTypes.array
  };

export default Homepage;