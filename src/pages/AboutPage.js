import { useEffect } from 'react';
import './css/about.css';
import './css/topbtn.css';
import { Link } from '@mui/material';
import { Helmet } from 'react-helmet';

function AboutPage() {
  useEffect(() => {
    document.title = 'About | CMS';
  });
  return (
    <div className="opening-div">
      <h1>
        Welcome to Concert Management System !
      </h1>
      <Link href="/events" style={{ textDecoration: 'none' }}>
        <h3>
          BROWSE SEAMLESSLY THROUGH THE CONCERT EVENTS AT VARIOUS VENUES
        </h3>
      </Link>
      <Link href="/events" style={{ textDecoration: 'none' }}>
        <h3>
          GLANCE THE SEAT MATRIX
        </h3>
      </Link>
      <Link href="/events" style={{ textDecoration: 'none' }}>
        <h3>
          BOOK YOUR PREFERRED TICKETS
        </h3>
      </Link>
      <Link href="/events" style={{ textDecoration: 'none' }}>
        <h3>
          EXPERIENCE THE AMAZING CATERING SERVICES
        </h3>
      </Link>
      <Link href="/events" style={{ textDecoration: 'none' }}>
        <h3>
          RATE AND REVIEW YOUR FAVOURITE ARTISTS
        </h3>
      </Link>
      <button type="button" id="myBtn" title="Go to top">Top</button>
      <Helmet>
        <script src="/js/topbtn.js" />
      </Helmet>
    </div>
  );
}

export default AboutPage;
