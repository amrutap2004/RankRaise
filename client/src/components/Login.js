import React from 'react';
import InteractiveLogin from './InteractiveLogin';

const Login = ({ onLogin }) => {
  return <InteractiveLogin onLogin={onLogin} />;
};

export default Login;