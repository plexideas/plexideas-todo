import { v4 as uuidv4 } from 'uuid';
import { task } from "../../types/task";
import * as types from './actionTypes';

export function onCreateTask(content: string) {
  const newTask: task = {
    _id: uuidv4(),
    text: content,
    owner: 'anonym',
    status: "NEW",
    created: new Date().toString(),
    updated: new Date().toString(),
    isDone: false,
    isEdit: false,
  }
  return { type: types.ADD_TASK, payload: newTask }
}

export function deleteTask(id: any) {
  return {type: types.DELETE_TASK, payload: id }
}

export function changeStatus(id: any, status: string) {
  return {
    type: types.CHANGE_STATUS,
    payload: { id, status }
  }
}

export function editTask(id: any) {
  return { type: types.EDIT_TASK, payload: id }
}

export function saveEditTask(id: any, text: string) {
  return { type: types.SAVE_EDIT_TASK, payload: { id, text } }
}
