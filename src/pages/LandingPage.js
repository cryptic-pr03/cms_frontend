import CarouselLandingPage from './CarouselLandingPage.js';
import HelpPage from './HelpPage.js';
import { Box } from '@mui/material';
import "./LandingPage.css"

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