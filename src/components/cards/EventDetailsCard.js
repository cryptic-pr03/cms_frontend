import { useParams, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import myAxios, { myPrivateAxios } from '../../config/axios';

export default function EventDetailsCard({ event }) {
  const navigate = useNavigate();
  const getSeats = () => {
    navigate(`/buytickets/${event.eventId}`);
  };
  const [review, setReview] = useState([]);

  const getReviewData = async () => {
    try {
      console.log(event.eventId);
      await myAxios({
        method: 'GET',
        url: `/review/event/${event.eventId}`,
      }).then((res) => {
        console.log(res.data);
        setReview(res.data);
      });
      console.log('success');
    } catch (err) {
      console.log('error');
      console.log(err.response);
    }
  };

  useEffect(() => {
    getReviewData();
  }, []);

  return (
    <div>
      <Box sx={{ width: '80%', margin: 'auto', mt: 5 }}>
        <Stack spacing={2}>
          <Typography color="primary" variant="h6">
            {event.eventName}
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
            image={`${process.env.PUBLIC_URL}/static/eventImg.jpg`}
            alt="../../public/static/trial.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Date :
              {event.eventDate}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Timings :
              {event.eventStartTime}
              -
              {event.eventEndTime}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Age Limit :
              {event.eventAge}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Description of the event :
              {event.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>

          <Button
            sx={{ '&:hover': { backgroundColor: 'lightblue' } }}
            onClick={() => { getSeats(); }}
            size="small"
            color="primary"
          >
            Continue for booking
          </Button>
        </CardActions>
      </Card>
      <Box sx={{ width: '80%', margin: 'auto', mt: 5 }}>
        <Stack spacing={2}>
          <Typography color="primary" variant="h">
            List of Reviews!
          </Typography>

        </Stack>
      </Box>
      {review.map((reviews) => (

        <Card
          sx={{
            maxWidth: '80%', margin: 'auto', mt: 5, borderRadius: 2, boxShadow: 1,
          }}
          key={reviews.reviewId}
        >
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Review ID :
                {reviews.reviewId}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                Reviews given :
                {reviews.reviewData}
              </Typography>

            </CardContent>
          </CardActionArea>
          <CardActions />
        </Card>
      ))}

    </div>

  );
}