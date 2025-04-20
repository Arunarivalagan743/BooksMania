import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import BookCard from '../components/BookCard';
import "../css/Books.css";

export default function Books({ role }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS for animations
    axios.get("http://localhost:5000/book/books")
      .then(res => {
        setBooks(res.data.books);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="books-container">
      {books.length > 0 ? (
        books.map((book) => (
          <BookCard key={book._id} book={book} role={role} />
        ))
      ) : (
        <p>No books found.</p>
      )}
    </div>
  );
}
