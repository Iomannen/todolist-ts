import React from "react";
import "./input.css";
import InputButton from "./input-modules/input-button/InputButton";
import InputModule from "./input-modules/input/InputModule";
class Input extends React.PureComponent {
  render() {
    return (
      <div className="taskAdditionBlock">
        <InputModule />
        <InputButton />
      </div>
    );
  }
}

export default Input;
