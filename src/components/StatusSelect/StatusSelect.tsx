import React from 'react';
import { Props } from './props';
import './StatusSelect.css';
import { Button } from '../Button';

const StatusSelect = (props: Props) => {
  const { currentStatus, onChangeStatus, taskId } = props;

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
    onChangeStatus(taskId, e.target.innerText);
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
