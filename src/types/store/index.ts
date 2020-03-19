import { task } from "../task"

export type store = {
  tasks: taskState;
}

export type taskState = {
  taskList: task[];
}
