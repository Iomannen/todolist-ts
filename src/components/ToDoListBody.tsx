import React from "react";
import MainLogo from "./mainlogo/MainLogo";
import Input from "./input/Input";
import BottomButtons from "./bottom-buttons/BottomButtons";
import Counter from "./counter/Counter";
import TaskList from "./tasklist/TaskList";

export type TaskObject = {
  name: string;
  timestamp: number;
  isComplete: boolean;
};

class ToDoListBody extends React.PureComponent {
  Tasks: Array<TaskObject> = [];

  inputRef = React.createRef<HTMLInputElement>();

  state = {
    tasksLength: this.Tasks.length,
    renderTasks: this.Tasks,
    render: 0,
  };

  componentDidMount(): void {
    const localStorageTasks: string | null = localStorage.getItem("tasks");
    if (localStorageTasks === null) return;
    this.Tasks = [...JSON.parse(localStorageTasks)];
    this.setState({ tasksLength: this.Tasks.length, renderTasks: this.Tasks });
  }

  renderTasks = (tasksForRender: Array<TaskObject>) => {
    return tasksForRender.map((task: TaskObject) => (
      <div className="task" key={Math.random()}>
        <label className="checkbox_label">
          <input className="task_checkbox" type="checkbox"></input>
          <span className="custom_checkbox"></span>
        </label>
        <input className="task_name" placeholder={task.name}></input>
        <button className="edit_button"></button>
        <button className="delete_button"></button>
      </div>
    ));
  };

  addTask = (
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
  ): void => {
    if (!this.inputRef.current || this.inputRef.current.value === "") return;
    if (
      (event.type === "keyup" && // тут сразу проверяем тип ивента
        (event as React.KeyboardEvent).key === "Enter") || // это я хз что, джптшка мне посоветовала. на просто event.key TS ругается
      event.type === "click"
    ) {
      let input = this.inputRef.current.value;
      const task: TaskObject = {
        name: input,
        timestamp: Date.now(),
        isComplete: false,
      };
      this.Tasks.unshift(task);
      localStorage.setItem("tasks", JSON.stringify(this.Tasks));
      this.inputRef.current.value = "";
      this.setState({
        tasksLength: this.Tasks.length,
        renderTasks: [...this.Tasks],
      });
    } else return;
  };

  render() {
    return (
      <div className="background">
        <MainLogo />
        <Input callback={this.addTask} inputRef={this.inputRef} />
        <BottomButtons />
        <Counter taskCount={this.state.tasksLength} />
        <TaskList
          renderCallback={this.renderTasks}
          tasksForRender={this.state.renderTasks}
        />
      </div>
    );
  }
}

export default ToDoListBody;
