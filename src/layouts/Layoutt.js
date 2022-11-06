import {
  Box, Grid, IconButton, ListItem, ListItemButton, ListItemText,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getJwtToken } from '../helpers/AuthManager';

function Layoutt({ contentData }) {
  const navigate = useNavigate();
  // console.log(contentData);
  const actionList = [
    [],
    [{ name: 'Events', target: '/events' }, { name: 'MyBookings', target: '/myBookings' }],
    [],
    [{ name: 'Schedule', target: '/schedule' }],
    [{ name: 'Staff', target: '/staffs' }, { name: 'Events', target: '/events' }, { name: 'Set Schedule', target: '/setSchedule' }, { name: 'Set Slots', target: '/setslots' }],
    [{ name: 'Venues', target: '/venues' }, { name: 'Events', target: '/events' }, { name: 'Venue Managers', target: '/staffs' }]];
  if (!getJwtToken()) {
    navigate('/login');
  }
  const role = getCurrentUser()?.typeUserCode;
  // console.log(role);
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
            // secondaryAction={(
            //   <IconButton edge="end" aria-label="comments">
            //     <AddIcon />
            //   </IconButton>
            // )}
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
          {contentData}
        </Box>
      </Grid>
    </Grid>
  );
}

export default Layoutt;
