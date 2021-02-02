import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { ClickButton } from "./ClickButton.js";
import { HorizontalLabelPositionBelowStepper } from "./Stepper";
import "./Home.css";
import "./ClickButton.scss";

const Home = () => {
  return (
    <div>
      <div id="start-page">
        <img
          src="https://img.icons8.com/ios/150/000000/bicycle-helmet.png"
          alt="helmet"
        />
        <div id="main-paragraph">
          <h1>Helmet Detection AI</h1>
          <h2>Be aware of Safety!</h2>
        </div>
        <HorizontalLabelPositionBelowStepper />
        <Link to="/camera">
          <button id="start-button">START!</button>
        </Link>
        <ClickButton />
      </div>
      <div id="start-button"></div>
    </div>
  );
};
export default Home;
