import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button } from '../Button';

import { Props } from './props';
import './StatusSelect.css';
import { CHANGE_STATUS } from '../../graphql/task';

const StatusSelect = (props: Props) => {
  const { currentStatus, taskId } = props;
  const [ changeTaskStatus ] = useMutation(CHANGE_STATUS);

  const statusList = ['NEW', 'IN PROGRES', 'HOLD', 'DONE'].filter(status => status !== currentStatus);

  let isStatusListVisible: boolean = false;

  const toggleClassParentNode = (e: any) => {
    e.target.parentNode.className = isStatusListVisible ? 'status-select' : 'status-select hide';
  };

  const onClickHandler = (e: any) => {
    e.preventDefault();
    isStatusListVisible = !isStatusListVisible;
    toggleClassParentNode(e);
  }

  const onSelectHandler = (e: any) => {
    e.preventDefault();
    isStatusListVisible = false;
    changeTaskStatus({ variables: { _id: taskId, status: e.target.innerText} });
    toggleClassParentNode(e);
  }

  return (
    <div className="status-select hide">
      <Button className='btn' onClick={onClickHandler}>{currentStatus}</Button>
      { 
        statusList.map(status => <Button key={taskId + status} onClick={onSelectHandler}>{ status }</Button>)
      }
    </div>
  )
}

export default StatusSelect;
