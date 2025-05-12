import React, { useState, useEffect } from "react";
import "../css/AddBook.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";

export default function AddBook() {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post("https://booksmania-6.onrender.com/book/add", {
        name,
        author,
        imageUrl,
      })
      .then((res) => {
        setLoading(false);

        if (res.data.added) {
          Swal.fire({
            icon: "success",
            title: "Book Added Successfully",
            text: "The book has been added to the collection!",
          }).then(() => {
            navigate("/books");
          });
        } else {
          console.log(res);
          Swal.fire({
            icon: "error",
            title: "Failed to Add Book",
            text: "There was an issue adding the book. Please try again.",
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          text: "Please try again later.",
        });
      });
  };

  return (
    <div className="book-container" data-aos="fade-up">
      <form className="book-form" onSubmit={handleSubmit}>
        <h1 data-aos="fade-down">Add Book</h1>
        <div className="book-group" data-aos="fade-right">
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
        <div className="book-group" data-aos="fade-left">
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
        <div className="book-group" data-aos="fade-right">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            placeholder="Enter image URL"
            id="imageUrl"
            name="imageUrl"
            required
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <button type="submit" data-aos="fade-up">
          {loading ? (
            <div className="spinner">
              <ClipLoader color="#ffffff" size={20} />
            </div>
          ) : (
            "Add Book"
          )}
        </button>
      </form>
    </div>
  );
}
