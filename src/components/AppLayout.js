import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import { Divider } from '@mui/material';
import PersonIcon from '@mui/icons-material/AccountCircle';
import PTLogo from '../assets/pt_logo.jpg';
import SearchBar from './SearchBar';

const settings = ['Edit Profile', 'Logout'];

const AppLayout = ({ children, query, setQuery }) => {
    const { user } = useAuthContext()
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const { logout, error, isPending } = useLogout()

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleMenuClick = (setting) => {
        switch (setting) {
            case 'Profile':
                console.log('Profile')
                break;
            case 'Account':
                console.log('Account')
                break;
            case 'Dashboard':
                console.log('Dashboard')
                break;
            case 'Logout':
                logout();
                console.log('Logout')
                break;
            default:
                console.log('default')
        }
        handleCloseUserMenu()
    }

    return (
        <Box sx={{ height: 'calc(100% - 80px)' }}>
            {user && (
                <AppBar position="sticky" elevation={0} sx={{ borderBottom: '1px solid lightGrey', py: 1, mb: 1.5, background: '#fff' }}>
                    <Toolbar
                        sx={{
                            width: "100%",
                            maxWidth: 'xl',
                            mx: "auto"
                        }}
                    >
                        <Box sx={{ pr: 1.5 }}>
                            <img src={PTLogo} alt="pt logo" width="50em" />
                        </Box>
                        <Typography
                            variant="h6"
                            fontWeight={600}
                            noWrap
                            component="div"
                            sx={{ color: '#000', flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            Park Tudor Alumni
                        </Typography>
                        <SearchBar query={query} setQuery={setQuery} />
                        <Box sx={{ flexGrow: 0, pl: 1.5 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <PersonIcon sx={{ color: 'black', fontSize: '35px' }} />

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
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={() => handleMenuClick(setting)}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </AppBar>
            )}
            {children}
        </Box>
    );
}

export default AppLayout;
