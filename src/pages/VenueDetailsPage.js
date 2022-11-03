import { useParams } from 'react-router-dom';
import Layoutt from '../layouts/Layoutt';

function VenueDetailsPage() {
  const params = useParams();
  return (
    <Layoutt contentData={(
      <>
        Welcome to
        {' '}
        {params.id}
      </>
)}
    />
  );
}

export default VenueDetailsPage;
