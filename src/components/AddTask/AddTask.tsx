import React from 'react';

import { Button } from '../Button';
import { Props } from './props';
import './AddTask.css';

export default (props: Props) => {
  const { onCreateTask } = props;

  let input: any;

  const onCreateTaskHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!input.value.trim()) {
      return;
    }
    onCreateTask(input.value);
    input.value = '';
  }

  const onPressEnterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (input.value.trim() && e.key === 'Enter') {
      onCreateTask(input.value);
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
