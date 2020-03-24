import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import { CREATE_TASK } from '../../graphql/task';
import { Button } from '../Button';
import { Props } from './props';
import './AddTask.css';

export default (props: Props) => {
  const { onCreateTask } = props;
  const [ createTask ] = useMutation(CREATE_TASK);

  let input: any;

  const onCreateTaskHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!input.value.trim()) {
      return;
    }
    createTask({variables: {text: input.value, owner: "OOOO@asdas.er"}})
    input.value = '';
  }

  const onPressEnterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (input.value.trim() && e.key === 'Enter') {
      createTask({variables: {text: input.value, owner: "OOOO@asdas.er"}})
      input.value = '';
    }
  }

  return (
    <div className="task-add">
      <input className="task-input" ref={node => input = node} onKeyPress={onPressEnterHandler}/>
      <Button className="task-addbtn" onClick={onCreateTaskHandler}>add</Button>
    </div>
  )
}
