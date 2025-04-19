import React from "react";
import "../css/AddBook.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function AddBook() {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
 
  const navigate = useNavigate();   
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/book/add", {
        
        name,
        author,
        imageUrl,
      })
      
       .then(res => {
        if (res.data.added) {
          navigate("/books"); // Redirect to dashboard after successful addition
        } else {
          console.log(res);
        }
      
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="book-container">
      <form className="book-form" onSubmit={handleSubmit}>
        <h1>Add Book</h1>
        <div className="book-group">
          <label htmlFor="book">Book Name</label>
          <input
            type="text"
            placeholder="Enter book"
            id="book"
            name="book"
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
            required
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="book-group">
          <label htmlFor="imageUrl">ImageUrl</label>
          <input
            type="text"
            placeholder="Enter imageUrl"
            id="imageUrl"
            name="imageUrl"
            required
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
       
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}
