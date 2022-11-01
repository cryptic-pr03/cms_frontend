import { useEffect } from 'react';
import './css/help.css';
import './css/topbtn.css';
import { Helmet } from 'react-helmet';

function HelpPage() {
  useEffect(() => {
    document.title = 'Help | CMS';
  });
  return (
    <div className="opening-div">
      <h1>
        Welcome to Concert Management System !
      </h1>
      <h2>
        Website Users
        <span>&#39; </span>
        Help Menu
      </h2>
      <button type="button" className="collapsible">
        Artist Manager
      </button>
      <div className="content">
        <ul>
          <li>
            Register on the website providing basic details - first name, last name, email,
            password, gender and DOB. Choose to register as
            {' '}
            <q>
              Artist Manager
            </q>
          </li>
          <li>
            You have access to information about venues - location, capacity, pricing, availability
            reviews and seat matrix.
          </li>
          <li>
            You can set event details - event name, artists performing, duration, date, time,
            age limit, event logo and poster.
          </li>
          <li>
            You can book a specific venue and perform the transactions involved.
          </li>
          <li>
            You can view the ticket-booking status of the audience once a venue is decided.
          </li>
        </ul>
      </div>
      <button type="button" className="collapsible">
        Audience
      </button>
      <div className="content">
        <ul>
          <li>
            {/* eslint-disable-next-line react/no-unknown-property */}
            Register on the website providing your credentials - first name, last name, email,
            password, gender and DOB. Choose to register as
            {' '}
            <q>
              Audience
            </q>
          </li>
          <li>
            You can view the concert details - performing artists, location, date, duration,
            catering services at the venue, previous reviews and sponsors.
          </li>
          <li>
            You can book tickets by choosing the preferred seats available in the updated seat
            matrix.
          </li>
          <li>
            You can rate and write reviews the concert, artist, venue, catering service, etc.
          </li>
        </ul>
      </div>
      <button type="button" className="collapsible">
        Staff
      </button>
      <div className="content">
        <ul>
          <li>
            Login using the email and password provided by your recruiter.
          </li>
          <li>
            You can update your name, contact, password and bank account details in the
            profile page.
          </li>
          <li>
            You can view the salary details, the associated payments record and basic details of
            event.
          </li>
          <li>
            You have a fixed role at a particular venue.
          </li>
        </ul>
      </div>
      <button type="button" className="collapsible">
        Venue Manager
      </button>
      <div className="content">
        <ul>
          <li>
            Login using the email and password provided by your recruiter.
          </li>
          <li>
            You can update your name, contact, password and bank account details in the
            profile page.
          </li>
          <li>
            You can decide the catering services available at a venue and recruit the staff for the
            same.
          </li>
          <li>
            You can access the concert details, their sponsors, transactions made by stakeholders,
            set the ticket price, check user reviews and their booking status.
          </li>
        </ul>
      </div>
      <button type="button" className="collapsible">
        Client - Superuser
      </button>
      <div className="content">
        <ul>
          <li>
            You have access to all events and venues - can add, remove and update them.
          </li>
          <li>
            You can recruit various venue managers and create their login credentials.
          </li>
        </ul>
        <button type="button" id="myBtn" title="Go to top">Top</button>
      </div>
      <Helmet>
        <script src="/js/help.js" />
        <script src="/js/topbtn.js" />
      </Helmet>
    </div>
  );
}

export default HelpPage;
