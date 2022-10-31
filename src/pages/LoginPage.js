import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import myAxios from '../config/axios';
import { getJwtToken, setJwtToken } from '../helpers/AuthManager';

function LoginPage() {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(getJwtToken());
    if (getJwtToken()) {
      navigate('/profile');
    }
  }, []);

  const handleSubmit = async (data) => {
    // console.log(data);
    try {
      await myAxios({ method: 'post', url: '/login', data }).then((res) => {
        console.log(res.data);
        setJwtToken(res.data.token);
        navigate('/profile');
      });
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <LoginForm onSubmit={handleSubmit} />
  );
}

export default LoginPage;
