import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentModal from './PayementModal';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function SlotPayDialog({selectedSlots}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const stripePromise = loadStripe('pk_test_51M0jJ3SFhwldaWPEsA5N6LZcIKpNEVa4JK0A6hgq80IFMwWTP7PuGSDGepeSRylCRGDcGhXD4RUvEZNjCQLl9dzB00hhcQOeT6');

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen} disabled={!selectedSlots.length}>
        CONTINUE
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        
        <Elements stripe={stripePromise}>
          <PaymentModal />
          {/* <PaymentForm /> */}
        </Elements>

      </Dialog>
    </>
  );
}
