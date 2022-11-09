import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import { CardActionArea, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { myPrivateAxios } from '../../config/axios';

export default function EventCard({ event, updateStateOnDelete }) {
  const navigate = useNavigate();
  console.log(event);

  async function handleDelete(deleteEvent) {
    await myPrivateAxios({
      method: 'delete',
      url: `/event/${deleteEvent.eventId}`,
    }).then((res) => {
      console.log(res.data);
      updateStateOnDelete(deleteEvent);
    }).catch((err) => console.log(err));
  }

  // {
  //   "eventId": 34,
  //     "eventName": "event venue 61",
  //       "startTime": "16:04:06",
  //         "endTime": "18:04:06",
  //           "ageLimit": 18,
  //             "description": "this is venue 61.",
  //               "eventDate": "2022-11-10",
  //                 "logoUrl": "logo not entering",
  //                   "venueId": 6,
  //                     "venueName": "venue 6",
  //                       "capacity": 170,
  //                         "city": "city 6",
  //                           "landmark": "landmark 6",
  //                             "state": "state 6",
  //                               "isFunctional": false,
  //                                 "picSeatMatrixUrl": null,
  //                                   "userId": 17,
  //                                     "firstName": "am6",
  //                                       "lastName": "am6",
  //                                         "email": "am6@cms.com",
  //                                           "contactNo": "07645880707",
  //                                             "sponsors": []
  // }


  return (
    <Card sx={{ display: 'flex', mb: 2, height: 180 , p:1}}>
      <CardActionArea
        component="div"
        onClick={() => navigate(`/events/${event.eventId}`)}
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
            <Typography gutterBottom variant="h6" component="div">
              {event.eventName}
              <Typography variant="subtitle1" color="text.secondary" gutterBottom component="div" sx={{ textOverflow: 'ellipsis' }}>
                <LocationOnOutlinedIcon color="text.secondary" />{"  "}
                {event.city}
              </Typography>
            </Typography>
            <Typography variant="subtitle2" gutterBottom color="text.secondary">
              <AccessTimeIcon /> {"  "} {event?.startTime} - {event?.endTime} on {event?.eventDate}
            </Typography>
            <Typography variant="body3"  color="text.secondary">
              {event.description}
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
        {/* <IconButton onClick={() => handleDelete(event)}><DeleteIcon /></IconButton> */}
      </Box>

    </Card>
  );
}
