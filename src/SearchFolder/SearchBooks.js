import React from "react";

import Book from "../BooksFolder/Book";
import * as BooksAPI from "../API/BooksAPI";

class SearchBooks extends React.Component {
  state = {
    searchResults: [],
    value: "",
  };
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value: value });

    if (value.length > 0) {
      BooksAPI.search(value).then((books) => {
        if (books.error) {
          this.setState({ searchResults: [] });
        } else {
          this.setState({ searchResults: books });
        }
      });
    } else {
      this.setState({ searchResults: [] });
    }
  };

  render() {
    const { myBooks, onMove } = this.props;

    this.state.searchResults.forEach(function(searchedBook) {
      myBooks.forEach(function(book) {
        if (book.id === searchedBook.id) {
          searchedBook.shelf = book.shelf;
        }
      });
      if (!searchedBook.shelf) {
        searchedBook.shelf = "none";
      }
    });

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="You can Search by title or author"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchResults.map((book) => (
              <Book key={book.id} book={book} onMove={onMove} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
