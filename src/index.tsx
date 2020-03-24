import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/react-hooks'


import gqClient from './graphql';
import { App } from './containers/App';
import { store } from './store';
import './index.css';

ReactDOM.render(
  <ApolloProvider client={gqClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
