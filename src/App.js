import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import PropTypes from 'prop-types';
import Bookshelf from './components/Bookshelf';
import * as BooksAPI from './BooksAPI';
import { Route, Link } from 'react-router-dom'; 

//BooksAPI.getAll().then(x=>console.log(x));

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
    query: "",
    searchResults: [
      {
        id: "book123",
        title: "Loading", 
        authors:["Loading"],
        imageLinks: {thumbnail: ""},
        shelf: "none"
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
    })
    .then(this.updateSearchResults); //after updating list of books, update search results array
  }

  updateSearchResults = () => {
    this.state.books.forEach((book)=>{ //go through each book and remove it from search results
      this.setState( (prevState) => {
        return {searchResults: this.state.searchResults.filter((x)=> x.id !== book.id)};
      });
    });
    

  }

  onCategoryChange = (bookid, shelf) =>{
    //console.log("BookID: " + bookid);
    //console.log("Shelf: " + shelf);
    BooksAPI.update({id: bookid}, shelf)
        .then(
            x => {
              //console.log(x);
              this.loadBooks();
            }
        );
    
  }

  updateQuery = (query) => { 
    this.setState(
      () => ({
          query: query.trim()
      })
    );
  };

  searchBooks = () => {
    BooksAPI.search(this.state.query)
    .then((result)=>{
      console.log(result.error);
      if(!result.error){
        this.setState( () => ({
          searchResults: result
        }));
        this.updateSearchResults();
      }
    });
  }


  render() {
    return (
      <div className="app">
        <Route
          exact path="/search"
          render={()=>(
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
                <input onBlur={this.searchBooks} onChange={(event) => (this.updateQuery(event.target.value))} type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <Bookshelf key="bookshelf-search" onCategoryChange={this.onCategoryChange} title="Search Results" booksArray={this.state.searchResults.filter(x => typeof x.shelf !== "string")} />
              <Bookshelf key="bookshelf-current" onCategoryChange={this.onCategoryChange} title="Currently Reading" booksArray={this.state.books.filter(x => x.shelf === "currentlyReading")} />
              <Bookshelf key="bookshelf-want" onCategoryChange={this.onCategoryChange} title="Want to Read" booksArray={this.state.books.filter(x => x.shelf === "wantToRead")} />
              <Bookshelf key="bookshelf-read" onCategoryChange={this.onCategoryChange} title="Read" booksArray={this.state.books.filter(x => x.shelf === "read")} />
            </div>
          </div>
        )}/>

        <Route
          exact path="/"
          render={({history})=>(
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                <Bookshelf key="bookshelf-current" onCategoryChange={this.onCategoryChange} title="Currently Reading" booksArray={this.state.books.filter(x => x.shelf === "currentlyReading")} />
                <Bookshelf key="bookshelf-want" onCategoryChange={this.onCategoryChange} title="Want to Read" booksArray={this.state.books.filter(x => x.shelf === "wantToRead")} />
                <Bookshelf key="bookshelf-read" onCategoryChange={this.onCategoryChange} title="Read" booksArray={this.state.books.filter(x => x.shelf === "read")} />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />
      </div>
    )
  }
}

export default BooksApp
