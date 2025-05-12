import React, { useState, useEffect } from "react";
import "../css/AddBook.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function EditBook() {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  
  const navigate = useNavigate();
  const { id } = useParams(); 

  useEffect(() => {
    AOS.init({ duration: 1000 });

    axios
      .get(`
https://booksmania-6.onrender.com/book/book/${id}`)
      .then((res) => {
        setName(res.data.name);
        setAuthor(res.data.author);
        setImageUrl(res.data.imageUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`https://booksmania-6.onrender.com/book/book/${id}`, {
        name,
        author,
        imageUrl,
      })
      .then((res) => {
        if (res.data.updated) {
          Swal.fire(
            'Success!',
            'Book has been updated.',
            'success'
          ).then(() => {
            navigate("/books");
          });
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire(
          'Error!',
          'Something went wrong, please try again.',
          'error'
        );
      });
  };

  return (
    <div className="book-container" data-aos="fade-up">
      <form className="book-form" onSubmit={handleSubmit}>
        <h1>Edit Book</h1>
        <div className="book-group">
          <label htmlFor="book">Book Name</label>
          <input
            type="text"
            placeholder="Enter book name"
            id="book"
            name="book"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="book-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            placeholder="Enter author"
            id="author"
            name="author"
            value={author}
            required
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="book-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            placeholder="Enter image URL"
            id="imageUrl"
            name="imageUrl"
            value={imageUrl}
            required
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
