import { useParams, useNavigate } from 'react-router-dom';
import {
    CardActionArea, CardActions, CircularProgress, Grid,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import myAxios, { myPrivateAxios } from '../config/axios';
import EventDetailsCard from '../components/cards/EventDetailsCard';
import Layoutt from '../layouts/Layoutt';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function EventDetailsPage() {
    const params = useParams();
    const [eventxyz, setEventxyz] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const getEventById = async () => {
        try {
            console.log('try');
            await myAxios({ method: 'GET', url: `/event/id/${params.eventId}` }).then((res) => {
                setEventxyz(res.data);
                setLoading(false);
            });
            console.log('success');
        } catch (err) {
            console.log('error');
            console.log(err.response);
        }
    };

    useEffect(() => {
        getEventById();
    }, []);

    return (
        <>
            {loading && <CircularProgress />}
            {!loading
      && (
          <Layoutt
              contentData={
                  <EventDetailsCard event={eventxyz} />
              }
          />
      )}
        </>

    );
}

export default EventDetailsPage;
