/*eslint-disable*/
import {
  Box, Grid,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { getCurrentUser, getJwtToken } from '../helpers/AuthManager';
import { myPrivateAxios } from '../config/axios';
import Layoutt from '../layouts/Layoutt';
import CircularProgress from '@mui/material/CircularProgress';
import ProfileCard from '../components/cards/ProfileCard';
import ProfilePageAccordion from '../components/ProfilePageAccordion';

function ProfilePage2() {
  if (!getJwtToken()) {
    navigate('/login');
  }
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [loading,setloading] = useState(true);
  
  async function getProfileData() {
    await myPrivateAxios({
      method: 'get',
      url: `/profile/${getCurrentUser().userId}`,
    }).then((res) => {
      console.log(res.data);
      setProfile(res.data);
      setloading(false);
    }).catch((err) => console.log(err));
  };
  
  console.log('in', profile);
  useEffect(() => {
    getProfileData();
    console.log('out', profile);
  }, []);


  return (
    <Layoutt contentData={(
      <>
      {loading && <CircularProgress/>}
      <ProfilePageAccordion profile={profile}/>
      </>
  )}
    />
  );
}

export default ProfilePage2;
