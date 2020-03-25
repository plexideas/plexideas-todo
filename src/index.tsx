import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks'


import gqClient from './graphql';
import { App } from './containers/App';
import './index.css';

ReactDOM.render(
  <ApolloProvider client={gqClient}>
      <App />
  </ApolloProvider>,
  document.getElementById('root')
);
