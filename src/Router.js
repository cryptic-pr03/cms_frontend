import { Routes, Route } from 'react-router-dom';
import React from 'react';
import BuyTicketsPage from './pages/BuyTicketsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import MakePayment from './pages/MakePayment';
import LogoutPage from './pages/LogoutPage';
import VenueDetailsPage from './pages/VenueDetailsPage';
import StaffPage from './pages/StaffPage';
import StaffDetailsPage from './pages/StaffDetailsPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import LandingPage from './pages/LandingPage';
import Test from './pages/Test';
import DashboardPage from './pages/DashboardPage';
import Protected from './helpers/Protected';
import SlotsPage from './pages/SlotsPage';
import VenuesPage from './pages/VenuesPage';
import EventsPage from './pages/EventsPage';
import SchedulePage from './pages/SchedulePage';
import MyBookingSPage from './pages/MyBookingsPage';

function Routers() {
  return (
    <Routes>

      {/* LOGIN PAGE */}
      <Route exact path="/login" element={<LoginPage />} />
      <Route exact path="/register" element={<RegisterPage />} />
      <Route exact path="/logout" element={<LogoutPage />} />
      {/* REGISTRATION PAGE */}
      {/* EVENTS PAGE */}
      <Route exact path="/events" element={<EventsPage />} />
      <Route exact path="/events/:eventId" element={<EventDetailsPage />} />

      {/* STAFF PAGE */}
      <Route exact path="/staffs" element={<Protected allowedRoles={[4, 5]}> <StaffPage /> </Protected>} />
      <Route exact path="/staffs/:venueId" element={<Protected allowedRoles={[4, 5]}>  <StaffPage /> </Protected>} />
      <Route exact path="/staffDetails/:staffId" element={<Protected allowedRoles={[4, 5]}>  <StaffDetailsPage /></Protected>} />
      <Route exact path="/schedule" element={<Protected allowedRoles={[2]}> <SchedulePage /></Protected> } />
      <Route exact path="/unauth" element={<UnauthorizedPage />} />
      <Route exact path="/myBookings" element={<MyBookingSPage />} />

      <Route exact path="/slots" element={ <Protected allowedRoles={[2,4]}>  <SlotsPage /> </Protected> } />

      <Route exact path="/venues" element={<Protected allowedRoles={[5]}>  <VenuesPage /> </Protected> } />
      <Route exact path="/venueDetails/:id" element={<VenueDetailsPage />} />

      <Route exact path="/profile" element={<Protected allowedRoles={[1, 2, 3, 4, 5]}> <ProfilePage /> </Protected>} />
      <Route exact path="/dashboard" element={<Protected allowedRoles={[1, 2, 3, 4, 5]}> <DashboardPage /> </Protected>} />


      <Route path="/test" element={<Test />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/*" element={<NotFoundPage />} />

    </Routes>
  );
}

export default Routers;
