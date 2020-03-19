import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { TaskList } from '../../components/TaskList';
import { store } from '../../types/store';
import * as selectors from '../../store/tasks/selectors';
import * as taskActions from '../../store/tasks/actions';

import { Props } from './props';
import './Tasks.css';
import { AddTask } from '../../components/AddTask';

class Tasks extends React.Component<Props> {
  render() {
    const { taskList, onCreateTask, onDeleteTask, onChangeStatus, onEditTask, onSaveEditTask } = this.props;
    
    return (
      <div className="tasks">
        <h1>Task list</h1>
        <AddTask onCreateTask={onCreateTask}/>
        <TaskList
          taskList={taskList}
          onDeleteTask={onDeleteTask}
          onChangeStatus={onChangeStatus}
          onEditTask={onEditTask}
          onSaveEditTask={onSaveEditTask}
        />
        <p>Count: {taskList.length}</p>
      </div>
    )
  }
}

function mapStateToProps(state: store): Props {
  return {
    taskList: selectors.getTaskList(state),
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onCreateTask: (content: string) => {
      dispatch(taskActions.onCreateTask(content));
    },
    onDeleteTask: (id: any) => {
      dispatch(taskActions.deleteTask(id));
    },
    onChangeStatus: (id: any, status: string) => {
      dispatch(taskActions.changeStatus(id, status));
    },
    onEditTask: (id: any) => {
      dispatch(taskActions.editTask(id));
    },
    onSaveEditTask: (id: any, task: string) => {
      dispatch(taskActions.saveEditTask(id, task));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Tasks);

