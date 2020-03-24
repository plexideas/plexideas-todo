import React, { ReactElement } from 'react';

import Task from '../Task/Task';
import { task } from '../../types/task';
import { Props } from './props';
import './TaskList.css'

const TaskList = (props: Props) => {
  const {taskList,  onDeleteTask, onChangeStatus, onEditTask, onSaveEditTask } = props

  const renderTaskList = (tasks: task[]): ReactElement[] => {
    return taskList.map(task => 
      <Task 
        task={task}
        key={task._id}
        onDeleteTask={onDeleteTask}
        onChangeStatus={onChangeStatus}
        onEditTask={onEditTask}
        onSaveEditTask={onSaveEditTask}
      />
    );
  }

  return (
    <ul className="task-list">
      { renderTaskList(taskList) }
    </ul>
  );
}



export default TaskList;
