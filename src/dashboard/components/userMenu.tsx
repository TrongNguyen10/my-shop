
import React, { useState } from 'react';
import LoginForm from './loginForm'; // Đảm bảo bạn đã tạo component LoginForm
import { Link, Menu, MenuItem } from '@mui/material';
import { Login, Logout } from '@mui/icons-material';

interface userMenuProps {
    open: any; // Trạng thái hiển thị của Menu
    onClose: () => void;
}

const UserMenu: React.FC<userMenuProps> = ({ open, onClose }) => {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const handleLoginClick = () => {
        setShowLoginForm(true);
    };

    const handleLogoutClick = () => {
        setLoggedIn(false)
        alert('Đã đăng xuất !')
    }

    const loginItemStyle = loggedIn ? {
        display: 'none'
    } : {
        display: 'flex',
        alignItem: 'center',
        justifyContent: 'space-between',
    }

    const logoutItemStyle = loggedIn ? {
        display: 'flex',
        alignItem: 'center',
        justifyContent: 'space-between',
    } : {
        display: 'none'
    }

    return (
        <>
            <Menu
                id="basic-menu"
                anchorEl={open}
                open={!!open}
                onClose={onClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem sx={loginItemStyle} onClick={handleLoginClick}>Đăng nhập <Login /></MenuItem>
                <MenuItem sx={logoutItemStyle} onClick={handleLogoutClick}>Đăng xuất <Logout /></MenuItem>
                <MenuItem><Link sx={{textDecoration: 'none', color: '#000'}} href='admin' target='_blank'>Quản lí hệ thống</Link></MenuItem>
            </Menu>
            <LoginForm open={showLoginForm} onClose={() => setShowLoginForm(false)} setLoggedIn={setLoggedIn} loggedIn={loggedIn} /> {/* Hiển thị form Đăng nhập khi cần */}
        </>
    );
};

export default UserMenu;
