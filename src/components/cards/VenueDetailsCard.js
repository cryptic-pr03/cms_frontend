import { useParams, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, CardActions } from '@mui/material';
import Stack from '@mui/material/Stack';

export default function VenueDetailsCard({ venue }) {
  const navigate = useNavigate();
  console.log(venue);

  return (
    <div>
      <Box sx={{ width: '80%', margin: 'auto', mt: 5 }}>
        <Stack spacing={2}>
          <Typography color="primary" variant="h6">
            {venue.name}
          </Typography>

        </Stack>
      </Box>
      <Card
        sx={{
          maxWidth: '80%',
          margin: 'auto',
          mt: 5,
          borderRadius: 2,
          boxShadow: 1,
          height: '50%',
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="1%"
            image={`${process.env.PUBLIC_URL}/static/pic.png`}
            alt="../../public/static/trial.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Capacity :
              {venue.capacity}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Location :
              {venue.state}
              ,
              {venue.city}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              LandMark :
              {venue.landmark}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Is functional :
              {venue.functional}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Seat Matrix Description :
              {venue.seatMatrixDescription}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions />
      </Card>

    </div>

  );
}