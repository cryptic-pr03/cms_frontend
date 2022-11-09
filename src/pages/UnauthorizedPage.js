import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom"
import Box from '@mui/material/Box';

function UnauthorizedPage() {
  const navigate = useNavigate();
  const nav = () => {
    navigate('/');
  }
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "Center" }}>
        <Button margin="auto" variant="contained" onClick={nav} sx={{ width: "40%", backgroundColor: 'orange' }}>Back to Home</Button>
        <img src={`${process.env.PUBLIC_URL}/static/unauth.webp`} />

      </Box>
    </>
  );
}

export default UnauthorizedPage;