import * as React from 'react';
import HelpIcon from '@mui/icons-material/Help';
import InfoIcon from '@mui/icons-material/Info';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import './footer.css';

function Footer() {
  return (
    <footer>
      <h5>Reach out to us on</h5>
      <ul>
        <li>
          <a href="/about"><InfoIcon /></a>
        </li>
        <li>
          <a href="/help"><HelpIcon /></a>
        </li>
        <li>
          <a href="https://github.com/cryptic-pr03/cms_frontend" target="_blank" rel="noreferrer"><GitHubIcon /></a>
        </li>
        <li>
          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noreferrer"><YouTubeIcon /></a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
