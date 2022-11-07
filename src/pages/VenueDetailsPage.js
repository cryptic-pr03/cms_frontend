import { useParams, useNavigate } from 'react-router-dom';
import VenueDetailsCard from '../components/cards/VenueDetailsCard';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CheckoutDialogue from '../components/CheckoutModal';
import { getCurrentUser } from '../helpers/AuthManager';
import { myPrivateAxios } from '../config/axios';
import Layoutt from '../layouts/Layoutt';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function VenueDetailsPage() {
  const params = useParams();
  const user = getCurrentUser();
  const [venueList, setVenue] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  console.log("hello");
  console.log(params.id);
  const getVenueById = async () => {
    try {
      console.log('try');
      await myPrivateAxios({ method: 'GET', url: `/venue/id/${params.id}` }).then((res) => {
        setVenue(res.data);
        setLoading(false);
      });
      console.log('success');
    } catch (err) {
      console.log('error');
      console.log(err.response);
    }
  };

  useEffect(() => {
    getVenueById();
  }, []);
  console.log('list');
  console.log(venueList);
  return (
    <Layoutt contentData={
      <VenueDetailsCard venue={venueList} />
      
      // <>
      //           Welcome to
      //   {' '}
      //   {params.id}

      //   {user.typeUserCode === 5
      //               && (
      //                 <>
      //                   <CheckoutDialogue />
      //                       OK
      //                 </>
      //               )}
      // </>


    }
    />
  );
}

export default VenueDetailsPage;
