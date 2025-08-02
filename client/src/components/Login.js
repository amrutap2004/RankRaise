import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InteractiveLogin from './InteractiveLogin';
import axios from 'axios';

const Login = ({ onLogin }) => {
  return <InteractiveLogin onLogin={onLogin} />;
};

export default Login; 