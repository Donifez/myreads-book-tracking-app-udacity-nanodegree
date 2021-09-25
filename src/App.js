import React from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./API/BooksAPI";
import "./App.css";
import ListBooks from "./BooksFolder/ListBooks";
import SearchBooks from "./SearchFolder/SearchBooks";

class BooksApp extends React.Component {
  state = {
    myBooks: [],
    reset: [],
  };
  componentDidMount = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ myBooks: books });
    });
  };
  bookshelves = [
    { key: "currentlyReading", name: "Currently Reading" },
    { key: "wantToRead", name: "Want to Read" },
    { key: "read", name: "Read" },
  ];
  resetSearch = () => {
    this.setState({ reset: [] });
  };

  movePosition = (book, shelf) => {
    BooksAPI.update(book, shelf).then((books) => {
      if (shelf === "none") {
        this.setState((prevState) => ({
          myBooks: prevState.myBooks.filter((b) => b.id !== book.id),
        }));
      } else {
        book.shelf = shelf;
        this.setState((prevState) => ({
          myBooks: prevState.myBooks
            .filter((b) => b.id !== book.id)
            .concat(book),
        }));
      }
    });
  };

  render() {
    const { myBooks } = this.state;

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks
              bookshelves={this.bookshelves}
              books={myBooks}
              onMove={this.movePosition}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              myBooks={myBooks}
              onMove={this.movePosition}
              onResetSearch={this.resetSearch}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
