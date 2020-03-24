import { PubSub } from 'apollo-server-express';
import Task from '../../models/task-model';

const pubSub = new PubSub();
const TASK_CREATED = "TASK_CREATED";
const TASK_DELETED = "TASK_DELETED";
const TASK_EDITED = "TASK_EDITED";

export default {
  Subscription: {
    taskCreated: {
      resolve: (data: any) => {
        console.log("Subscription taskCreated: ", data)
        return data
      },
      subscribe: () => pubSub.asyncIterator([TASK_CREATED])
    },
    taskDeleted: {
      resolve: (data: any) => {
        console.log("Subscription taskDeleted: ", data)
        return data
      },
      subscribe: () => pubSub.asyncIterator([TASK_DELETED])
    },
    taskEdited: {
      resolve: (data: any) => {
        console.log("Subscription taskEdited: ", data)
        return data
      },
      subscribe: () => pubSub.asyncIterator([TASK_EDITED])
    }
  },
  Query: {
    async task(root: any, {_id}: any) {
      return await Task.findById(_id);
    },
    async tasks(root: any, {owner}: any) {
      return await Task.find(owner && {owner: owner});
    }
  },
  Mutation: {
    async createTask(root: any, { text, owner }: any) {
      const created = new Date().toString();
      const updated = created;
      const status = 'NEW';
      const isDone = false;
      const newTask = {
        text, owner, status, created, updated, isDone
      }
      const task = await Task.create(newTask);

      pubSub.publish(TASK_CREATED, task);

      return task;
    },
    async editTask(root: any, {_id, text}: any) {
      const task = await Task.findById(_id);
      task?.set('text', text).set('updated', new Date().toString()).save();
      pubSub.publish(TASK_EDITED, task);
      return task;
    },
    async changeTaskStatus(root: any, {_id, status}: any) {
      const task = await Task.findById(_id);
      task?.set('status', status).set('updated', new Date().toString()).save();
      pubSub.publish(TASK_EDITED, task);
      return task
    },
    async makeTaskDone(root: any, {_id}: any) {
      const task = await Task.findById(_id);
      task?.set('isDone', true).set('updated', new Date().toString()).save();
      pubSub.publish(TASK_EDITED, task);
      return task
    },
    async deleteTask(root: any, {_id}: any) {
      Task.deleteOne({_id: _id}).exec();
      pubSub.publish(TASK_DELETED, _id);
      return _id;
    }
  },
}
