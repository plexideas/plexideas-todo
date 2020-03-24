import React from 'react';
import { Tasks } from '../Tasks';
import { Auth } from '../../components/Auth';
import './App.css';

class App extends React.Component {

  state: any = {
    user: {},
    error: null,
    authenticated: false
  }

  componentDidMount() {
    fetch('/api/auth/login/success', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
      }
    })
    .then(response => {
      if (response.status === 200) return response.json();
      throw new Error("failed to authenticate user");
    })
    .then(responseJson => {
      this.setState({
        authenticated: true,
        user: responseJson.user
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    const { authenticated, user } = this.state;

    return (
      <div className="app">
        <Auth authenticated={authenticated} handleNotAuthenticated={this._handleNotAuthenticated} photo={user.picture} />
        { authenticated && <Tasks /> }
      </div>
    );
  }

  _handleNotAuthenticated = () => {
    this.setState({
      authenticated: false,
    });
  };
}

export default App;
