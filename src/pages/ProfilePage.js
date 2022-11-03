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
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});

  useEffect( () => {
    console.log(getJwtToken());
    if (!getJwtToken()) {
      navigate('/login');
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

  console.log(profile);
  const cardList = [];
  for (const property in profile) {
    cardList.push(<Cardd key={property} label={property} value={profile[property]} />);
  }

  return (
    <Layoutt contentData={
    <div>
      <Box sx={{ m: 5 }}>

        <Typography
          variant="h4"
          sx={{ m: 3 }}
        >
          {' '}
          Welcome
          {' '}
          {`${profile.firstName} ${profile.lastName} !` }

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
          {`${getCurrentUser().typeUserCode}` }

        </Typography>

      </Box>
    </div>
    }/>
  );
}

export default ProfilePage;
