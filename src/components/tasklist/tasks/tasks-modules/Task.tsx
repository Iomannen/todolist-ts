import React from "react";
import "./task.css";
import { TaskObject } from "../../../ToDoListBody";
interface TaskProps {
  renderCallback: (tasksForRender: Array<TaskObject>) => React.ReactNode;
  tasksForRender: Array<TaskObject>;
}

class Task extends React.Component<TaskProps> {
  render() {
    return this.props.renderCallback(this.props.tasksForRender);
  }
}

export default Task;
