
import React, { useState, useEffect } from "react";
import "../css/AddBook.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // AOS Styles
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners"; // Import the spinner

export default function AddBook() {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false); // State for showing the spinner
  const navigate = useNavigate();

  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Set animation duration for AOS
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is being submitted

    axios
      .post("http://localhost:5000/book/add", {
        name,
        author,
        imageUrl,
      })
      .then((res) => {
        setLoading(false); // Stop the loading spinner after the request

        if (res.data.added) {
          // Show success alert
          Swal.fire({
            icon: "success",
            title: "Book Added Successfully",
            text: "The book has been added to the collection!",
          }).then(() => {
            navigate("/books"); // Redirect to books list after success
          });
        } else {
          console.log(res);
          // Show error alert if not added
          Swal.fire({
            icon: "error",
            title: "Failed to Add Book",
            text: "There was an issue adding the book. Please try again.",
          });
        }
      })
      .catch((err) => {
        setLoading(false); // Stop the loading spinner in case of error
        console.log(err);
        // Show error alert in case of failure
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
