import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../helpers/AuthManager';

function Navbar() {
  const loggedInPages = ['DashBoard'];
  const loggedOutPages = ['Sign In', 'Register'];

  const settingsLoggedIn = ['Profile', 'Logout'];

  const currentUser = getCurrentUser();
  console.log(currentUser);

  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    if (page === 'Events') navigate('/events');
    else if (page === 'Help') navigate('/help');
    else if (page === 'About Us') navigate('/about');
    else if (page === 'My Bookings') navigate('/bookings');
    else if (page === 'DashBoard') navigate('/dashboard');

    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting) => {
    if (setting === 'Sign In') navigate('/login');
    else if (setting === 'Logout') navigate('/logout');
    else if (setting === 'profile') navigate('/profile');
    else if (setting === 'Register') navigate('/register');
    else if (setting === 'DashBoard') navigate('/dashboard');

    setAnchorElUser(null);
  };

  // console.log(currentUser.key);

  return (
    <div>
      {/* <getCurrentUser /> */}
      <AppBar position="static" style={{ background: '#2E3B55' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              CMS
            </Typography>
            <Typography variant="h4">
              {(currentUser?.user?.firstName ?? "") + " " + (currentUser?.user?.lastName ?? "")}
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {currentUser && loggedInPages.map((page) => (
                  <MenuItem key={page} onClick={() => { handleCloseNavMenu(page); }}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              CMS
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {currentUser && loggedInPages.map((page) => (
                <Button
                  key={page}
                  onClick={() => { handleCloseNavMenu(page); }}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            {currentUser && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="" src="" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {currentUser && settingsLoggedIn.map((setting) => (
                    <MenuItem key={setting} onClick={() => { handleCloseUserMenu(setting); }}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}

            {currentUser === null && (
              <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                {loggedOutPages.map((page) => (
                  <Button
                    key={page}
                    onClick={() => { handleCloseUserMenu(page); }}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default Navbar;
