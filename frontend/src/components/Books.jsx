// Books.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import BookCard from '../components/BookCard';
import "../css/Books.css";

export default function Books({ role }) {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000 });
    axios.get("https://booksmania-7.onrender.com/book/books", {
      withCredentials: true,
    })
      .then(res => {
        setBooks(res.data.books);
      })
      .catch(err => {
        console.error("Failed to fetch books:", err);
      });
  }, []);

  const filteredBooks = books.filter(book =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="books-wrapper">
      {/* 🔍 Animated Search Input */}
      <div className="search-bar" data-aos="fade-down">
        <input
          type="text"
          placeholder="🔍 Search by book name or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="books-container">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard key={book._id} book={book} role={role} />
          ))
        ) : (
          <p className="no-books" data-aos="fade-up">📚 No books found.</p>
        )}
      </div>
    </div>
  );
}
