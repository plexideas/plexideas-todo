import React from 'react';
import { Query } from 'react-apollo';

import { TaskList } from '../../components/TaskList';

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
        return {
          tasks: prev.tasks.filter((task: any) => task._id !== removedId)
        };
      }
    })
  }

  render() {
    const { user } = this.props;


    return (
      <div className="tasks">
        <h1>Task list</h1>
        <AddTask user={user} />
        <Query query={GET_ALL_TASK_BY_OWNER} variables={{owner: user.email}}>
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
                <>
                  <TaskList
                    user={user}
                    taskList={data.tasks}
                  />
                  <p>Count: {data.tasks.length}</p>
                </>
              )
            }
          }
        </Query>
      </div>
    )
  }
}

export default Tasks;

