import React from "react";
import { Link } from "react-router-dom";
import { HorizontalLabelPositionBelowStepper } from "./Stepper";
import "./Home.scss";
import Navigation from "../Navigation/Navigation.js";

const Home = () => {
  return (
    <div>
      <Navigation />
      <div id="start-page">
        <img
          src="https://img.icons8.com/ios/150/000000/bicycle-helmet.png"
          alt="helmet"
        />
        <div id="main-paragraph">
          <h1>Helmet Detection AI</h1>
          <h2>Be aware of Safety!</h2>
        </div>
        <div className="stepper">
          <HorizontalLabelPositionBelowStepper />
        </div>
        <Link to="/camera">
          <button className="start-button">START!</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
