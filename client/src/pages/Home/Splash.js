import React from "react";
import { Link } from "react-router-dom";
import "./Splash.scss";

const Splash = () => {
  return (
    <div>
      <div class="splash">
        <div class="splsh_logo">MSBT</div>
        <div class="splash_svg">
          <svg width="100%" height="100%">
            <rect width="100%" height="100%"></rect>
          </svg>
        </div>
        <div class="splash_minimize">
          <svg width="100%" height="100%">
            <rect width="100%" height="100%"></rect>
          </svg>
        </div>
      </div>
      <div class="text">
        <p>Helmet Detection AI</p>
        <p>Be aware of Safety!</p>
        <Link to="/camera">
          <button>Start</button>
        </Link>
      </div>
    </div>
  );
};
export default Splash;
