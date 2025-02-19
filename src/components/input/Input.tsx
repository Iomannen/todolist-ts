import React from "react";
import "./input.css";
import InputButton from "./input-modules/input-button/InputButton";
import InputModule from "./input-modules/input/InputModule";

interface InputProps {
  callback: any;
  inputRef: any;
}
class Input extends React.PureComponent<InputProps> {
  render() {
    return (
      <div className="taskAdditionBlock">
        <InputModule
          inputRef={this.props.inputRef}
          callback={this.props.callback}
        />
        <InputButton callback={this.props.callback} />
      </div>
    );
  }
}

export default Input;
