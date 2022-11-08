import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import { CardActionArea, IconButton } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import myAxios, { myPrivateAxios } from '../config/axios';
import { useEffect, useState } from 'react';
import Layoutt from '../layouts/Layoutt';
import EventDetailsCard from '../components/cards/EventDetailsCard';

export default function EventDetailsPage() {
  const navigate = useNavigate();
  const params = useParams();
  console.log(params.eventId);
  const [eventDetails, setEventDetails] = useState({});
  const [loading, setLoading] = useState(true);


  // const getReviewData = async () => {
  //   try {
  //     console.log(event.eventId);
  //     await myAxios({  
  //       method: 'GET',
  //       url: `/review/event/${event.eventId}`,
  //     }).then((res) => {
  //       console.log(res.data);
  //       return res.data;
  //     });
  //     console.log('success');
  //   } catch (err) {
  //     console.log('error');
  //     console.log(err.response);
  //   }
  // };

  const getEventDetails = async () => {
    try {
      await myAxios({
        method: 'GET',
        url: `/event/eventDetails/${params.eventId}`
      }).then((res) => {
        console.log(res.data);
        setEventDetails(res.data);
        setLoading(false);
      });
    } catch (err) {
      console.log(err.response);
    }
  };
  useEffect(() => {
    getEventDetails();
  }, []);

  return (
    <>
      <Layoutt contentData={
        <>
          {!loading &&
            <EventDetailsCard event={eventDetails} />
          }
        </>
      }
      />
    </>
  );
}
