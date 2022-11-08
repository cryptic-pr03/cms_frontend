import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentModal from './PayementModal';
import SlotsPage from '../../pages/SlotsPage';
import AddEventModal from './AddEventModal';
import StaffDataGrid from '../cards/StaffDataGrid';
import { Box, Typography } from '@mui/material';
import { myPrivateAxios } from '../../config/axios';
import { useEffect } from 'react';
import { useState } from 'react';
import SeatsDataGrid from '../cards/SeatsDataGrid';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function BookSeatModal({ event }) {
  console.log(event);
  const [open, setOpen] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [seatsList, setSeatsList] = useState({});
  const [selectionModel, setSelectionModel] = useState([]);
  // const [selectedSeats, setSelectedList] = useState([]);

  function getSelectedSeats(selectionModel) {
    const temp = [];
    for (const s of selectionModel) {
      temp.push(seatsList[s]);
    }
    return temp;
  }


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const stripePromise = loadStripe('pk_test_51M0jJ3SFhwldaWPEsA5N6LZcIKpNEVa4JK0A6hgq80IFMwWTP7PuGSDGepeSRylCRGDcGhXD4RUvEZNjCQLl9dzB00hhcQOeT6');

  async function getAllSeatsOfEvent() {
    await myPrivateAxios({
      method: 'get',
      url: `/eventSeat/${event.eventId}`
    }).then((res) => {
      for (let i = 0; i < res.data.length; i += 1) {
        res.data[i] = { id: i, ...res.data[i] };
      }
      setSeatsList(res.data);
      setFetching(false);
    }).catch((err) => console.log(err.response));
  }

  useEffect(() => {
    getAllSeatsOfEvent();
  }, [])


  async function handlePay() {
    const selectedSeats = getSelectedSeats(selectionModel);
    console.log(selectedSeats);


  }

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        BOOK SEATS
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Box
          sx={{
            mx: 20,
            my: 5
          }}>
          <Box sx={{ textAlign: 'center', p: 3 }}>

            <Elements stripe={stripePromise}>
              <Typography variant="h4"> SELECT SEATS </Typography>
              {!fetching && <SeatsDataGrid seatsList={seatsList} selectionModel={selectionModel} setSelectionModel={setSelectionModel} />}
              <Button variant="contained" type="submit" disabled={!getSelectedSeats(selectionModel).length} onClick={handlePay}> PAY NOW </Button>
              <PaymentModal />
            </Elements>


          </Box>
        </Box>
      </Dialog >
    </>
  );
}
