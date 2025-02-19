import React from "react";
import BottomButton from "./bottom-buttons-modules/BottomButton";
import "./bottomButtons.css";

class BottomButtons extends React.PureComponent {
  render() {
    return (
      <div className="bottombuttons_block">
        <div className="firstbutton_block">
          <BottomButton textContent={"Все задачи"} />
          <BottomButton textContent={"Завершенные"} />
          <BottomButton textContent={"В процессе"} />
        </div>
        <div className="secondbutton_block">
          <BottomButton textContent={"Удалить"} />
        </div>
      </div>
    );
  }
}

export default BottomButtons;
