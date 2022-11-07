import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import { CardActionArea, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function EventCard({ event }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ display: 'flex', mb: 2, height: 150 }}>
      <CardActionArea component="div"
        onClick={navigate(`/events/${event.eventId}`)}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <CardMedia
            component="img"
            sx={{
              width: 300, fill: 'cover', height: '150px', objectFit: 'contain',
            }}
            image={`${process.env.PUBLIC_URL}/static/pic.png`}
            alt="Live from space album cover"
          />
          <CardContent sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>

              <Typography gutterBottom variant="h5" component="div">
                {event.eventName}
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
                {event.eventDate}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {event.description}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>

              <Typography gutterBottom variant='h5' component="div" >
                {`Created by ${event.firstName} ${event.lastName}`}
              </Typography>
              <Typography variant='body' color='text.secondary'>
                {event.email}
              </Typography>
              <Typography variant='body' color='text.secondary'>
                {event.contactNo}
              </Typography>
            </Box>

          </CardContent>
        </Box>

      </CardActionArea>

      {/* <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                p: 1,
            }}
            >
                <IconButton><DeleteIcon /></IconButton>
                <IconButton><EditIcon /></IconButton>
            </Box> */}

    </Card>
  );
}
