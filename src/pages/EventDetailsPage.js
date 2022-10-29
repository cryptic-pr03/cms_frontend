import { useParams } from 'react-router-dom';

function EventDetailsPage() {
  const { eventId } = useParams();
  return (
    <div>
      EventDetailsPage
      {' '}
      {eventId}

    </div>
  );
}

export default EventDetailsPage;
