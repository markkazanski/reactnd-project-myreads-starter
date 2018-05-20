import React from 'react';
import { Link } from 'react-router-dom'; 
import Bookshelf from './Bookshelf';
import PropTypes from 'prop-types';

//searchBooks={this.searchBooks} updateQuery={this.updateQuery} searchResults={this.state.searchResults} books={this.state.books}

class Searchpage extends React.Component {
    render(){
        return(
        <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input onKeyUp={this.props.searchBooks} onChange={(event) => (this.props.updateQuery(event.target.value))} type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <Bookshelf key="bookshelf-search" onCategoryChange={this.props.onCategoryChange} title="Search Results" booksArray={this.props.searchResults.filter(x => typeof x.shelf !== "string")} />
              <Bookshelf key="bookshelf-current" onCategoryChange={this.props.onCategoryChange} title="Currently Reading" booksArray={this.props.books.filter(x => x.shelf === "currentlyReading")} />
              <Bookshelf key="bookshelf-want" onCategoryChange={this.props.onCategoryChange} title="Want to Read" booksArray={this.props.books.filter(x => x.shelf === "wantToRead")} />
              <Bookshelf key="bookshelf-read" onCategoryChange={this.props.onCategoryChange} title="Read" booksArray={this.props.books.filter(x => x.shelf === "read")} />
            </div>
          </div>
        )
    }
}

Searchpage.propTypes = {
  searchBooks: PropTypes.func,
  updateQuery: PropTypes.func,
  searchResults: PropTypes.array,
  onCategoryChange: PropTypes.func,
  books: PropTypes.array
};

export default Searchpage;