import React from 'react';
import { Props } from './props';
import './Editable.css';

const Editable: React.FC<Props> = ({isEdit , ...props}) => {
  const { children, className, onDoubleClick, onSaveEditTask } = props;

  const onBlurHandler = (e: any) => {
    onSaveEditTask(e.target.value);
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
    return <div onDoubleClick={onDoubleClick} className={className}>{ children }</div>
  }

  return isEdit ? rednerEditable() : renderReadOnly();
}

export default Editable;
