import { useNavigate } from 'react-router-dom';
import { getJwtToken } from '../helpers/AuthManager';
import Sidebar from '../layouts/Layoutt';

function ActionPage() {
    const navigate = useNavigate();
    if (!getJwtToken()) {
        navigate('/login');
    }
    return (
        <Sidebar />
    );
}

export default ActionPage;
