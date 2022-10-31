import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import myAxios, { myPrivateAxios } from '../config/axios';
import { getCurrentUser, getJwtToken, setJwtToken } from '../helpers/AuthManager';

function LoginPage() {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(getJwtToken());
    if (getJwtToken()) {
      navigate('/profile');
    }
  }, []);

  const addRole = async (user, code) => {
    console.log('inallrole');
    await myPrivateAxios({
      method: 'post',
      url: '/newTypeUser',
      data: {
        userId: user.userId,
        role: code,
      },
    }).then((ress) => {
      alert(ress.data);
      navigate('/profile');
    });
  };

  const handleSubmit = async (data) => {
    // console.log(data);
    try {
      await myAxios({
        method: 'post',
        url: '/login',
        data: {
          ...data,
          typeUserCode: parseInt(data.typeUserCode, 10),
        },
      }).then(async (res) => {
        setJwtToken(res.data.token);
        const user = getCurrentUser();
        if (!res.data.isPresent) {
          // eslint-disable-next-line no-restricted-globals
          if (confirm('Account not created for role! \n Create??')) {
            await addRole(user, parseInt(data.typeUserCode, 10));
          } else {
            console.log('logout');
            navigate('/logout');
          }
        } else {
          console.log(res.data);
          navigate('/profile');
        }
      });
    } catch (err) {
      alert(err.response);
    }
  };

  return (
    <LoginForm onSubmit={handleSubmit} />
  );
}

export default LoginPage;
