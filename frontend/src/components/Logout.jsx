import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";

function Logout({ setRole }) {
  const Navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });

    axios
      .get("https://booksmania-7.onrender.com/auth/logout")
      .then((res) => {
        if (res.data.logout) {
          Swal.fire({
            icon: 'success',
            title: 'Logged Out',
            text: 'You have successfully logged out!',
          }).then(() => {
            setRole("");
            Navigate("/");
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Logout Failed',
          text: 'There was an issue with logging out. Please try again.',
        });
        console.log(err);
      });
  }, [Navigate, setRole]);

  return (
    <div className="logout-container" data-aos="fade-up">
      <p data-aos="fade-left">Logging out...</p>
    </div>
  );
}

export default Logout;
