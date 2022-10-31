import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { myPrivateAxios } from '../config/axios';
import { getCurrentUser, getJwtToken } from '../helpers/AuthManager';

function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  useEffect(() => {
    console.log(getJwtToken());
    if (!getJwtToken()) {
      navigate('/login');
      return;
    }
    const getData = async () => {
      await myPrivateAxios({
        method: 'get',
        url: `/profile/${getCurrentUser().userId}`,
      }).then((res) => {
        console.log(res.data);
        setProfile(res.data);
      });
    };
    getData();
  }, []);

  return (
    <div>
      {getJwtToken() && `Welcome ${profile?.firstName}`}
    </div>
  );
}

export default ProfilePage;
