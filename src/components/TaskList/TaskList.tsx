import React, { ReactElement } from 'react';

import Task from '../Task/Task';
import { task } from '../../types/task';
import { Props } from './props';
import './TaskList.css'

const TaskList = (props: Props) => {
  const { taskList, user } = props

  const renderTaskList = (tasks: task[]): ReactElement[] => {
    return taskList.map(task => 
      <Task 
        user={user}
        task={task}
        key={task._id}
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
