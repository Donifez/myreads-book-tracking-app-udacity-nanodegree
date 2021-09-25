import React from "react";
import BookshelfChanger from "./BookshelfChanger";

class Book extends React.Component {
  render() {
    console.log(this.props);
    const { book, shelf, onMove } = this.props;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 138,
                height: 193,
                backgroundImage: `url(${book.imageLinks &&
                  book.imageLinks.thumbnail})`,
              }}
            />
            <BookshelfChanger book={book} shelf={shelf} onMove={onMove} />
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">
            {book.authors && book.authors.join(", ")}
          </div>
        </div>
      </li>
    );
  }
}

export default Book;
