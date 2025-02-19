import React from "react";
import "./inputModule.css";
interface InputProps {
  inputRef: any;
  callback: any;
}
class InputModule extends React.PureComponent<InputProps> {
  render() {
    return (
      <input
        className="input"
        placeholder="Добавить новую задачу..."
        ref={this.props.inputRef}
        onKeyUp={this.props.callback}
      ></input>
    );
  }
}
export default InputModule;
