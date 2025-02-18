import React from "react";
import MainLogo from "./mainlogo/MainLogo";
import Input from "./input/Input";
class toDoListBody extends React.PureComponent {
  render() {
    return (
      <div className="background">
        <MainLogo />
        <Input />
      </div>
    );
  }
}

export default toDoListBody;
