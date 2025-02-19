import React from "react";
import "./bottomButton.css";
interface BottomButtonsContent {
  textContent: string;
}
class BottomButton extends React.PureComponent<BottomButtonsContent> {
  render() {
    return <button className="bottombutton">{this.props.textContent}</button>;
  }
}

export default BottomButton;
