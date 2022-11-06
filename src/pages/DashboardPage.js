import { useNavigate } from 'react-router-dom';
import { getJwtToken } from '../helpers/AuthManager';
import Sidebar from '../layouts/Layoutt';

export default function DashboardPage() {
  const navigate = useNavigate();
  if (!getJwtToken()) {
    navigate('/login');
  }
  return (
    <Sidebar />
  );
}

