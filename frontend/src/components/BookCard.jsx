
import React from 'react';
import "../css/BookCard.css";
import { FaEdit, FaTrash, FaBook, FaUser, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function BookCard({ book, role }) {
  const { name, author, imageUrl } = book;

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

      {/* Admin Role: Edit & Delete */}
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

      {/* User/Student Role: Buy Button */}
      {(role === "user" || role === "student") && (
        <div className='book-actions'>
          <Link to={`/buy/${book._id}`} className="book-button btn-buy">
            <FaShoppingCart /> Buy
          </Link>
        </div>
      )}
    </div>
  );
}

export default BookCard;
