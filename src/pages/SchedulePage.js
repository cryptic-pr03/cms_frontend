import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ScheduleCard from '../components/cards/ScheduleCard';
import myAxios, { myPrivateAxios } from '../config/axios';
import { getCurrentUser } from '../helpers/AuthManager';
import Layoutt from '../layouts/Layoutt';

function SchedulePage() {
  const [scheduleList, setScheduleList] = useState([]);
  const token = getCurrentUser();
  const getScheduleList = async () => {
    try {
      await myPrivateAxios({
        method: 'get',
        url: `/staff/schedule/${token.user.staffId}`,
      }).then((res) => {
        console.log(res.data);
        setScheduleList(res.data);
      });
    } catch (err) {
      alert(err.response);
    }
  };
  useEffect(() => {
    getScheduleList();
  }, []);

  return (
    <Layoutt contentData={
      <ScheduleCard scheduleList={scheduleList} />
    }
    />
  );
}

export default SchedulePage;
