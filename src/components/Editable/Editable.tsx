import React from 'react';
import { EDIT_TASK } from '../../graphql/task';
import { useMutation } from '@apollo/react-hooks';

import { Props } from './props';
import './Editable.css';

const Editable: React.FC<Props> = ({isEdit , ...props}) => {
  const { children, className, onChangeEditable, onSaveEditTask } = props;


  const onBlurHandler = (e: any) => {
    onSaveEditTask(e.target.value);
    onChangeEditable();
  }

  const onKeyPressHandler = (e: any) => {
     if (e.key === 'Enter')  onSaveEditTask(e.target.value);
  }

  const rednerEditable = () => {
    return (
      <input 
        className={className}
        type="text"
        defaultValue={children}
        onBlur={onBlurHandler}
        onKeyPress={onKeyPressHandler}
      />
    )
  }

  const renderReadOnly = () => {
    return <div onDoubleClick={onChangeEditable} className={className}>{ children }</div>
  }

  return isEdit ? rednerEditable() : renderReadOnly();
}

export default Editable;
