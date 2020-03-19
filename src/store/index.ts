import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import tasks from './tasks/reducer';

const reducers = {
  tasks,
}

export const store = createStore(combineReducers(reducers), composeWithDevTools(applyMiddleware(thunk)));
