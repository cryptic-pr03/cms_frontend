import CarouselLandingPage from './CarouselLandingPage.js';
import AboutPage from './AboutPage.js';
import EventShowing from './EventShowing.js';
import HelpPage from './HelpPage.js';
import { Box } from '@mui/material';

export default function LandingPage() {
  return (
    <>
      <CarouselLandingPage />
      {/* <EventShowing /> */}
      <Box sx={{
        pt: 20,
        pb: 20,
        backgroundColor: "#f0f4ff"
      }}>
        <HelpPage />
      </Box>

    </>
  );
}