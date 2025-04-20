import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import Swal from "sweetalert2"; // Import SweetAlert2

function Logout({ setRole }) {
  const Navigate = useNavigate();

  useEffect(() => {
    // Initialize AOS
    AOS.init({ duration: 1000 });

    // Perform logout
    axios
      .get("http://localhost:5000/auth/logout")
      .then((res) => {
        if (res.data.logout) {
          // Display success SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Logged Out',
            text: 'You have successfully logged out!',
          }).then(() => {
            // Reset role state and redirect
            setRole("");
            Navigate("/");
          });
        }
      })
      .catch((err) => {
        // Handle error with SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Logout Failed',
          text: 'There was an issue with logging out. Please try again.',
        });
        console.log(err);
      });
  }, [Navigate, setRole]); // Adding Navigate and setRole to dependency array

  return (
    <div className="logout-container" data-aos="fade-up">
      {/* You can optionally add a loading or spinner here */}
      <p data-aos="fade-left">Logging out...</p>
    </div>
  );
}

export default Logout;
