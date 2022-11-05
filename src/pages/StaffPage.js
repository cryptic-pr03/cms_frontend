import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { myPrivateAxios } from '../config/axios';
import StaffDataGrid from '../components/cards/StaffDataGrid';
import Layoutt from '../layouts/Layoutt';

function StaffPage() {
  const param = useParams();
  const [staffList, setStaffList] = useState([]);

  const getStaffList = async () => {
    try {
      await myPrivateAxios({
        method: 'get',
        url: `/staff/attribute/venueId/${param.venueId}`,
      }).then((res) => {
        console.log(res.data);
        for (let i = 0; i < res.data.length; i += 1) {
          res.data[i] = { id: i + 1, ...res.data[i] };
        }
        setStaffList(res.data);
      });
    } catch (err) {
      alert(err.response);
    }
  };
  useEffect(() => {
    getStaffList();
  }, []);
  return (
    <Layoutt contentData={
      <StaffDataGrid staff={staffList} />
    }
    />
  );
}

export default StaffPage;
