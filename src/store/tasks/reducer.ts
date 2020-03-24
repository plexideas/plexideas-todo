import { AnyAction } from "redux";
import { taskState } from '../../types/store';
import * as types from './actionTypes';

const initialState: taskState = {
  taskList: [],
}

export default (state = initialState, action: AnyAction) => {
  switch(action.type) {
    case types.ADD_TASK: {
      const taskList = [...state.taskList];
      taskList.push(action.payload);
      return {
        taskList: taskList
      };
    }
    case types.DELETE_TASK: {
      const taskList = state.taskList.filter(task => task._id !== action.payload);
      return {
        taskList: taskList
      };
    }
    case types.CHANGE_STATUS: {
      const taskList = [...state.taskList];
      taskList.forEach(task => {
        if (task._id === action.payload._id) task.status = action.payload.status;
      })
      return {
        taskList: taskList
      };
    }
    case types.EDIT_TASK: {
      const taskList = [...state.taskList];
      taskList.forEach(task => {
        if (task._id === action.payload) task.isEdit = !task.isEdit;
      })
      return {
        taskList: taskList
      };
    }

    case types.SAVE_EDIT_TASK: {
      const taskList = [...state.taskList];
      taskList.forEach(task => {
        if (task._id === action.payload._id) {
          task.text = action.payload.task;
          task.isEdit = false;
        };
      })
      return {
        taskList: taskList
      };
    }

    default: return state;
  }
}
