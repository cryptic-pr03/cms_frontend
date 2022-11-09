import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { myPrivateAxios } from '../../config/axios';

export default function FormDialog() {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');

  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  async function createIntent() {
    await myPrivateAxios({
      method: 'POST',
      url: 'transaction/create-payment-intent',
      data: {
        amount: 1000,
        transactionType: 'Card',

      },
    }).then((res) => {
      console.log(res);
      setClientSecret(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  const handleClickOpen = () => {
    setOpen(true);
    createIntent();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const stripe = useStripe();
  const elements = useElements();

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      navigate('/profile');
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} disabled={true}>
        CONTINUE ONLINE
      </Button>

      <Dialog open={open} onClose={handleClose}>

        <DialogTitle>MAKE PAYMENT</DialogTitle>
        <Box
          id="making"
          component="form"
          sx={{
            width: '500px',

          }}
        >
          <DialogContent>
            <CardElement onChange={handleChange} />
          </DialogContent>
          <DialogActions>
            <Button
              disabled={processing}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={processing || disabled || succeeded}
            >
              {/* {processing && <CircularProgress />} */}
              Pay
            </Button>
          </DialogActions>
        </Box>
        {error && alert(error)}
      </Dialog>

    </div>
  );
}
