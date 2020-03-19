import { store } from "../../types/store";
import { task } from "../../types/task";

export const getTaskList = (state: store): task[] => {
  return state.tasks.taskList;
}
