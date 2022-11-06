import { Routes, Route } from 'react-router-dom';
import React from 'react';
import BuyTicketsPage from './pages/BuyTicketsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import EventsPage from './pages/EventsPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import MakePayment from './pages/MakePayment';
import LogoutPage from './pages/LogoutPage';
import VenuePage from './pages/VenuePage';
import VenueDetailsPage from './pages/VenueDetailsPage';
import StaffPage from './pages/StaffPage';
import StaffDetailsPage from './pages/StaffDetailsPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import LandingPage from './pages/LandingPage';
import Test from './pages/Test';
import DashboardPage from './pages/DashboardPage';

function Routers() {
  return (
    <Routes>

      {/* LOGIN PAGE */}
      <Route exact path="/login" element={<LoginPage />} />
      <Route exact path="/logout" element={<LogoutPage />} />
      {/* REGISTRATION PAGE */}
      <Route exact path="/register" element={<RegisterPage />} />
      {/* EVENTS PAGE */}
      <Route exact path="/events" element={<EventsPage />} />
      <Route exact path="/event/:eventId" element={<EventDetailsPage />} />
      <Route exact path="/buytickets/:eventId" element={<BuyTicketsPage />} />
      <Route exact path="/makePayment/:eventId" element={<MakePayment />} />

      {/* STAFF PAGE */}
      <Route exact path="/staffs" element={<StaffPage />} />
      <Route exact path="/staff/:venueId" element={<StaffPage />} />
      <Route exact path="/staffDetails/:staffId" element={<StaffDetailsPage />} />
      <Route exact path="/unauth" element={<UnauthorizedPage />} />

      <Route exact path="/slots" element={<EventsPage />} />
      <Route exact path="/slots/:slotId" element={<EventDetailsPage />} />
      <Route exact path="/makePayment/:slotId" element={<MakePayment />} />

      <Route exact path="/venues" element={<VenuePage />} />
      <Route exact path="/venue/:id" element={<VenueDetailsPage />} />

      <Route exact path="/profile" element={<ProfilePage />} />
      <Route exact path="/dashboard" element={<DashboardPage />} />


      <Route path="/test" element={<Test />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/*" element={<NotFoundPage />} />

    </Routes>
  );
}

export default Routers;
