import React from "react";
import plus from "./input-button-assets/plus.svg";
import "./inputButton.css";
interface InputProps {
  callback: any;
}
class InputButton extends React.PureComponent<InputProps> {
  render() {
    return (
      <button className="additionButton" onClick={this.props.callback}>
        <div className="buttonLabel">Добавить</div>
        <img src={plus} className="buttonPlus" alt="alt"></img>
      </button>
    );
  }
}
export default InputButton;
