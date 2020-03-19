import React, { ReactElement } from 'react';
import { Props } from './props';
import Task from '../Task/Task';
import './TaskList.css'

const TaskList = (props: Props) => {
  const { taskList, onDeleteTask, onChangeStatus, onEditTask, onSaveEditTask } = props;

  const renderTaskList = (): ReactElement[] => {
    return taskList.map(
      task => <Task 
                task={task}
                key={task.id}
                onDeleteTask={onDeleteTask}
                onChangeStatus={onChangeStatus}
                onEditTask={onEditTask}
                onSaveEditTask={onSaveEditTask}
              />
    );
  }

  return (
    <ul className="task-list">
      { renderTaskList() }
    </ul>
  );
}



export default TaskList;
