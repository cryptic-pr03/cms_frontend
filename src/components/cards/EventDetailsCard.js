import { useParams, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import myAxios, { myPrivateAxios } from '../../config/axios';
import BookSeatModal from '../modals/BookSeatModal';
import { getCurrentUser } from '../../helpers/AuthManager';
import { useForm } from 'react-hook-form';

export default function EventDetailsCard({ event, loading }) {
  const navigate = useNavigate();

  const [gNo, setGNo] = useState();
  const [staff, setStaff] = useState([]);
  const [loadingg, setLoading] = useState(true);
  const currentUser = getCurrentUser();


  // const [review, setReview] = useState([]);

  // const getReviewData = async () => {
  //   try {
  //     console.log(event.eventId);
  //     await myAxios({
  //       method: 'GET',
  //       url: `/review/event/${event.eventId}`,
  //     }).then((res) => {
  //       console.log(res.data);
  //       setReview(res.data);
  //     });
  //     console.log('success');
  //   } catch (err) {
  //     console.log('error');
  //     console.log(err.response);
  //   }
  // };
  const getStaff = async () => {
    await myPrivateAxios({
      method: 'GET',
      url: `/worksFor/getAllWorkersByEvent/${event.eventId}`
    }).then(async (res) => {
      console.log(res.data);
      setStaff(res.data);
      if (staff.length) {
        await myPrivateAxios.get(`/staff/id/${staff[0]}`).then((ress) => {
          console.log(ress.data);
          setGNo(ress.data.groupNumber);
          setLoading(false);
        }).catch((err) => console.log(err.response));
      }
    }).catch((err) => console.log(err.response));
  }




  useEffect(() => {
    if (currentUser.typeUserCode === 4) {
      console.log("getting grp no");
      getStaff();
      console.log("got grp no");
    }
  }, []);


  console.log(gNo);

  const onSubmit = async (data) => {
    data = {
      ...data,
      eventId: event.eventId,
      venueId: getCurrentUser().user.venueId
    }
    console.log(data);
    await myPrivateAxios({
      method: 'POST',
      url: '/worksFor/addAllStaffGno/',
      data
    }).then((res) => {
      console.log(res);
      setGNo(data.groupNumber);
    }).catch((err) => console.log(err.response));
  }





  const {
    register, watch, handleSubmit, formState: { errors }, control,
  } = useForm();

  // console.log(watch());
  return (
    <div>
      <Box sx={{ width: '80%', margin: 'auto', mt: 5 }}>
        <Stack spacing={2}>
          <Typography color="primary" variant="h6">
            {event.name}
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
              Date :
              {event.eventDate}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Timings :
              {event.startTime}
              -
              {event.endTime}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Age Limit :
              {event.ageLimit}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Description of the event :
              {event.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {currentUser.typeUserCode === 4 &&
            <Box
              component="form" onSubmit={handleSubmit(onSubmit)} noValidate
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                margin: 'auto',
              }}>
              <TextField
                select
                required
                sx={{
                  width: 400,
                  mr: 5
                }}
                label="Working Staff Group"
                defaultValue={gNo ? gNo : 1}
                disabled={!staff.length ? true : false}
                inputProps={register('groupNumber', {
                  required: 'Please assign staffs to this event.',
                })}
                error={errors.groupNumber}
                helperText={errors.groupNumber?.message}
              >
                <MenuItem value={1} {...register('groupNumber')}>Group 1 </MenuItem>
                <MenuItem value={2} {...register('groupNumber')}>Group 2</MenuItem>
              </TextField>
              {!staff.length &&
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    width: 200
                  }}
                >
                  ASSIGN
                </Button>
              }
            </Box>
          }

          {!loading && currentUser.typeUserCode == 1 && <BookSeatModal event={event} />}
        </CardActions>

      </Card>
      <Box sx={{ width: '80%', margin: 'auto', mt: 5 }}>
        <Stack spacing={2}>
          <Typography color="primary" variant="h">
            List of Reviews!
          </Typography>

        </Stack>
      </Box>
      {/* {review.map((reviews) => (
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
      ))} */}

    </div >

  );
}

