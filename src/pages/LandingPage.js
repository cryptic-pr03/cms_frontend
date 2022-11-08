import CarouselLandingPage from './CarouselLandingPage.js';
import AboutPage from './AboutPage.js';
import EventShowing from './EventShowing.js';
import HelpPage from './HelpPage.js';

export default function LandingPage() {
  return (
    <>
      <CarouselLandingPage />
      <EventShowing />
      <HelpPage />
      <AboutPage />

    </>
  );
}