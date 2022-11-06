import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { myPrivateAxios } from '../config/axios';
import { deleteJwtToken } from '../helpers/AuthManager';

function LogoutPage() {
    const navigate = useNavigate();
    console.log('logoutPage');
    useEffect(() => {
        try {
            myPrivateAxios({ method: 'post', url: '/log_out' }).then((res) => {
                console.log(res.data);
            });
        } catch (err) {
            console.log(err);
        } finally {
            deleteJwtToken();
            navigate('/login');
        }
    }, []);
}

export default LogoutPage;
