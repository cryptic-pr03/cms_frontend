import { useParams } from 'react-router-dom';

function BuyTicketsPage() {
  const eventId = useParams();
  return (
    <div>
      BuyTicketsPage
      {' '}
      {eventId}
    </div>
  );
}

export default BuyTicketsPage;
