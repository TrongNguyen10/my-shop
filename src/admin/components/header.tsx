// Header.tsx
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Avatar, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = (props: any) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleOpenSidebar = () => {
        if(props.open) {
            props.setOpenSidebar(false)
        }else props.setOpenSidebar(true) 
    }

    const headerStyle = {
        backgroundColor: '#1e1f27',
        padding: '0 1.5rem'
    }

    return (
        <AppBar sx={headerStyle} position="static">
            <Toolbar>
                <IconButton onClick={handleOpenSidebar} edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" style={{ flexGrow: 1, marginLeft: 10 }}>
                    Pages
                </Typography>
                <IconButton color="inherit" onClick={handleMenuOpen}>
                    <AccountCircleIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
                </Menu>
                <Avatar alt="User Avatar" src="" />
                <Typography variant="subtitle1" style={{ marginLeft: 8 }}>
                    ndt
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
