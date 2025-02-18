import React from "react";

import logosvg from "./logo-assets/rocket.svg";
import "./logo.css";

class Logo extends React.Component {
  render() {
    return (
      <img className="logo" src={logosvg} alt={"Логотип в виде ракеты"}></img>
    );
  }
}

export default Logo;
