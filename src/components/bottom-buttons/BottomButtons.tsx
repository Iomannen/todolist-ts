import React from "react";
import BottomButton from "./bottom-buttons-modules/BottomButton";
import "./bottomButtons.css";

interface BottomButtonsProps {
  callback?: (ref: HTMLButtonElement) => void;
  deleteCallback?: () => void;
  buttonRefs: Record<string, React.RefObject<HTMLButtonElement | null>>;
}
class BottomButtons extends React.PureComponent<BottomButtonsProps> {
  render() {
    return (
      <div className="bottombuttons_block">
        <div className="firstbutton_block">
          <BottomButton
            textContent={"Все задачи"}
            callback={this.props.callback}
            buttonRef={this.props.buttonRefs.allTasksRef}
          />
          <BottomButton
            textContent={"Завершенные"}
            callback={this.props.callback}
            buttonRef={this.props.buttonRefs.completeTasksRef}
          />
          <BottomButton
            textContent={"В процессе"}
            callback={this.props.callback}
            buttonRef={this.props.buttonRefs.inProcessTasksRef}
          />
        </div>
        <div className="secondbutton_block">
          <BottomButton
            textContent={"Очистить"}
            callback={this.props.deleteCallback}
            buttonRef={this.props.buttonRefs.deleteRef}
          />
        </div>
      </div>
    );
  }
}

export default BottomButtons;
