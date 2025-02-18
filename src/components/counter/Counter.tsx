import React from "react";
import CounterModule from "./counter-modules/CounterModule";
import "./counter.css";
class Counter extends React.PureComponent {
  render() {
    return (
      <div className="tasksCounter">
        <CounterModule />
        <CounterModule />
      </div>
    );
  }
}

export default Counter;
