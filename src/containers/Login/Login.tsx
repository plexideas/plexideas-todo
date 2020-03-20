import React from 'react';
import './Login.css';

class Login extends React.Component {
  render() {
    return (
      <div className="login">
        <a href="/api/auth/google">Google Login</a>
      </div>
    )
  }
}

export default Login;
