import { useEffect, useState } from 'react';
import EventCard from '../components/cards/EventCard';
import { myPrivateAxios } from '../config/axios';
import Layoutt from '../layouts/Layoutt';

function EventPage() {
  const [eventList, setEventList] = useState([]);

  const getEventList = async () => {
    try {
      await myPrivateAxios({
        method: 'get',
        url: '/event/all',
      }).then((res) => {
        console.log(res.data);
        setEventList(res.data);
      });
    } catch (err) {
      alert(err.response);
    }
  };
  useEffect(() => {
    getEventList();
  }, []);

  return (
    <Layoutt contentData={
      eventList.map((event) => <EventCard event={event} />)
    }
    />
  );
}

export default EventPage;
