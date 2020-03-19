import { task } from "../../types/task";

export type Props = {
  taskList: task[];
  onCreateTask?: any;
  onDeleteTask?: any;
  onChangeStatus?: any;
  onSaveEditTask?: any;
  onEditTask?: any;
  dispatch?: any;
}
