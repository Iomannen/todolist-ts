import React from "react";
import MainLogo from "./mainlogo/MainLogo";
import Input from "./input/Input";
import BottomButtons from "./bottom-buttons/BottomButtons";
class toDoListBody extends React.PureComponent {
  render() {
    return (
      <div className="background">
        <MainLogo />
        <Input />
        <BottomButtons />
      </div>
    );
  }
}

export default toDoListBody;
