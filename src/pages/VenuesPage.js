import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VenueCard from '../components/cards/VenueCard';
import AddVenueModal from '../components/modals/AddVenueModal';
import { myPrivateAxios } from '../config/axios';
import { getCurrentUser, getJwtToken } from '../helpers/AuthManager';
import Layoutt from '../layouts/Layoutt';

function VenuesPage() {
  const navigate = useNavigate();
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
      setVenueList(res.data);
    }).catch((err) => console(err.response));
  };

  useEffect(() => {
    getVenueList();
  }, []);



  function updateStateOnDelete(deletedVenue) {
    setVenueList((venueList) => venueList.filter((venue) => venue !== deletedVenue));
  }

  function updateStateOnAdd(addedVenue) {
    console.log("in", venueList.size());
    setVenueList((venueList) => {
      venueList.push(addedVenue);
      return venueList;
    });
    console.log("out", venueList.size());
  }

  function updateStateOnEdit(editedVenue) {
    setVenueList((venueList) => venueList.filter((venue) => venue.venueId !== editedVenue.venueId));
    setVenueList((venueList) => {
      venueList.push(editedVenue);
      return venueList;
    });
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
          {user.typeUserCode === 5 && < AddVenueModal mode={"ADD"} updateState={updateStateOnAdd} />}
        </Box>

        {venueList.map((venue) => <VenueCard venue={venue} key={venue.venueId} updateStateOnDelete={updateStateOnDelete} updateStateOnEdit={updateStateOnEdit} />)}

      </>
    }
    />
  );
}

export default VenuesPage;
