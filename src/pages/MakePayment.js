import { useSearchParams } from 'react-router-dom';

function MakePayment() {
  const eventId = useSearchParams();
  return (
    <div>
      MakePayment
      {eventId}
    </div>
  );
}

export default MakePayment;
