import {
  Box, Grid, ListItem, ListItemButton, ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getJwtToken } from '../helpers/AuthManager';

function Layoutt({ contentData }) {
  const navigate = useNavigate();
  // console.log(contentData);
  if (!getJwtToken()) {
    navigate('/login');
  }

  const role = getCurrentUser()?.typeUserCode;
  // console.log(role);

  const actionList = [
    [],
    [{ name: 'Events', target: '/events' }, { name: 'MyBookings', target: '/myBookings' }],
    [{ name: 'Slots', target: '/slots' }, { name: 'My Events', target: '/events' }],
    [{ name: 'Schedule', target: '/schedule' }],
    [{ name: 'Staff', target: `/staffs` }, { name: 'Events', target: '/events' }, { name: 'Set Schedule', target: '/setSchedule' }, { name: 'Set Slots', target: '/setslots' }],
    [{ name: 'Venues', target: '/venues' }, { name: 'Events', target: '/events' }, { name: 'Venue Managers', target: '/staffs' }]];
  return (
    <Grid
      container
      sx={{
        border: '2px solid red', height: '100vh',
      }}
      flexdirection="row"
    >
      <Grid item md={3}>
        <ListItem
          divider
          onClick={() => navigate('/profile')}
        >

          <ListItemButton>
            <ListItemText primary="Profile" />
          </ListItemButton>

        </ListItem>
        {actionList[role].map((item) => (
          <ListItem
            key={actionList[role].indexOf(item)}
            divider
            onClick={() => navigate(item.target)}
          >
            <ListItemButton>

              <ListItemText sx={{ textOverflow: 'ellipsis' }} primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}

      </Grid>
      <Grid
        item
        md={9}
        sx={{
          bgcolor: '#e7e7e7', height: '100vh', overflow: 'auto',
        }}
      >
        <Box sx={{ p: 3 }}>
          {!contentData && <>CHOOSE AN ACTION...</>}
          {contentData}
        </Box>
      </Grid>
    </Grid>
  );
}

export default Layoutt;
