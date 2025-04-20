import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useParams } from 'react-router-dom'
function DeleteBook() {
    const navigate = useNavigate();
    const {id} = useParams(); 
    useEffect(() => {
      axios
        .delete('http://localhost:5000/book/book/'+id)
        .then((res) => {
          if (res.data.deleted) {
       
            navigate("/books");
          }
        })
        .catch((err) => console.log(err));
    }, []);
 
}

export default DeleteBook
