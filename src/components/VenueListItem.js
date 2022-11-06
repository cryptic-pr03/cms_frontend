import {
  IconButton, ListItem, ListItemButton, ListItemText,
} from '@mui/material';
import ChevronRightSharpIcon from '@mui/icons-material/ChevronRightSharp';

function VenueListItem({ venue, setCurrentVenue }) {
  console.log(venue.name);
  return (
    <ListItem
      key={venue.id}
      secondaryAction={(
        <IconButton edge="end" aria-label="comments">
          <ChevronRightSharpIcon />
        </IconButton>
      )}
      disablePadding
      divider
      onClick={() => setCurrentVenue(venue.id)}
    >
      <ListItemButton>
        <ListItemText primary={venue.name} />
      </ListItemButton>
    </ListItem>
  );
}

export default VenueListItem;
