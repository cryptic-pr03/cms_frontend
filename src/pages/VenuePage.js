import { useEffect, useState } from 'react';
import VenueCard from '../components/cards/VenueCard';
import { myPrivateAxios } from '../config/axios';
import Layoutt from '../layouts/Layoutt';

function VenuePage() {
  const [venueList, setVenueList] = useState([]);

  const getVenueList = async () => {
    try {
      await myPrivateAxios({
        method: 'get',
        url: '/venue/all',
      }).then((res) => {
        console.log(res.data);
        setVenueList(res.data);
      });
    } catch (err) {
      alert(err.response);
    }
  };
  useEffect(() => {
    getVenueList();
  }, []);

  return (
    <Layoutt contentData={
      venueList.map((venue) => <VenueCard venue={venue} />)
    }
    />
  );
}

export default VenuePage;
