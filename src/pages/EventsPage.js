import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from '../components/cards/EventCard';
import AddEventModal from '../components/modals/AddEventModal';
import EVENTCOMPLETE from '../components/modals/EVENTCOMPLETE';
import { myPrivateAxios } from '../config/axios';
import { getCurrentUser, getJwtToken } from '../helpers/AuthManager';
import Layoutt from '../layouts/Layoutt';

function EventsPage() {
  const navigate = useNavigate();
  const [eventList, setEventList] = useState([]);
  // console.log(getJwtToken());
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
    }).catch((err) => console.log(err.response));
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


  function updateStateOnDelete(deletedEvent) {
    setEventList((eventList) => eventList.filter((event) => event !== deletedEvent));
  }

  function updateStateOnAdd(addedEvent) {
    console.log("in", eventList.size());
    setEventList((eventList) => {
      eventList.push(addedEvent);
      return eventList;
    });
    console.log("out", eventList.size());
  }

  function updateStateOnEdit(editedEvent) {
    setEventList((eventList) => eventList.filter((event) => event.eventId !== editedEvent.eventId));
    setEventList((eventList) => {
      eventList.push(editedEvent);
      return eventList;
    });
  }

  return (
    <Layoutt contentData={
      <>
        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          marginBottom: '10px'
        }}>
          <Typography variant="h4" sx={{ m: 3 }} >
            {eventList.length === 0 && <> NO EVENTS TO DISPLAY </>}
            {eventList.length !== 0 && <> EVENTS </>}
          </Typography>
          {user.typeUserCode === 2 && <EVENTCOMPLETE updateState={updateStateOnAdd} />}
        </Box>
        {eventList.map((event) =>
          <EventCard event={event}
            key={event.eventId}
            updateStateOnDelete={updateStateOnDelete}
            updateStateOnEdit={updateStateOnEdit} />)
        }

      </>
    }
    />
  );
}

export default EventsPage;
