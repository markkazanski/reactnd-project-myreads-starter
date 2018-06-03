import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
//import PropTypes from 'prop-types';
//import Bookshelf from './components/Bookshelf';
import Searchpage from './components/PageSearch';
import Homepage from './components/Homepage';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom'; 

//BooksAPI.getAll().then(x=>console.log(x));

class BooksApp extends React.Component {
  state = {
    books: [],
    query: "",
    searchResults: [],
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
      console.log(result && result.error);
      if(result && !result.error){
        this.setState( () => ({
          searchResults: result
        }));
        this.updateSearchResults();
      }else{
        this.setState( () => ({
          searchResults: []
        }));
      }
    });
  }


  render() {
    return (
      <div className="app">
        <Route
          exact path="/search"
          render={()=>(
            <Searchpage onCategoryChange={this.onCategoryChange} searchBooks={this.searchBooks} updateQuery={this.updateQuery} searchResults={this.state.searchResults} books={this.state.books} />
        )}/>

        <Route
          exact path="/"
          render={({history})=>(
            <Homepage onCategoryChange={this.onCategoryChange} books={this.state.books} />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
