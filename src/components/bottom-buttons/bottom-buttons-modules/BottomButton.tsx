import React from "react";
import "./bottomButton.css";
interface BottomButtonsContent {
  textContent: string;
  callback: any;
  buttonRef: any;
}
class BottomButton extends React.PureComponent<BottomButtonsContent> {
  render() {
    return (
      <button
        className="bottombutton"
        onClick={() => {
          this.props.callback(this.props.buttonRef.current);
        }}
        ref={this.props.buttonRef}
      >
        {this.props.textContent}
      </button>
    );
  }
}

export default BottomButton;
