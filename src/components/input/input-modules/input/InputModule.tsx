import React from "react";
import "./inputModule.css";
class InputModule extends React.PureComponent {
  render() {
    return (
      <input className="input" placeholder="Добавить новую задачу..."></input>
    );
  }
}
export default InputModule;
