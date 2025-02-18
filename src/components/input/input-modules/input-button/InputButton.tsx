import React from "react";
import plus from "./input-button-assets/plus.svg";
import "./inputButton.css";
class InputButton extends React.PureComponent {
  render() {
    return (
      <button className="additionButton">
        <div className="buttonLabel">Добавить</div>
        <img src={plus} className="buttonPlus" alt="alt"></img>
      </button>
    );
  }
}
export default InputButton;
