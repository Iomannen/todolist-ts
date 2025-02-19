import React from "react";
import Task from "./tasks/tasks-modules/Task";
import "./taskList.css";
interface TaskListProps {
  renderCallback: Function;
  tasksForRender: any;
}
class TaskList extends React.PureComponent<TaskListProps> {
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
