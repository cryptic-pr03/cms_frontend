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
import SlotsDataGrid from '../cards/SlotsDataGrid';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function EVENTCOMPLETE({updateStateOnAdd}) {
  const [open, setOpen] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [slotsList, setSlotsList] = useState({});
  const [selectionModel, setSelectionModel] = useState([]);

  function getSelectedSlots(selectionModel) {
    const temp = [];
    for (const s of selectionModel) {
      temp.push(slotsList[s]);
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

  async function getAllSlots() {
    await myPrivateAxios({
      method: 'get',
      url: "/slot/all"
    }).then((res) => {
      console.log(res.data);
      for (let i = 0; i < res.data.length; i += 1) {
        res.data[i] = { id: i, ...res.data[i] };
      }
      setSlotsList(res.data);
      setFetching(false);
    }).catch((err) => alert(err.response));
  }

  useEffect(() => {
    getAllSlots();
  }, [])


  async function handlePay() {

  }

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        ADD
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
              <Typography variant="h4"> SELECT SLOTS </Typography>
              {!fetching && <SlotsDataGrid slotsList={slotsList} selectionModel={selectionModel} setSelectionModel={setSelectionModel} />}

              <Box sx={{ textAlign: 'center', p: 3 }}>
                <Typography variant="h4"> ENTER EVENT DETAILS</Typography>
              </Box>
              <AddEventModal selectedSlots={getSelectedSlots(selectionModel)} updateState={updateStateOnAdd}/>

              <PaymentModal />
            </Elements>


          </Box>
        </Box>
      </Dialog>
    </>
  );
}
