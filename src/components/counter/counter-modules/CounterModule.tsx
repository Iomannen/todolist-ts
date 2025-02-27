import React from 'react';
import './counterModule.css';
interface CounterProps {
  taskCount: number | string;
  textContent: string;
}
class CounterModule extends React.PureComponent<CounterProps> {
  render() {
    return (
      <div className="tasksCounterModule">
        <div className="tasksText">{this.props.textContent}</div>
        <div className="tasksCount">{this.props.taskCount}</div>
      </div>
    );
  }
}

export default CounterModule;
