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
import RegProfilePage from './pages/RegProfilePage';

function Routers() {
  return (
    <Routes>

      {/* LOGIN PAGE */}
      <Route exact path="/login" element={<LoginPage />} />
      {/* REGISTRATION PAGE */}
      <Route exact path="/register" element={<RegisterPage />} />
      {/* EVENTS PAGE */}
      <Route exact path="/events" element={<EventsPage />} />
      <Route exact path="/events/:eventId" element={<EventDetailsPage />} />
      <Route exact path="/buytickets/:eventId" element={<BuyTicketsPage />} />
      <Route exact path="/makePayment/:eventId" element={<MakePayment />} />

      <Route exact path="/slots" element={<EventsPage />} />
      <Route exact path="/slots/:slotId" element={<EventDetailsPage />} />
      <Route exact path="/makePayment/:slotId" element={<MakePayment />} />

      <Route exact path="/profile" element={<ProfilePage />} />
      <Route exact path="/regProfile" element={<RegProfilePage />} />

      <Route path="/*" element={<NotFoundPage />} />

    </Routes>
  );
}

export default Routers;
