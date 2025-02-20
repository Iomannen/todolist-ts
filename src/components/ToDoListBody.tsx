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
  taskRefs: any = [];

  buttonRefs: Record<string, React.RefObject<HTMLButtonElement | null>> = {
    allTasksRef: React.createRef<HTMLButtonElement>(),
    completeTasksRef: React.createRef<HTMLButtonElement>(),
    inProcessTasksRef: React.createRef<HTMLButtonElement>(),
    deleteRef: React.createRef<HTMLButtonElement>(),
  };
  inputRef = React.createRef<HTMLInputElement>();

  state = {
    completeTasksLength: 0,
    tasksLength: this.Tasks.length,
    renderTasks: this.Tasks,
  };

  componentDidMount(): void {
    const localStorageTasks: string | null = localStorage.getItem("tasks");
    if (localStorageTasks === null) return;
    this.buttonRefs.allTasksRef.current?.classList.add("active");
    this.Tasks = [...JSON.parse(localStorageTasks)];
    const completeTasks: Array<TaskObject> = this.Tasks.filter(
      (task) => task.isComplete === true
    );
    this.setState({
      tasksLength: this.Tasks.length,
      renderTasks: this.Tasks,
      completeTasksLength: completeTasks.length,
    });
  }

  renderTasks = (tasksForRender: Array<TaskObject>) => {
    tasksForRender.sort((a, b) => {
      if (a.isComplete !== b.isComplete) {
        return String(a.isComplete).localeCompare(String(b.isComplete)); // "pending" раньше "completed"
      }
      // Если статусы одинаковые, сортируем по второму полю (priority)
      return b.timestamp - a.timestamp;
    });
    tasksForRender.forEach((task) => {
      const taskRef = React.createRef<HTMLDivElement>();
      this.taskRefs.push(taskRef);
    });
    return tasksForRender.map((task: TaskObject, index: number) => (
      <div
        className="task"
        key={`${task.name}${task.timestamp}`}
        ref={this.taskRefs[index]}
      >
        <label className="checkbox_label">
          <input
            className="task_checkbox"
            type="checkbox"
            onChange={() => {
              this.handleCheckBox(task, index);
            }}
            checked={task.isComplete}
            disabled={task.isComplete}
          ></input>
          <span className="custom_checkbox"></span>
        </label>
        <input
          className="task_name"
          placeholder={task.name}
          disabled={true}
        ></input>
        <button
          className={`edit_button ${task.isComplete ? "disappear" : ""}`}
        ></button>
        <button
          className="delete_button"
          onClick={() => {
            this.deleteTask(index, this.taskRefs);
          }}
        ></button>
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
      // эта хуйня внизу отслеживает состояние кнопки и рендерит список по этому принципу
      this.callback();
    } else return;
  };

  deleteTask = (index: number, taskRefs: any) => {
    const updatedTasks = this.Tasks.filter((_, i) => i !== index);
    this.Tasks = [...updatedTasks];
    localStorage.setItem("tasks", JSON.stringify(this.Tasks));
    const completeTasks: Array<TaskObject> = this.Tasks.filter(
      (task) => task.isComplete === true
    );
    this.setState({
      renderTasks: this.Tasks,
      tasksLength: this.Tasks.length,
      completeTasksLength: completeTasks.length,
    });
  };

  handleClickBottom = (ref: HTMLButtonElement): void => {
    Object.values(this.buttonRefs).forEach((el: any) =>
      el.current.classList.remove("active")
    );
    ref.classList.add("active");
    // эта хуйня внизу отслеживает состояние кнопки и рендерит список по этому принципу
    this.callback();
  };

  handleCheckBox = (task: TaskObject, index: number): void => {
    const updatedTasks = this.Tasks.filter((_, i) => i !== index);
    const updatedTask: TaskObject = {
      name: task.name,
      isComplete: true,
      timestamp: Date.now(),
    };
    const newTasks = [updatedTask, ...updatedTasks];
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    const completeTasks = newTasks.filter((task) => task.isComplete);
    this.Tasks = newTasks;
    this.setState({
      renderTasks: this.Tasks,
      completeTasksLength: completeTasks.length,
    });
  };

  callback = (): void => {
    const refs = Object.keys(this.buttonRefs);
    const completeTasks: Array<TaskObject> = this.Tasks.filter(
      (task) => task.isComplete === true
    );
    const inProcessTasks: Array<TaskObject> = this.Tasks.filter(
      (task) => task.isComplete === false
    );
    refs.forEach((ref) => {
      const button = this.buttonRefs[ref].current;
      if (!button) return;
      if (button.className === "bottombutton active") {
        button.innerText === "Все задачи"
          ? this.setState({
              completeTasksLength: completeTasks.length,
              renderTasks: [...this.Tasks],
              tasksLength: this.Tasks.length,
            })
          : button.innerText === "Завершенные"
          ? this.setState({
              completeTasksLength: completeTasks.length,
              renderTasks: completeTasks,
              tasksLength: this.Tasks.length,
            })
          : this.setState({
              completeTasksLength: completeTasks.length,
              renderTasks: inProcessTasks,
              tasksLength: this.Tasks.length,
            });
      }
    });
  };
  clearCompleteTasks = () => {
    this.Tasks = this.Tasks.filter((task) => task.isComplete === false);
    localStorage.setItem("tasks", JSON.stringify(this.Tasks));
    // эта хуйня внизу отслеживает состояние кнопки и рендерит список по этому принципу
    this.callback();
  };

  render() {
    return (
      <div className="background">
        <MainLogo />
        <Input callback={this.addTask} inputRef={this.inputRef} />
        <BottomButtons
          callback={this.handleClickBottom}
          deleteCallback={this.clearCompleteTasks}
          buttonRefs={this.buttonRefs}
        />
        <Counter
          taskCount={this.state.tasksLength}
          completeCount={this.state.completeTasksLength}
        />
        <TaskList
          renderCallback={this.renderTasks}
          tasksForRender={this.state.renderTasks}
        />
      </div>
    );
  }
}

export default ToDoListBody;
