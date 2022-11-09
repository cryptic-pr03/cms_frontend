import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { myPrivateAxios } from '../config/axios';
import StaffDataGrid from '../components/cards/StaffDataGrid';
import Layoutt from '../layouts/Layoutt';
import { getCurrentUser } from '../helpers/AuthManager';
import { Box, Typography } from '@mui/material';
import AddStaffModal from '../components/modals/AddStaffModal';

function StaffPage() {
  const navigate = useNavigate();
  const [staffList, setStaffList] = useState([]);

  const user = getCurrentUser();
  if (user.typeUserCode < 4) {
    navigate('/unauth');
  }
  const venueId = getCurrentUser().user.venueId;

  const getStaffList = async () => {
    let callUrl;
    if (user.typeUserCode == 5) callUrl = `/staff/attribute/role/${4}`;
    else callUrl = `/staff/attribute/venueId/${venueId}`

    await myPrivateAxios({
      method: 'get',
      url: callUrl,
    }).then((res) => {
      console.log(res.data);
      for (let i = 0; i < res.data.length; i += 1) {
        res.data[i] = { id: i + 1, ...res.data[i] };
      }
      setStaffList(res.data.filter((staff)=> staff.role<user.typeUserCode));
    }).catch((err) => alert(err.response));
  }

  function updateStateOnDelete(deletedStaff) {
    setStaffList((staffList) => staffList.filter((staff) => staff !== deletedStaff));
  }

  function updateStateOnAdd(addedStaff) {
    console.log("in", staffList.size());
    setStaffList((venueList) => {
      venueList.push(addedStaff);
      return venueList;
    });
    console.log("out", staffList.size());
  }

  function updateStateOnEdit(editedVenue) {
    setStaffList((venueList) => venueList.filter((venue) => venue.venueId !== editedVenue.venueId));
    setStaffList((venueList) => {
      venueList.push(editedVenue);
      return venueList;
    });
  }
  useEffect(() => {
    getStaffList();
  }, []);

  return (
    <Layoutt contentData={
      <>
        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center"
        }}>
          <Typography variant="h4" sx={{ m: 3 }} >
            {staffList.length === 0 && <> NO STAFFS TO DISPLAY</>}
            {staffList.length !== 0 && <> STAFFS</>}
          </Typography>
          {user.typeUserCode >=4 && < AddStaffModal mode={"ADD"} updateState={updateStateOnAdd} />}
        </Box>
        <StaffDataGrid staff={staffList} updateStateOnDelete={updateStateOnDelete} />
      </>
    }
    />

  );
}


export default StaffPage;
