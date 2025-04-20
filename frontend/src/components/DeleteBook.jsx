import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import AOS from 'aos';
import 'aos/dist/aos.css';

function DeleteBook() {
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
      AOS.init({ duration: 1000 });

      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://localhost:5000/book/book/${id}`)
            .then((res) => {
              if (res.data.deleted) {
                Swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                ).then(() => {
                  navigate('/books');
                });
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
        }
      });
    }, [id, navigate]);

    return (
      <div data-aos="fade-up" className="w-full h-full">
      </div>
    );
}

export default DeleteBook;
