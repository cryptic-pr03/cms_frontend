import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { myPrivateAxios } from '../config/axios';
import StaffDetailsCard from '../components/cards/StaffDetailsCard';
import Layoutt from '../layouts/Layoutt';


function StaffDetailsPage() {
  const params = useParams();
  const [staffDetails, setStaffDetails] = useState({});

  const getStaffDetails = async () => {
    await myPrivateAxios({
      method: 'GET', 
      url: `/staff/id/${params.staffId}`
    }).then((res) => {
      console.log(res.data);
      setStaffDetails(res.data);
    }).catch ((err)=> console.log(err.response));
  };

  useEffect(() => {
    getStaffDetails();
  }, []);

  console.log(staffDetails);
  return (
    <Layoutt contentData={<StaffDetailsCard staff={staffDetails} />} />
  );
}

export default StaffDetailsPage;
