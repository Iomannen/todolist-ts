import React from 'react';
import CounterModule from './counter-modules/CounterModule';
import './counter.css';
import { TaskObject } from '../ToDoListBody';
interface CounterProps {
  taskCount: number | string;
  completeCount: number;
}

class Counter extends React.PureComponent<CounterProps> {
  findCompleteTasksNumber = (): number => {
    const localStorageTasks = localStorage.getItem('tasks');
    if (localStorageTasks === null) return 0;
    const completeTasks = JSON.parse(localStorageTasks).filter(
      (task: TaskObject) => task.isComplete === true,
    );
    return completeTasks.length;
  };

  render() {
    return (
      <div className="tasksCounter">
        <CounterModule
          taskCount={this.props.taskCount}
          textContent={'Все задачи'}
        />
        <CounterModule
          taskCount={`${this.props.completeCount} из ${this.props.taskCount}`}
          textContent={'Завершено'}
        />
      </div>
    );
  }
}

export default Counter;
