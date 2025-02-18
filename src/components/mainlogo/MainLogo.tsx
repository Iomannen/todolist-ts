import React from "react";
import Logo from "./mainlogo-modules/logo/Logo";
import Label from "./mainlogo-modules/label/Label";
import "./mainLogo.css";
class MainLogo extends React.PureComponent {
  render() {
    return (
      <div className="mainlogo">
        <Logo />
        <Label />
      </div>
    );
  }
}

export default MainLogo;
