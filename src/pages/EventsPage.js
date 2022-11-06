import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import EventCard from '../components/cards/EventCard';
import AddEventModal from '../components/modals/AddEventModal';
import { myPrivateAxios } from '../config/axios';
import { getCurrentUser, getJwtToken } from '../helpers/AuthManager';
import Layoutt from '../layouts/Layoutt';

function EventPage() {
  const [eventList, setEventList] = useState([]);
  console.log(getJwtToken());
  if (!getJwtToken()) {
    navigate('/login');
  }
  const user = getCurrentUser();
  
  const getEventList = async () => {
    await myPrivateAxios({
      method: 'get',
      url: '/event/all',
    }).then((res) => {
      console.log(res.data);
      setEventList(res.data);
    }).catch((err) => console(err.response));
  };

  useEffect(() => {
    getEventList();
  }, []);



  async function handleDelete(deleteEvent) {
    await myPrivateAxios({
      method: 'delete',
      url: `/event/${deleteEvent.eventId}`,
    }).then((res) => {
      console.log(res.data);
      setEventList((eventList) => eventList.filter((event) => event !== deleteEvent));
    }).catch((err) => console.log(err));
  }
  
  return (
    <Layoutt contentData={
      <>
        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center"
        }}>
          <Typography variant="h4" sx={{ m: 3 }} >
            {eventList.length === 0 && <> NO EVENTS TO DISPLAY</>}
            {eventList.length !== 0 && <> EVENTS</>}
          </Typography>
          {user.typeUserCode === 2 && < AddEventModal buttonText={"ADD"} />}
        </Box>

        {eventList.map((event) => <EventCard event={event} handleDelete={handleDelete} />)}

      </>
    }
    />
  );
}

export default EventPage;
