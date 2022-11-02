import * as React from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import './css/footer.css';

function CustomFooter() {
  return (
    <footer>
      <h5>Get connected with us on</h5>
      <ul>
        <li>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <a href="https://google.com" target="_blank" rel="noreferrer"><GoogleIcon /></a>
        </li>
        <li>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <a href="https://twitter.com" target="_blank" rel="noreferrer"><TwitterIcon /></a>
        </li>
        <li>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <a href="https://facebook.com" target="_blank" rel="noreferrer"><FacebookIcon /></a>
        </li>
        <li>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <a href="https://instagram.com" target="_blank" rel="noreferrer"><InstagramIcon /></a>
        </li>
        <li>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <a href="https://linkedin.com" target="_blank" rel="noreferrer"><LinkedInIcon /></a>
        </li>
        <li>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <a href="https://github.com" target="_blank" rel="noreferrer"><GitHubIcon /></a>
        </li>
      </ul>
    </footer>
  );
}

export default CustomFooter;
