import {
    Card, CardContent, Grid, Typography,
} from '@mui/material';

export default function ProfileCardd({ profile }) {
    return (
        <Grid item xs={4}>
            <Card sx={{ p: 0.1 }}>
                <CardContent sx={{ p: 1, width: 500 }}>
                    <Typography sx={{ fontSize: 10 }} color="text.primary" gutterBottom>
                        {' '}
            :
                    </Typography>
                    <Typography variant="body2" />
                </CardContent>
            </Card>
        </Grid>
    );
}
