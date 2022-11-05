import { Box, Button } from '@mui/material';
import {
  CardElement, useElements, useStripe,
} from '@stripe/react-stripe-js';
import CardSection from './CardSection';

export default function PaymentForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event) => {
    event.preventDefault();

    // handle payment request
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      console.log(result.error.message);
    } else {
      console.log(result.token);
    // pass the token to your backend API
    }
  };

  return (
    <div>
      <Box
        component="form"
        onSubmit={handleSubmit(stripe, elements)}
        sx={{
          p: 4,
          width: '50%',
          margin: 'auto',
          border: '2px solid red',
        }}
      >
        <CardElement />
        <button type="button" className="btn-pay">Buy Now</button>
      </Box>
      {/* <Button variant="outlined">Pay Now</Button> */}
    </div>
  );
}
