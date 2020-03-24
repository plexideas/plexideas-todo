import gpl from 'graphql-tag';

export const GET_ALL_TASK_BY_OWNER = gpl`
  query tasks($owner: String) {
    tasks(owner: $owner) {
      _id,
      text,
      owner,
      status,
      created,
      updated
    }
  }
`;

export const SUBSCRIBE_TASK_CREATED = gpl`
  subscription {
    taskCreated {
      _id
      text
      owner
      status
      created
      updated
    }
  }
`;

export const SUBSCRIBE_TASK_DELETED = gpl`
  subscription {
    taskDeleted
  }
`;

export const SUBSCRIBE_TASK_EDITED = gpl`
  subscription {
    taskEdited {
      _id
      text
      owner
      status
      created
      updated
    }
  }
`;

export const CREATE_TASK = gpl`
  mutation createTask($text: String, $owner: String!) {
    createTask(text: $text, owner: $owner) {
      _id,
      text,
      owner,
      status,
      created,
      updated
    }
  }
`;

export const DELETE_TASK = gpl`
  mutation deleteTask($_id: String!) {
    deleteTask(_id: $_id)
  }
`;

export const EDIT_TASK = gpl`
  mutation editTask($_id: String!, $text: String) {
    editTask(_id: $_id, text: $text) {
      _id,
      text,
      owner,
      status,
      created,
      updated
    }
  }
`;

export const CHANGE_STATUS = gpl`
  mutation changeTaskStatus($_id: String!, $status: String) {
    changeTaskStatus(_id: $_id, status: $status) {
      _id,
      text,
      owner,
      status,
      created,
      updated
    }
  }
`;
