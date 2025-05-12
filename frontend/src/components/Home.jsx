import React, { useEffect } from "react";
import "../css/Home.css";
import AOS from "aos";
import "aos/dist/aos.css";

function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="hero">
      <div className="overlay"></div>
      <div className="hero-content" data-aos="fade-up">
        <h1 className="hero-text" data-aos="fade-right">Books Store</h1>
        <p className="hero-description" data-aos="fade-left">
          Welcome to our BookMania! We offer a wide selection of books across
          various genres. Whether you're looking for the latest bestseller or a
          classic novel, we have something for everyone. Explore our collection
          and find your next great read!
        </p>
      </div>
    </div>
  );
}

export default Home;
