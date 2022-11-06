import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { myPrivateAxios } from '../config/axios';
import StaffDataGrid from '../components/cards/StaffDataGrid';
import Layoutt from '../layouts/Layoutt';

function StaffPage() {
  const param = useParams();
  const [staffList, setStaffList] = useState([]);

  console.log(getJwtToken());
  if (!getJwtToken()) {
    navigate('/login');
  }
  const user = getCurrentUser();
  if (user.typeUserCode < 4) {
    navigate('/unauth');
  }

  const getStaffList = async () => {
    let callUrl;
    if (user.typeUserCode == 5) callUrl = `/staff/attribute/role/${4}`;
    else callUrl = `/staff/attribute/venueId/${param.venueId}`

    await myPrivateAxios({
      method: 'get',
      url: callUrl,
    }).then((res) => {
      console.log(res.data);
      for (let i = 0; i < res.data.length; i += 1) {
        res.data[i] = { id: i + 1, ...res.data[i] };
      }
      setStaffList(res.data);
    }).catch((err) => console(err.response));
  }

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
