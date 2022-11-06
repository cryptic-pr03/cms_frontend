import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import { CardActionArea, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddVenueModal from '../modals/AddVenueModal';

export default function VenueCard({ venue, handleDelete }) {
  console.log(venue);
  const navigate = useNavigate();
  return (
    <Card sx={{ display: 'flex', mb: 2, height: 150 }}>
      <CardActionArea
        component="div"
        onClick={() => navigate(`/venue/${venue.venueId}`)}
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
          <CardContent sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Typography component="div" variant="h4" sx={{ textOverflow: 'ellipsis' }}>
              {venue.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ textOverflow: 'ellipsis' }}>
              <LocationOnOutlinedIcon />
              {venue.city}
            </Typography>
          </CardContent>
        </Box>
      </CardActionArea>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        p: 1,
      }}
      >
        <IconButton onClick={() => handleDelete(venue)}><DeleteIcon /></IconButton>
        < AddVenueModal mode={"EDIT"} venueProp={venue} />
      </Box>

    </Card>
  );
}
