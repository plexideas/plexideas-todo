import { task } from "../../types/task";

export type Props = {
  taskList: task[];
  onDeleteTask: any;
  onChangeStatus: any;
  onEditTask: any;
  onSaveEditTask: any;
}
