/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { Props } from './props';
import "./Auth.css"
import { Button } from '../Button';

const Auth = (props: Props) => {
  const { authenticated, handleNotAuthenticated, photo }  = props;

  const handleLogout = () => {
    handleNotAuthenticated();
  }

  const renderLogout = () => (
    <div className="auth-logout">
      <div className="auth-userinfo">
        <img src={photo} alt="User photo" width="30px" />
      </div>
      <div className="auth-button">
        <a href="/api/auth/logout" onClick={handleLogout}><Button>Exit</Button></a>
      </div>
    </div>
  )

  const renderLogin = () => (
    <a href="/api/auth/google"><Button>Login</Button></a>
  )

  return (
    <div className="auth">
      {
      authenticated
        ? renderLogout()
        : renderLogin()
      }
    </div>
  ); 
}

export default Auth;
