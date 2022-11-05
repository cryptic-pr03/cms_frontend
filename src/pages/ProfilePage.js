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

function Cardd({ label, value }) {
  return (
    <Grid item xs={4}>
      <Card sx={{ p: 0.1 }}>
        <CardContent sx={{ p: 1, width: 500 }}>
          <Typography sx={{ fontSize: 10 }} color="text.primary" gutterBottom>
            {label}
            {' '}
            :
          </Typography>
          <Typography variant="body2">
            {value}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

function ProfilePage() {
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
      <div>
        <Box sx={{ m: 5 }}>

          <Typography
            variant="h4"
            sx={{ m: 3 }}
          >
            {' '}
            Welcome
            {' '}
            {`${profile?.firstName} ${profile?.lastName} !` }

          </Typography>

          <Grid
            container
            spacing={2}
            sx={{
            }}
          >
            {cardList}
          </Grid>

          <Typography
            variant="h5"
            sx={{ m: 3 }}
          >
            {' '}
            Logged in as role
            {' '}
            {`${getCurrentUser()?.typeUserCode}` }

          </Typography>

        </Box>
      </div>
      </>
  )}
    />
  );
}

export default ProfilePage;
