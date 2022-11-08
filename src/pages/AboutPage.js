import { useEffect } from 'react';
// import './css/about.css';
// import './css/topbtn.css';
import { Link } from '@mui/material';
import { Helmet } from 'react-helmet';

function AboutPage() {
  useEffect(() => {
    document.title = 'About | CMS';
  });
  return (
    <div className="opening-div">
      <img style={{height:'1000px'}}
        className="d-block w-100"
        src={process.env.PUBLIC_URL+'/static/1.jpg'}
      />
    </div>
  );
}

export default AboutPage;