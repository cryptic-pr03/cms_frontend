import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import myAxios, { myPrivateAxios } from '../config/axios';
import Layoutt from '../layouts/Layoutt';
import { getCurrentUser } from '../helpers/AuthManager';
import { Box, Typography } from '@mui/material';
import MyBookingDataGrid from '../components/cards/MyBookingDataGrid';


export default function MyBookingSPage() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const currentUser = getCurrentUser();

  const getTransaction = async () => {
    try {
      await myPrivateAxios({
        method: 'GET',
        url: `/transaction/getAll/${currentUser.userId}`
      }).then((res) => {
        for (let i = 0; i < res.data.length; i += 1) {
          res.data[i] = { id: i, ...res.data[i] };
        }
        setTransactions(res.data);
        console.log(transactions);
      });
    } catch (err) {
      console.log('error');
      console.log(err.response);
    }
  };

  useEffect(() => {
    getTransaction();

  }, []);

  console.log(transactions);
  return (
    <Layoutt contentData={
      <>
        {/* <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center"
        }}>
          <Typography variant="h4" sx={{ m: 3 }} >
            {transactions.length === 0 && <> NO BOOKINGS TO DISPLAY</>}
            {transactions.length !== 0 && <> BOOKINGS</>}
          </Typography>
        </Box> */}

        <MyBookingDataGrid info={transactions} />

      </>
    }
    />

  );
}