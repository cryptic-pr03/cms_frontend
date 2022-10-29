import { useState } from 'react';
import LoginForm from '../components/LoginForm';

function LoginPage() {
  const handleSubmit = (data) => {
    console.log(data);
  };

  return (
    <LoginForm onSubmit={handleSubmit} />
  );
}

export default LoginPage;
