// BookDetails.js
import React from "react";
import { useParams, Link } from "react-router-dom";

const BookDetails = ({ books }) => {
  const { id } = useParams();
  const book = books[parseInt(id)];

  if (!book) {
    return (
      <div className="book-details">
        <Link to="/" className="back-button">
          Back to Search
        </Link>
        <p>Book not found</p>
      </div>
    );
  }

  return (
    <div className="book-details">
      <Link to="/" className="back-button">
        Back to Search
      </Link>
      <div className="book-details-content">
        <div className="book-details-image">
          {book.cover ? (
            <img
              src={book.cover}
              alt={`${book.title} cover`}
              className="book-cover-large"
            />
          ) : (
            <div className="placeholder-cover-large">No Image Available</div>
          )}
        </div>
        <div className="book-details-info">
          <h1>{book.title}</h1>
          <h2>by {book.author}</h2>
          <div className="book-info-grid">
            <div className="info-item">
              <strong>First Published:</strong>
              <span>{book.first_publish_year || "Unknown"}</span>
            </div>
            <div className="info-item">
              <strong>Publisher:</strong>
              <span>{book.publisher}</span>
            </div>
            <div className="info-item">
              <strong>ISBN:</strong>
              <span>{book.isbn}</span>
            </div>
            <div className="info-item">
              <strong>Language:</strong>
              <span>{book.language}</span>
            </div>
            <div className="info-item">
              <strong>Subjects:</strong>
              <span>{book.subject}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
