// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import BookDetails from "./BookDetails";
import "./styles.css";

const SearchPage = ({ query, setQuery, books, loading, handleSearch }) => {
  return (
    <div className="app">
      <h1>Book Finder</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {loading && <p>Loading...</p>}
      <div className="book-list">
        {books.map((book, index) => (
          <Link to={`/book/${index}`} key={index} className="book-link">
            <div className="book-item">
              {book.cover ? (
                <img
                  src={book.cover}
                  alt={`${book.title} cover`}
                  className="book-cover"
                />
              ) : (
                <div className="placeholder-cover">No Image</div>
              )}
              <h3>{book.title}</h3>
              <p>by {book.author}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${query}`
      );
      const data = await response.json();
      const formattedBooks = data.docs.slice(0, 10).map((book) => ({
        title: book.title,
        author: book.author_name ? book.author_name[0] : "Unknown",
        cover: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : null,
        first_publish_year: book.first_publish_year,
        publisher: book.publisher ? book.publisher[0] : "Unknown",
        isbn: book.isbn ? book.isbn[0] : "Not available",
        language: book.language ? book.language[0] : "Unknown",
        subject: book.subject
          ? book.subject.slice(0, 5).join(", ")
          : "Not available",
      }));
      setBooks(formattedBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks();
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <SearchPage
              query={query}
              setQuery={setQuery}
              books={books}
              loading={loading}
              handleSearch={handleSearch}
            />
          }
        />
        <Route path="/book/:id" element={<BookDetails books={books} />} />
      </Routes>
    </Router>
  );
};

export default App;
