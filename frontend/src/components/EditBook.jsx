
import React, { use } from "react";
import "../css/AddBook.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { set } from "mongoose";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
export default function EditBook() {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
 
  const navigate = useNavigate();   

  const {id} = useParams(); 
  // Get the book ID from the URL

  useEffect(() => {

    axios.get('http://localhost:5000/book/book/'+id)
   
    .then((res) => {
    console.log(res);



    setName(res.data.name);
    setAuthor(res.data.author);
    setImageUrl(res.data.imageUrl);
      console.log(res.data);
      
    })
    .catch((err) => {
      console.log(err);
    });
}, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:5000/book/book/"+id, {
        
        name,
        author,
        imageUrl,
      })
      
       .then(res => {
        if (res.data.updated) {
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
        <h1>Edit Book</h1>
        <div className="book-group">
          <label htmlFor="book">Book Name</label>
          <input
            type="text"
            placeholder="Enter book"
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
          <label htmlFor="imageUrl">ImageUrl</label>
          <input
            type="text"
            placeholder="Enter imageUrl"
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
