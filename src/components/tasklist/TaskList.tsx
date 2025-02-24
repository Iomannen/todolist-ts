import React from "react";
import Task from "./tasks/tasks-modules/Task";
import "./taskList.css";
import { TaskObject } from "../ToDoListBody";

interface TaskListProps {
  renderCallback: (tasksForRender: Array<TaskObject>) => React.ReactNode;
  tasksForRender: Array<TaskObject>;
}
class TaskList extends React.Component<TaskListProps> {
  render() {
    return (
      <div className="tasklist">
        <Task
          renderCallback={this.props.renderCallback}
          tasksForRender={this.props.tasksForRender}
        />
      </div>
    );
  }
}
export default TaskList;
