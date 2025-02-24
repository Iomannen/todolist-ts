import React from "react";
import MainLogo from "./mainlogo/MainLogo";
import Input from "./input/Input";
import BottomButtons from "./bottom-buttons/BottomButtons";
import Counter from "./counter/Counter";
import TaskList from "./tasklist/TaskList";
import { formatDistance } from "date-fns";
import { ru } from "date-fns/locale";

export type TaskObject = {
  name: string;
  timestamp: number;
  isComplete: boolean;
  editing: boolean;
};
interface ToDoListState {
  hover: number;
  completeTasksLength: number;
  tasksLength: number;
  renderTasks: Array<TaskObject>;
}

class ToDoListBody extends React.Component {
  Tasks: Array<TaskObject> = [];
  taskRefs: Array<React.RefObject<HTMLDivElement | null>> = [];
  taskInputRefs: Array<React.RefObject<HTMLInputElement | null>> = [];

  buttonRefs: Record<string, React.RefObject<HTMLButtonElement | null>> = {
    allTasksRef: React.createRef<HTMLButtonElement>(),
    completeTasksRef: React.createRef<HTMLButtonElement>(),
    inProcessTasksRef: React.createRef<HTMLButtonElement>(),
    deleteRef: React.createRef<HTMLButtonElement>(),
  };
  inputRef: React.RefObject<HTMLInputElement | null> =
    React.createRef<HTMLInputElement>();

  state: ToDoListState = {
    hover: Date.now(),
    completeTasksLength: 0,
    tasksLength: this.Tasks.length,
    renderTasks: this.Tasks,
  };

  componentDidMount(): void {
    const localStorageTasks: string | null = localStorage.getItem("tasks");
    if (localStorageTasks === null) return;
    this.buttonRefs.allTasksRef.current?.classList.add("active");
    this.buttonRefs.deleteRef.current?.classList.add("disappear");
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

  showTime = (task: TaskObject): string => {
    return `${task.isComplete ? "Завершена" : "Создана"} ${formatDistance(
      task.timestamp,
      this.state.hover,
      { addSuffix: true, locale: ru, includeSeconds: true }
    )}`;
  };

  refreshStateTimestamp = (): void => {
    this.setState({ hover: Date.now() });
  };

  renderTasks = (tasksForRender: Array<TaskObject>): React.ReactNode => {
    tasksForRender.sort((a, b) => {
      if (a.isComplete !== b.isComplete) {
        return String(a.isComplete).localeCompare(String(b.isComplete));
      }
      return b.timestamp - a.timestamp;
    });
    tasksForRender.forEach((task: TaskObject): void => {
      const taskRef: React.RefObject<HTMLDivElement | null> =
        React.createRef<HTMLDivElement>();
      const inputRef: React.RefObject<HTMLInputElement | null> =
        React.createRef<HTMLInputElement>();
      this.taskRefs.push(taskRef);
      this.taskInputRefs.push(inputRef);
    });
    return tasksForRender.map((task: TaskObject, index: number) => (
      <div
        className="task"
        key={`${task.name}${task.timestamp}`}
        ref={this.taskRefs[index]}
        onMouseEnter={this.refreshStateTimestamp}
        title={this.showTime(task)}
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
          className={`task_name ${task.isComplete ? "completedtask_name" : ""}`}
          placeholder={task.name}
          disabled={!task.editing}
          ref={this.taskInputRefs[index]}
          onBlur={() => {
            this.saveTaskName(task, index, this.taskInputRefs);
          }}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              this.saveTaskName(task, index, this.taskInputRefs);
            }
          }}
        ></input>
        <button
          className={`edit_button ${task.isComplete ? "disappear" : ""}`}
          onClick={() => {
            this.editTask(task, index, this.taskInputRefs);
          }}
        ></button>
        <button
          className="delete_button"
          onClick={() => {
            this.deleteTask(index);
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
      let input: string | number = this.inputRef.current.value;
      const task: TaskObject = {
        name: input,
        timestamp: Date.now(),
        isComplete: false,
        editing: false,
      };
      this.Tasks.unshift(task);
      localStorage.setItem("tasks", JSON.stringify(this.Tasks));
      this.inputRef.current.value = "";
      this.setState({
        tasksLength: this.Tasks.length,
        renderTasks: [...this.Tasks],
      });
      this.updateDisplayedTasks();
    } else return;
  };

  deleteTask = (index: number): void => {
    const updatedTasks: Array<TaskObject> = this.Tasks.filter(
      (_, i) => i !== index
    );
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
  saveTaskName = (
    task: TaskObject,
    index: number,
    taskInputRefs: Array<React.RefObject<HTMLInputElement | null>>
  ): void => {
    const updatedTasks: Array<TaskObject> = this.Tasks.filter(
      (_, i) => i !== index
    );
    const updatedTask: TaskObject = {
      name: taskInputRefs[index]!.current!.value,
      isComplete: false,
      timestamp: task.timestamp,
      editing: false,
    };
    this.Tasks = [updatedTask, ...updatedTasks];
    localStorage.setItem("tasks", JSON.stringify(this.Tasks));
    this.setState({
      renderTasks: this.Tasks,
    });
  };
  editTask = (
    task: TaskObject,
    index: number,
    taskInputRefs: Array<React.RefObject<HTMLInputElement | null>>
  ): void => {
    const updatedTasks: Array<TaskObject> = this.Tasks.filter(
      (_, i) => i !== index
    );
    const updatedTask: TaskObject = {
      name: task.name,
      isComplete: false,
      timestamp: task.timestamp,
      editing: true,
    };
    this.Tasks = [updatedTask, ...updatedTasks];
    localStorage.setItem("tasks", JSON.stringify(this.Tasks));
    this.setState({
      renderTasks: this.Tasks,
    });
    setTimeout(() => {
      if (taskInputRefs[index]?.current) {
        taskInputRefs[index]!.current!.focus();
        taskInputRefs[index]!.current!.value = task.name;
      }
    }, 0);
  };

  handleClickBottom = (ref: HTMLButtonElement): void => {
    Object.values(this.buttonRefs).forEach((el: any) =>
      el.current.classList.remove("active")
    );
    ref.classList.add("active");
    if (ref.innerHTML === "Завершенные") {
      this.buttonRefs.deleteRef.current?.classList.remove("disappear");
    } else this.buttonRefs.deleteRef.current?.classList.add("disappear");
    this.updateDisplayedTasks();
  };

  handleCheckBox = (task: TaskObject, index: number): void => {
    const updatedTasks: Array<TaskObject> = this.Tasks.filter(
      (_, i) => i !== index
    );
    const updatedTask: TaskObject = {
      name: task.name,
      isComplete: true,
      timestamp: Date.now(),
      editing: false,
    };
    const newTasks: Array<TaskObject> = [updatedTask, ...updatedTasks];
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    const completeTasks: Array<TaskObject> = newTasks.filter(
      (task) => task.isComplete
    );
    this.Tasks = newTasks;
    this.setState({
      renderTasks: this.Tasks,
      completeTasksLength: completeTasks.length,
    });
  };

  updateDisplayedTasks = (): void => {
    const refs: Array<string> = Object.keys(this.buttonRefs);
    const completeTasks: Array<TaskObject> = this.Tasks.filter(
      (task) => task.isComplete === true
    );
    const inProcessTasks: Array<TaskObject> = this.Tasks.filter(
      (task) => task.isComplete === false
    );
    refs.forEach((ref) => {
      const button: HTMLButtonElement | null = this.buttonRefs[ref].current;
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

  clearCompleteTasks = (): void => {
    this.Tasks = this.Tasks.filter((task) => task.isComplete === false);
    localStorage.setItem("tasks", JSON.stringify(this.Tasks));
    this.updateDisplayedTasks();
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
