import { useParams, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, CardActions } from '@mui/material';
import Stack from '@mui/material/Stack';

export default function StaffDetailsCard({ staff }) {
  const navigate = useNavigate();

  return (
    <div>
      <Box sx={{ width: '80%', margin: 'auto', mt: 5 }}>
        <Stack spacing={2}>
          <Typography color="primary" variant="h6">
            {staff.firstName}
          </Typography>

        </Stack>
      </Box>
      <Card
        sx={{
          maxWidth: '80%',
          margin: 'auto',
          mt: 5,
          borderRadius: 2,
          boxShadow: 1,
          height: '50%',
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="1%"
            image={`${process.env.PUBLIC_URL}/static/eventImg.jpg`}
            alt="../../public/static/trial.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Full Name :
              {staff.firstName}
              {staff.lastName}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Email Id :
              {staff.email}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Contact Number :
              {staff.contactNo}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Gender :
              {staff.gender}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Date of Birth :
              {staff.DOB}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Role :
              {staff.role}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Group Number :
              {staff.groupNumber}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Salary :
              {staff.salary}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Account Number :
              {staff.accountNo}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              IFSC code :
              {staff.ifsccode}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Duration :
              {staff.joiningDate}
              -
              {staff.leavingDate}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions />
      </Card>

    </div>

  );
}
