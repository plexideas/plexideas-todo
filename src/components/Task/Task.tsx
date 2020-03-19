import React from 'react';
import { Button } from '../Button';
import { Editable } from '../Editable';
import { StatusSelect } from '../StatusSelect';

import { Props } from './props';
import './Task.css'

const Task = (props: Props) => {
  const { task, onDeleteTask, onChangeStatus, onEditTask, onSaveEditTask } = props;

  const onDelete = () => {
    onDeleteTask(task.id);
  }

  const onEditTaskHandler = () => {
    onEditTask(task.id);
  }

  const onSaveEditTaskHandler = (newTask: string) => {
    onSaveEditTask(task.id, newTask);
  }

  return (
    <li className="task">
      <Editable isEdit={task.isEdit} onSaveEditTask={onSaveEditTaskHandler} className="task-content" onDoubleClick={onEditTaskHandler}>{task.task}</Editable>
      <div className="task-menu">
        <div className="task-owner">{task.owner}</div>
        <div className="task-controll">
          <StatusSelect currentStatus={task.status.toString()} onChangeStatus={onChangeStatus} taskId={task.id} />
          <Button onClick={onDelete}>delete</Button>
        </div>
      </div>
    </li>
  )
}

export default Task;
