import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ProfilePageAccordion({ profile }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          {expanded === 'panel1'
          && (
          <Typography
            sx={{ width: '100%', textAlign: 'center' }}
          >
            Personal Details
          </Typography>
          )}

          {expanded !== 'panel1' && (
            <>
              <Typography
                sx={{ width: '33%', flexShrink: 0 }}
              >
                Personal Details
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Show Personal Details
              </Typography>
            </>
          )}

        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          {expanded === 'panel2'
          && (
          <Typography
            sx={{ width: '100%', textAlign: 'center' }}
          >
            My Bookings
          </Typography>
          )}

          {expanded !== 'panel2' && (
            <>
              <Typography
                sx={{ width: '33%', flexShrink: 0 }}
              >
                My Bookings
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Shows Booking Details
              </Typography>
            </>
          )}

        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
            varius pulvinar diam eros in elit. Pellentesque convallis laoreet
            laoreet.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
