import React from "react";
import "./task.css";
interface TaskProps {
  renderCallback: Function;
  tasksForRender: any;
}

class Task extends React.PureComponent<TaskProps> {
  render() {
    return this.props.renderCallback(this.props.tasksForRender);
  }
}

export default Task;
