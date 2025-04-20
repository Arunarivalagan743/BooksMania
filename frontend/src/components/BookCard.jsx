
import React from 'react';
import "../css/BookCard.css";
import { FaEdit, FaTrash, FaBook, FaUser, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2

function BookCard({ book, role }) {
  const { name, author, imageUrl } = book;

  // Handle book purchase
  const handleBuy = () => {
    const existing = JSON.parse(localStorage.getItem("purchasedBooks")) || [];
    const updated = [...existing, book];
    localStorage.setItem("purchasedBooks", JSON.stringify(updated));

    // SweetAlert for purchase success
    Swal.fire({
      title: `${book.name} purchased successfully!`,
      icon: 'success',
      confirmButtonText: 'OK',
      background: '#f4f4f9',
      color: '#333',
      confirmButtonColor: '#4CAF50'
    });


    // Notify Navbar to update the book count
    window.dispatchEvent(new Event("bookPurchased"));
  };

  return (
    <div className='book-card' data-aos="fade-up" data-aos-duration="1000">
      <img
        src={imageUrl}
        alt={name}
        className='book-image'
        onClick={(e) => e.preventDefault()}
        onMouseDown={(e) => e.preventDefault()}
        draggable={false}
      />
      <div className='book-details'>
        <h2><FaBook /> {name}</h2>
        <p><FaUser /> {author}</p>
      </div>

      {role === "admin" && (
        <div className='book-actions'>
          <Link to={`/update/${book._id}`} className="book-button btn-edit">
            <FaEdit /> Edit
          </Link>
          <Link to={`/delete/${book._id}`} className="book-button btn-delete">
            <FaTrash /> Delete
          </Link>
        </div>
      )}

      {(role === "user" || role === "student") && (
        <div className='book-actions'>
          <button onClick={handleBuy} className="book-button btn-buy">
            <FaShoppingCart /> Buy
          </button>
        </div>
      )}
    </div>
  );
}

export default BookCard;
