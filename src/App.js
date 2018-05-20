import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import PropTypes from 'prop-types';
import Bookshelf from './components/Bookshelf';
import * as BooksAPI from './BooksAPI';

BooksAPI.getAll().then(x=>console.log(x));

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  booksArray: PropTypes.array.isRequired
};

class BooksApp extends React.Component {
  state = {
    books: [
      {
        id: "book123",
        title: "Loading", 
        authors:["Loading"],
        imageLinks: {thumbnail: ""},
        shelf: "wantToRead"
      },
      {
        id: "book124",
        title: "Loading", 
        authors:["Loading"],
        imageLinks: {thumbnail: ""},
        shelf: "currentlyReading"
      },
      {
        id: "book125",
        title: "Loading", 
        authors:["Loading"],
        imageLinks: {thumbnail: ""},
        shelf: "read"
      }
    ],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  componentDidMount = () => {
    this.loadBooks();
  }

  loadBooks = () => {
    BooksAPI.getAll()
    .then( (books) => {
      this.setState( () => ({
        books: books
      }))
    });
  }

  onCategoryChange = (bookid, shelf) =>{
    console.log("BookID: " + bookid);
    console.log("Shelf: " + shelf);
    BooksAPI.update({id: bookid}, shelf)
        .then(
            x => {
              console.log(x);
              this.loadBooks();
            }
        );
  }


  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
              <Bookshelf onCategoryChange={this.onCategoryChange} title="Currently Reading" booksArray={this.state.books.filter(x => x.shelf === "currentlyReading")} />
              <Bookshelf onCategoryChange={this.onCategoryChange} title="Want to Read" booksArray={this.state.books.filter(x => x.shelf === "wantToRead")} />
              <Bookshelf onCategoryChange={this.onCategoryChange} title="Read" booksArray={this.state.books.filter(x => x.shelf === "read")} />
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
