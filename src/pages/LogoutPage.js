import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { myPrivateAxios } from '../config/axios';
import { deleteJwtToken } from '../helpers/AuthManager';

function LogoutPage() {
  const navigate = useNavigate();
  useEffect(() => {
    try {
      myPrivateAxios({ method: 'post', url: '/log_out' }).then((res) => {
        console.log(res.data);
        deleteJwtToken();
        navigate('/login');
      });
    } catch (err) {
      console.log(err.response);
    }
  }, []);
}

export default LogoutPage;
