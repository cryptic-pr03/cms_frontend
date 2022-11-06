import { useParams } from 'react-router-dom';
import CheckoutDialogue from '../components/CheckoutModal';
import { getCurrentUser } from '../helpers/AuthManager';
import Layoutt from '../layouts/Layoutt';

function VenueDetailsPage() {
  const params = useParams();
  const user = getCurrentUser();
  return (
    <Layoutt contentData={(
      <>
                Welcome to
        {' '}
        {params.id}

        {user.typeUserCode === 5
                    && (
                      <>
                        <CheckoutDialogue />
                            OK
                      </>
                    )}
      </>

    )}
    />
  );
}

export default VenueDetailsPage;
