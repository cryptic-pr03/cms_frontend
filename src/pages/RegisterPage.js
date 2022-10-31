import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import myAxios from '../config/axios';
import { getJwtToken } from '../helpers/AuthManager';

function RegisterPage() {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(getJwtToken());
    if (getJwtToken()) {
      navigate('/profile');
    }
  }, []);

  const handleSubmit = async (data) => {
    console.log(data);
    try {
      await myAxios({
        method: 'post',
        url: '/register',
        data: {
          ...data,
          typeUserCode: parseInt(data.typeUserCode, 10),
          id: 0,
          gender: 'Male',
        },
      }).then((res) => {
        console.log(res);
        alert(res.data);
        navigate('/login');
      });
    } catch (err) {
      alert(err.response.data);
    }
  };

  return (
    <RegisterForm onSubmit={handleSubmit} />
  );
}

export default RegisterPage;
