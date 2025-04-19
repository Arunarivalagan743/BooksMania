import React from 'react'
import "../css/BookCard.css";
import { useState } from 'react'
import { Link } from 'react-router-dom';
function BookCard({book}) {
    const {name, author, imageUrl} = book;
    console.log(book);
  return (
    <div className='book-card'>
        <img src={imageUrl} alt={name} className='book-image' />
        <div className='book-details'>
            <h2>{name}</h2>
            <p>{author}</p>
        </div>
        <div className='book-actions'>
        <button className='book-button'><Link to={`/update/${book._id}`} className="btn-link">Edit</Link></button>
        <button className='book-button'>Delete</button> 
        </div>
    </div>
  )
}

export default BookCard
