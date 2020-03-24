import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button } from '../Button';
import { Editable } from '../Editable';
import { StatusSelect } from '../StatusSelect';

import { Props } from './props';
import './Task.css'
import { DELETE_TASK, EDIT_TASK } from '../../graphql/task';

const Task = (props: Props) => {
  const { task, onChangeStatus } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [ deleteTask ] = useMutation(DELETE_TASK);
  const [ changeTaskStatus ] = useMutation(EDIT_TASK);


  const onDelete = () => {
    deleteTask({ variables: { _id: task._id } });
  }

  const onSaveEditTaskHandler = (text: string) => {
    changeTaskStatus({ variables: { _id: task._id, text } });
  }

  const onChangeEditable = () => {
    setIsEdit(!isEdit);
  }

  return (
    <li className="task">
      <Editable isEdit={isEdit} onSaveEditTask={onSaveEditTaskHandler} className="task-content" onChangeEditable={onChangeEditable}>{task.text}</Editable>
      <div className="task-menu">
        <div className="task-owner">{task.owner}</div>
        <div className="task-controll">
          <StatusSelect currentStatus={task.status.toString()} onChangeStatus={onChangeStatus} taskId={task._id} />
          <Button onClick={onDelete}>delete</Button>
        </div>
      </div>
    </li>
  )
}

export default Task;
