import React from "react";
import "./counterModule.css";
class CounterModule extends React.PureComponent {
  render() {
    return (
      <div className="tasksCounterModule">
        <div className="tasksText">Заглушка текст</div>
        <div className="tasksCount">0</div>
      </div>
    );
  }
}

export default CounterModule;
