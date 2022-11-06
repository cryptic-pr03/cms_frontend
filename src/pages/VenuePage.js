import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import VenueCard from '../components/cards/VenueCard';
import AddVenueModal from '../components/modals/AddVenueModal';
import { myPrivateAxios } from '../config/axios';
import { getCurrentUser, getJwtToken } from '../helpers/AuthManager';
import Layoutt from '../layouts/Layoutt';

function VenuePage() {
  const [venueList, setVenueList] = useState([]);
  console.log(getJwtToken());
  if (!getJwtToken()) {
    navigate('/login');
  }
  const user = getCurrentUser();

  const getVenueList = async () => {
    await myPrivateAxios({
      method: 'get',
      url: '/venue/all',
    }).then((res) => {
      console.log(res.data);
      setVenueList(res.data);
    }).catch((err) => console(err.response));
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
      setVenueList((venueList) => venueList.filter((venue) => venue !== deleteVenue));
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
            {venueList.length === 0 && <> NO VENUES TO DISPLAY</>}
            {venueList.length !== 0 && <> VENUES</>}
          </Typography>
          {user.typeUserCode === 5 && < AddVenueModal mode={"ADD"} venueProp={{ id: 0 }} />}
        </Box>

        {venueList.map((venue) => <VenueCard venue={venue} handleDelete={handleDelete} />)}

      </>
    }
    />
  );
}

export default VenuePage;
