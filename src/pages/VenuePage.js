import { useEffect, useState } from 'react';
import VenueCard from '../components/cards/VenueCard';
import { myPrivateAxios } from '../config/axios';
import Layoutt from '../layouts/Layoutt';

function VenuePage() {
  const [venueList, setVenueList] = useState([]);

  const getVenueList = async () => {
    await myPrivateAxios({
      method: 'get',
      url: '/venue/all',
    }).then((res) => {
      console.log(res.data);
      setVenueList(res.data);
    }).catch((err) => alert(err.response));
  };

  useEffect(() => {
    getVenueList();
  }, []);

  async function handleDelete(deleteVenue) {
    await myPrivateAxios({
      method: 'delete',
      url: `/venue/${deleteVenue.venueId}`,
    }).then((res) => {
      console.log(res.data);
      // eslint-disable-next-line no-shadow
      setVenueList((venueList) => venueList.filter((venue) => venue !== deleteVenue));
    }).catch((err) => console.log(err));
  }

  return (
    <Layoutt contentData={
      // eslint-disable-next-line react/jsx-no-bind
      venueList.map((venue) => <VenueCard venue={venue} handleDelete={handleDelete} />)
    }
    />
  );
}

export default VenuePage;
