
import React, { useState, useEffect } from "react";
import "../css/AddBook.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';  // Import SweetAlert2
import AOS from 'aos';  // Import AOS
import 'aos/dist/aos.css';  // Import AOS CSS

export default function EditBook() {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  
  const navigate = useNavigate();
  const { id } = useParams(); 

  // Fetch the book data to edit
  useEffect(() => {
    // Initialize AOS for animations
    AOS.init({ duration: 1000 });

    axios
      .get(`http://localhost:5000/book/book/${id}`)
      .then((res) => {
        setName(res.data.name);
        setAuthor(res.data.author);
        setImageUrl(res.data.imageUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/book/book/${id}`, {
        name,
        author,
        imageUrl,
      })
      .then((res) => {
        if (res.data.updated) {
          // Show success alert
          Swal.fire(
            'Success!',
            'Book has been updated.',
            'success'
          ).then(() => {
            navigate("/books"); // Redirect to books page after success
          });
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
        // Show error alert
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
