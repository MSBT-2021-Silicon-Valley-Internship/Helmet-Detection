import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div id="start-page">
      <img
        src="https://img.icons8.com/ios/150/000000/bicycle-helmet.png"
        alt="helmet"
      />
      <h1>Helmet Detection</h1>
      <h2>Be aware of Safety!</h2>
      <Link to="/camera">
        <button>Start</button>
      </Link>
    </div>
  );
};
export default Home;
