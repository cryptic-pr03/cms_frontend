import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { myPrivateAxios } from '../config/axios';
import StaffDetailsCard from '../components/cards/StaffDetailsCard';
import Layoutt from '../layouts/Layoutt';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function StaffDetailsPage() {
  const params = useParams();
  const [staffList, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getStaffById = async () => {
    try {
      console.log('try');
      await myPrivateAxios({ method: 'GET', url: `/staff/id/${params.staffId}` }).then((res) => {
        setStaff(res.data);
        setLoading(false);
      });
      console.log('success');
    } catch (err) {
      console.log('error');
      console.log(err.response);
    }
  };

  useEffect(() => {
    getStaffById();
  }, []);
  console.log('list');
  console.log(staffList);
  return (
    <Layoutt contentData={<StaffDetailsCard staff={staffList} />} />
  );
}

export default StaffDetailsPage;
