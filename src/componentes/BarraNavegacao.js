import * as React from 'react';
import { useContext } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, MenuItem } from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Logo from './ConfigMaster/Logo';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from './AuthContext';

function BarraNavegacao() {
  const { isMaster } = useContext(AuthContext);

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(isMaster, 'isMaster')

  const pages = [
    { label: 'Clientes', path: `clientes` },
  ];

  if(isMaster === true){
    pages.push({label: 'Empresas', path: `empresas`})
  }

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <AppBar position="static" sx={{ m: 0, p: 0 }} color="primary">
        <Container maxWidth="xl" sx={{ m: 0, p: 0 }}>
          <Toolbar disableGutters>
            <Logo sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
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
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                    <Link to={page.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Typography sx={{ textAlign: 'center' }}>{page.label}</Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button key={page.label} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                  <Link to={page.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {page.label}
                  </Link>
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <MenuItem key="Sair" onClick={handleLogout}>
                <Typography sx={{ textAlign: 'right' }}>Sair</Typography>
              </MenuItem>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Outlet />

    </>
  );
}

export default BarraNavegacao;
