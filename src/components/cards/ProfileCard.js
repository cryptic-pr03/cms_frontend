import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

export default function ProfileCard() {
  return (
    <Card sx={{
      maxWidth: 345,
      display: 'flex',
      direction: 'column',
    }}
    >
      <Box
        height="150px"
        width="150px"
        sx={{
          borderRadius: '50%',
        }}
      >
        <img
          width="150px"
          height="150px"
          style={{
            fill: 'cover',
            borderRadius: '50%',
            objectFit: 'cover',
          }}
          src={`${process.env.PUBLIC_URL}/static/profile-pic.jpg`}
          alt="green iguana"
        />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
                    Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
    </Card>
  );
}
