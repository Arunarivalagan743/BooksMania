import React, { use } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { Book } from '../../../backend/models/Book';
import BookCard from '../components/BookCard';
import "../css/Books.css";
export default function Books({role}) {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/book/books")
      .then(res => {
        setBooks(res.data.books);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
  , []);
  return (
  <div className="books-container">
    {books.map((book) => (
      <BookCard key={book._id} book={book}role={role} />
    ))}
  </div>
  );
}