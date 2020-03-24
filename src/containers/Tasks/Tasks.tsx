import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';

import { TaskList } from '../../components/TaskList';
import { store } from '../../types/store';
import * as selectors from '../../store/tasks/selectors';
import * as taskActions from '../../store/tasks/actions';

import { Props } from './props';
import './Tasks.css';
import { AddTask } from '../../components/AddTask';
import { GET_ALL_TASK_BY_OWNER, SUBSCRIBE_TASK_CREATED, SUBSCRIBE_TASK_DELETED, SUBSCRIBE_TASK_EDITED } from '../../graphql/task';

class Tasks extends React.Component<Props> {

  _subscribeTaskCreated = (subscribeToMore: any) => {
    subscribeToMore({
      document: SUBSCRIBE_TASK_CREATED,
      updateQuery: (prev: any, { subscriptionData }: any) => {
        if (!subscriptionData.data) return prev;

        const newFeedItem = subscriptionData.data.taskCreated;
        
        const isAlreadyExist = prev.tasks.filter((task: any) => 
            task._id === newFeedItem._id
          ).length > 0;
        if (isAlreadyExist) return prev;

        console.log("taskCreated: ", newFeedItem)
        return {
          ...prev,
          tasks: [...prev.tasks, newFeedItem]
        };
      }
    })
  }

  _subscribeTaskEdited = (subscribeToMore: any) => {
    subscribeToMore({
      document: SUBSCRIBE_TASK_EDITED,
      updateQuery: (prev: any, { subscriptionData }: any) => {
        if (!subscriptionData.data) return prev;

        const newFeedItem = subscriptionData.data.taskEdited;

        const isAlreadyExist = prev.tasks.filter((task: any) => 
          task._id === newFeedItem._id && task.text === newFeedItem.text && task.status === newFeedItem.status
        ).length > 0;

        if (isAlreadyExist) return prev;
        
        console.log("taskEdited: ", newFeedItem);
        return {
          tasks: prev.tasks.map((task: any) => {
            return task._id === newFeedItem._id ? newFeedItem : task;
          })
        };
      }
    })
  }

  _subscribeTaskDeleted = (subscribeToMore: any) => {
    subscribeToMore({
      document: SUBSCRIBE_TASK_DELETED,
      updateQuery: (prev: any, { subscriptionData }: any) => {
        if (!subscriptionData.data) return prev;
        const removedId = subscriptionData.data.taskDeleted;
        console.log("taskDeleted: ", removedId)
        return {
          tasks: prev.tasks.filter((task: any) => task._id !== removedId)
        };
      }
    })
  }

  render() {
    const { taskList, onCreateTask, onDeleteTask, onChangeStatus, onEditTask, onSaveEditTask } = this.props;
    
    return (
      <div className="tasks">
        <h1>Task list</h1>
        <AddTask onCreateTask={onCreateTask}/>
        <Query query={GET_ALL_TASK_BY_OWNER} variables={{owner: "OOOO@asdas.er"}}>
          {
            ({ data, loading, subscribeToMore }: any) => {
              if (loading) {
                return (
                  <p>Loading ...</p>
                )
              }

              this._subscribeTaskCreated(subscribeToMore);
              this._subscribeTaskEdited(subscribeToMore);
              this._subscribeTaskDeleted(subscribeToMore);

              return (
                <TaskList
                  taskList={data.tasks}
                  onDeleteTask={onDeleteTask}
                  onChangeStatus={onChangeStatus}
                  onEditTask={onEditTask}
                  onSaveEditTask={onSaveEditTask}
                />
              )
            }
          }
        </Query>
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

